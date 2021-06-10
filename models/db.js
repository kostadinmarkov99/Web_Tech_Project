const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PhoneBookDB', {
    useNewUrlParser: true,
     useUnifiedTopology: true
}, 
error => {
    if(!error){
        console.log('Connection succeeded');
    }else{
        console.log('Error in connection' + error);
    }
})

require('./contact.model');