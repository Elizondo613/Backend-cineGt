const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    dpi: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);