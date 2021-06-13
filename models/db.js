const mongoose = require('mongoose');

//mA47tzVE9P3LTKSK
//var url = 'mongodb+srv://kostadinmarkov:mA47tzVE9P3LTKSK@phonebook.ilxpq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect("mongodb+srv://kostadinmarkov:mA47tzVE9P3LTKSK@phonebook.ilxpq.mongodb.net/PhoneBookDB" , {
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