const mongoose = require('mongoose');

const GetSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Model: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('DriverModels', GetSchema);