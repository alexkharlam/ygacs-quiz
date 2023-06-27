import mongoose from 'mongoose';

const userResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Result must be linked to the user'],
  },
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: 'Quiz',
    required: [true, 'Result must be linked to the Quiz'],
  },
  userAnswers: [
    {
      type: Number,
      enum: [0, 1, 2, 3],
      required: [true, 'Result must have a user answers'],
    },
  ],
  scores: [
    {
      type: Number,
      enum: [0, 1, 2, 3],
      required: [true, 'Result must have a user scores'],
    },
  ],
  score: {
    type: Number,
    required: [true, 'Result must have a user score'],
  },
});

userResultSchema.index({ quiz: 1, user: 1 }, { unique: true });

const UserResult = mongoose.model('UserResult', userResultSchema);

export default UserResult;
