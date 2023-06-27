import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide correct email'],
  },
  password: {
    type: 'String',
    minLength: 8,
    required: [true, 'Please provide password'],
    select: false,
  },
  passwordConfirm: {
    type: 'String',
    required: [true, 'Please provide password confirm'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } }); // updating the query by removing inactive users

  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.checkCorrectPassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  // If user changed password, run logic:
  if (this.passwordChangedAt) {
    // Convert to timestamp in milliseconds
    const changedAtMs = this.passwordChangedAt.getTime();
    // Convert to seconds (because JWTTimestamp is in seconds)
    const changedAtSeconds = changedAtMs / 1000;

    return JWTTimestamp < changedAtSeconds;
    // If true, password changed after JWT was issued => token is not valid
  }

  // Be default return false (success case)
  return false;
};

const User = mongoose.model('User', userSchema);

export default User;
