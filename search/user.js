const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    ID: String,
    userName: String,
    Bio: String
});

module.exports = mongoose.model('user', userSchema);