const mongoose = require('mongoose');
const connectDB = require('./lib/mongoose.cjs');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Allow same email across multiple registrations; uniqueness now composite with dateOfBirth
  email: { type: String, required: true },
  phone: { type: String, required: true },
  organization: String,
  ticketType: { type: String, enum: ['standard', 'premium', 'vip'], default: 'standard' },
  paymentStatus: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  registrationDate: { type: Date, default: Date.now },
  attended: { type: Boolean, default: false },
  checkInTime: Date,
  // Extended fields
  fullName: String,
  contactNumber: String,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  business: String,
  sectors: [String],
  designation: String,
  experience: String,
  achievements: String,
  futurePlan: String,
  dateOfBirth: String,
  linkedinProfile: String,
  otherSector: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
  website: String,
  gstin: String,
  pan: String,
  referralCode: String,
  qrCode: String
});

registrationSchema.index({ email: 1, dateOfBirth: 1 }, { unique: true });

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

function generateQRCode(registrationId) {
  return `INFLUENCIA2025-${registrationId.toUpperCase()}`;
}

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    await connectDB();
    
    const body = req.body;
    const { name, email, phone, ticketType, dateOfBirth } = body;
    
    // Use extended fields if provided, otherwise fall back to basic ones
    const finalName = body.fullName || name;
    const finalPhone = body.contactNumber || phone;
    const finalOrganization = body.business || body.organization || '';
    
    // Validate required fields
    if (!finalName || !email || !finalPhone || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone, and dateOfBirth are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Count all registrations with this email (for messaging)
    const totalEmailCount = await Registration.countDocuments({ email });
    // Reject only if SAME email + SAME dateOfBirth already exists
    const existingExact = await Registration.findOne({ email, dateOfBirth });
    if (existingExact) {
      return res.status(409).json({
        success: false,
        error: 'A registration already exists for this email and date of birth',
        message: `User already registered with this email and date of birth. Total registrations with this email: ${totalEmailCount}`,
        duplicate: true,
        duplicatesWithEmail: totalEmailCount
      });
    }

    // Build registration data
    const registrationData = {
      name: finalName,
      email,
      phone: finalPhone,
      organization: finalOrganization,
      ticketType: ticketType || 'standard',
      paymentStatus: 'pending',
      registrationDate: new Date(),
      // Extended fields
      fullName: body.fullName,
      contactNumber: body.contactNumber,
      gender: body.gender,
      business: body.business,
      sectors: body.sectors || body.sector,
      designation: body.designation,
      experience: body.experience,
      achievements: body.achievements,
      futurePlan: body.futurePlan,
      dateOfBirth: body.dateOfBirth,
      linkedinProfile: body.linkedinProfile,
      otherSector: body.otherSector,
      address: body.address,
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      country: body.country,
      website: body.website,
      gstin: body.gstin,
      pan: body.pan,
      referralCode: body.referralCode
    };

    // Create registration
    const registration = new Registration(registrationData);
    await registration.save();

    // Generate QR code
    const qrCode = generateQRCode(registration._id.toString());
    registration.qrCode = qrCode;
    await registration.save();

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to Kaisan Network.',
      data: {
        _id: registration._id,
        id: registration._id,
        name: registration.name,
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        contactNumber: registration.contactNumber,
        gender: registration.gender,
        organization: registration.organization,
        business: registration.business,
        designation: registration.designation,
        sectors: registration.sectors,
        experience: registration.experience,
        achievements: registration.achievements,
        futurePlan: registration.futurePlan,
        dateOfBirth: registration.dateOfBirth,
        linkedinProfile: registration.linkedinProfile,
        otherSector: registration.otherSector,
        ticketType: registration.ticketType,
        paymentStatus: registration.paymentStatus,
        registrationDate: registration.registrationDate,
        attended: registration.attended,
        checkInTime: registration.checkInTime,
        qrCode: registration.qrCode
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    // In non-production or when DEBUG env var is set, return error details to aid debugging
    const showDebug = process.env.DEBUG === 'true' || (process.env.VERCEL_ENV || 'development') !== 'production';
    if (showDebug) {
      return res.status(500).json({
        success: false,
        error: error && error.message ? error.message : 'Internal server error',
        stack: error && error.stack ? error.stack.split('\n').slice(0,6) : undefined
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}