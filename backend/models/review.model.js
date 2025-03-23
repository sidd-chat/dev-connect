const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  snippet: {type: Schema.Types.ObjectId, ref: 'Snippet', required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  rating: {type: Number, required: true, min: 1, max: 5},
  comment: {type: String, default: ''},
  createdAt: {type: Date, default: Date.now}
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;