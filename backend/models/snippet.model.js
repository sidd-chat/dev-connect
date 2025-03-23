const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  title: {type: String, required: true},
  code: {type: String, required: true},
  caption: {type: String},
  language: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  stars: {type: Number, default: 0},
  shares: {type: Number, default: 0},
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  createdAt: {type: Date, default: Date.now}
})

const Snippet = mongoose.model('Snippet', snippetSchema);
module.exports = Snippet;