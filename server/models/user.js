const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    userType: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;