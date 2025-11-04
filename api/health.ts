import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../src/lib/mongoose.js';
import mongoose from 'mongoose';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const healthCheck: any = {
    timestamp: new Date().toISOString(),
    service: 'Influencia Event Registration API',
    environment: process.env.VERCEL_ENV || 'local',
    nodeVersion: process.version,
    mongooseVersion: mongoose.version,
  };

  try {
    // Check if MONGODB_URI is set
    const mongoUri = process.env.MONGODB_URI;
    healthCheck.mongoUriConfigured = !!mongoUri;
    
    if (!mongoUri) {
      healthCheck.status = 'error';
      healthCheck.mongodb = {
        connected: false,
        error: 'MONGODB_URI environment variable not configured',
        instructions: [
          'Go to Vercel Dashboard → Settings → Environment Variables',
          'Add MONGODB_URI with your MongoDB Atlas connection string',
          'Set scope to Production, Preview, Development (or All Environments)',
          'Redeploy the application'
        ]
      };
      return res.status(500).json(healthCheck);
    }

    // Show partial URI for debugging (hide password)
    const uriPreview = mongoUri.substring(0, 20) + '...' + mongoUri.substring(mongoUri.length - 20);
    healthCheck.mongoUriPreview = uriPreview;

    // Try to connect
    const startTime = Date.now();
    await connectDB();
    const connectionTime = Date.now() - startTime;

    healthCheck.status = 'healthy';
    healthCheck.mongodb = {
      connected: true,
      connectionTime: `${connectionTime}ms`,
      readyState: mongoose.connection.readyState,
      readyStateText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
      host: mongoose.connection.host,
      database: mongoose.connection.db?.databaseName || 'unknown',
      collections: await mongoose.connection.db?.listCollections().toArray().then(c => c.map(col => col.name)) || []
    };

    return res.status(200).json(healthCheck);

  } catch (error: any) {
    healthCheck.status = 'error';
    healthCheck.mongodb = {
      connected: false,
      error: error.message,
      errorName: error.name,
      errorCode: error.code || 'N/A',
      stack: error.stack?.split('\n').slice(0, 5).join('\n') // First 5 lines of stack
    };

    // Add specific diagnosis
    if (error.message.includes('IP') || error.message.includes('whitelist') || error.code === 'ENOTFOUND') {
      healthCheck.diagnosis = 'IP_WHITELIST_ISSUE';
      healthCheck.fix = [
        'Go to MongoDB Atlas → Network Access',
        'Add IP Address: 0.0.0.0/0 (allow all)',
        'Wait 1-2 minutes for changes to propagate'
      ];
    } else if (error.message.includes('authentication') || error.message.includes('auth')) {
      healthCheck.diagnosis = 'AUTHENTICATION_FAILED';
      healthCheck.fix = [
        'Check username and password in MONGODB_URI',
        'Ensure password is URL-encoded (special chars need encoding)',
        'Verify user exists in MongoDB Atlas → Database Access'
      ];
    } else if (error.message.includes('MONGODB_URI')) {
      healthCheck.diagnosis = 'MISSING_ENV_VAR';
      healthCheck.fix = [
        'Add MONGODB_URI to Vercel environment variables',
        'Format: mongodb+srv://<user>:<password>@<cluster>/<database>',
        'Redeploy after adding'
      ];
    }

    return res.status(500).json(healthCheck);
  }
}
