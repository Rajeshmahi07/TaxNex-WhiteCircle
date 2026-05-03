const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please add password'],
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['client', 'admin', 'accountant'],
    default: 'client',
  },
  businessName: {
    type: String,
    default: '',
  },
  gstin: {
    type: String,
    default: '',
    uppercase: true,
  },
  pan: {
    type: String,
    default: '',
    uppercase: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);