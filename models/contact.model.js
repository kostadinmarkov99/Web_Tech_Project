var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required'
    },
    phoneNumber: {
        type: String,
        required: 'This field is required'
    },
    email: {
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    }
})

mongoose.model("Contact", contactSchema);