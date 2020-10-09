const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        required: true,
    },
    surname: {
        type: String,
        trim: true,
        minlength: 3,
        required: true,
    },
    userName: {
        type: String,
        trim: true,
        minlength: 3,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        trim: true,
        minlength: 3,
        required: true,
    },
    customerCreate: {
        type: Boolean,
        default: false
    },
    customerDelete: {
        type: Boolean,
        default: false
    },
    customerUpdate: {
        type: Boolean,
        default: false
    },
    userCreate:{
        type: Boolean,
        default: false
    },
    userDelete:{
        type: Boolean,
        default: false
    },
    userUpdate:{
        type: Boolean,
        default: false
    },
    deviceCreate:{
        type:Boolean,
        default:false
    },
    deviceDelete:{
        type:Boolean,
        default:false
    },
    deviceUpdate:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('users',UserSchema);