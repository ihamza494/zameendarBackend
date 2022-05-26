const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema(
    {
        name: {
            type: String,

        },
        cnic: {
            type: String
        },
        phone: {
            type: String,

        },
        age: {
            type: Number,
        },
        date: {
            type: String
        },

    })

const Farmer = mongoose.model('Farmer', FarmerSchema);
module.exports = Farmer;