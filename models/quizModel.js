import mongoose from 'mongoose';
import slugify from 'slugify';

const quizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Quiz must have a name'],
  },
  slug: String,
  author: { type: mongoose.Schema.ObjectId, ref: 'User' },
  onModeration: {
    type: Boolean,
    default: true,
  },
  photo: String,
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String, enum: ['music', 'cinema', 'it', 'new'] }],
  questionsQuantity: Number,
  questions: [
    {
      questionTitle: {
        type: String,
        required: [true, 'Question should have a name'],
      },
      options: {
        type: [String],
        required: [true, 'Questions should have options'],
        validate: {
          validator: function (val) {
            return val.length <= 4 && val.length >= 2;
          },
          message: '{PATH} can have minimum 2 and maximum 4',
        },
      },
      answer: {
        type: Number,
        required: [true, 'Question must have an answer'],
      },
    },
  ],
});

quizSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  this.slug = slugify(this.name);
  this.questionsQuantity = this.questions.length;

  next();
});

quizSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ onModeration: { $ne: true } }); // updating the query by removing inactive users

  next();
});

quizSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'name photo',
  });

  next();
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
