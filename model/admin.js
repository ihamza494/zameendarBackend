const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String
    },
    phone: {
        type: String,

    },
    password: {
        type: String
    },



})

UserSchema.methods.generateAuthToken = function () {

    const token = jwt.sign({ _id: this._id, name: this.name }, process.env.SECRET_KEY);
    console.log(token)
    return (token);

}

const Admin = mongoose.model('Admin', UserSchema);
module.exports = Admin;