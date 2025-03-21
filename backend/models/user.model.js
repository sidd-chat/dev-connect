const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  profilePicture: {type: String, default: ''},
  bio: {type: String, default: ''},
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  savedSnippets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Snippet'}],
  createdAt: {type: Date, default: Date.now}
})

const UserModel = mongoose.model('UserModel', userSchema);
module.exports = UserModel;