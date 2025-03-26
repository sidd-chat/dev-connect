const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  title: {type: String, required: true},
  snippetCode: {type: String, required: true},
  caption: {type: String},
  language: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  createdAt: {type: Date, default: Date.now}
})

const Snippet = mongoose.model('Snippet', snippetSchema);
module.exports = Snippet;