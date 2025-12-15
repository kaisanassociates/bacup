#!/usr/bin/env node
/*
  Safe index migration for registrations collection.
  - Reports current indexes on `registrations`.
  - Finds any duplicate (email, dateOfBirth) pairs.
  - If no duplicates, drops single-field unique `email_1` index (if present)
    and creates composite unique index { email: 1, dateOfBirth: 1 }.

  Usage:
    MONGODB_URI="<uri>" node scripts/fix-registrations-index.js

  NOTE: Do NOT commit secrets. Run this from a trusted environment.
*/

const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Error: MONGODB_URI not set in environment.');
  process.exit(1);
}

async function main() {
  try {
    await mongoose.connect(uri, {
      bufferCommands: false,
      family: 4
    });

    const db = mongoose.connection.db;
    const coll = db.collection('registrations');

    console.log('Connected to DB:', db.databaseName);

    const indexes = await coll.indexes();
    console.log('\nCurrent indexes on registrations:');
    indexes.forEach((ix) => console.log(' -', ix.name, JSON.stringify(ix.key), ix.unique ? 'unique' : '')); 

    // Detect existing single-field unique index on email
    const hasEmailUnique = indexes.some(ix => ix.name === 'email_1' && ix.unique);

    // Find duplicates for (email, dateOfBirth)
    console.log('\nScanning for duplicate (email, dateOfBirth) pairs (this may take a moment)...');
    const dupPipeline = [
      { $group: { _id: { email: '$email', dateOfBirth: '$dateOfBirth' }, count: { $sum: 1 }, ids: { $push: '$_id' } } },
      { $match: { count: { $gt: 1 } } },
      { $limit: 20 }
    ];

    const dupCursor = coll.aggregate(dupPipeline);
    const duplicates = await dupCursor.toArray();

    if (duplicates.length > 0) {
      console.error('\nFound duplicate email+dateOfBirth pairs (showing up to 20).');
      duplicates.forEach(d => {
        console.error(' -', d._id, 'count=', d.count, 'ids=', d.ids.slice(0,5));
      });
      console.error('\nResolve duplicates before creating a composite unique index. You can inspect and remove/merge duplicates via the MongoDB UI or mongosh.');
      await mongoose.disconnect();
      process.exit(2);
    }

    console.log('\nNo duplicates found for (email, dateOfBirth). Safe to migrate indexes.');

    if (hasEmailUnique) {
      console.log('Dropping single-field unique index `email_1`...');
      try {
        await coll.dropIndex('email_1');
        console.log('Dropped index email_1');
      } catch (err) {
        console.error('Failed to drop index email_1:', err.message || err);
        await mongoose.disconnect();
        process.exit(3);
      }
    } else {
      console.log('No single-field unique index `email_1` found. Proceeding to ensure composite index exists.');
    }

    console.log('Creating composite unique index { email: 1, dateOfBirth: 1 }...');
    try {
      await coll.createIndex({ email: 1, dateOfBirth: 1 }, { unique: true, name: 'email_dateOfBirth_1' });
      console.log('Composite unique index created successfully.');
    } catch (err) {
      console.error('Failed to create composite index:', err.message || err);
      await mongoose.disconnect();
      process.exit(4);
    }

    console.log('\nIndex migration completed successfully.');
    await mongoose.disconnect();
    process.exit(0);

  } catch (err) {
    console.error('Unexpected error:', err && err.stack ? err.stack : err);
    try { await mongoose.disconnect(); } catch (_) {}
    process.exit(1);
  }
}

main();
