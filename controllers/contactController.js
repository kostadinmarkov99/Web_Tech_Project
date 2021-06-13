const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
var docs;

router.get('/', (req, res) => {
    res.render('contact/addOrEdit', {
        viewTitle: 'Insert Contact'
    });
})


router.post('/', (req, res) => {
    if(req.body._id == ''){
        inserContact(req, res);
    }else{
        updateContact(req, res);
    }
})

function inserContact(req, res){

    var newInsertedNumber = "";
    var oldId = "";
    var flagSkipp = false;
    var flag = false;
    var contactResult = function(fullName, callback) {
        Contact.find({fullName: req.body.fullName}).where("fullName", fullName).
              exec(function(err, blogs) {
                 // docs contains an array of MongooseJS Documents
                 // so you can return that...
                 // reverse does an in-place modification, so there's no reason
                 // to assign to something else ...
                 blogs.reverse();
                 callback(err, blogs);
              });
        };

    contactResult(req.body.fullName, function(err, blogs) {
        if (err) { 
           /* panic! there was an error fetching the list of blogs */
           return console.log("Error!");
        }
        // do something with the blogs here ...

        console.log(blogs.length);
        console.log(blogs);
        if(blogs.length >= 1){
            blogs.forEach((result, i) => {
                var oldNumber = result.phoneNumber;
                oldId = result._id;
                var newNumber = req.body.phoneNumber.toString();
                if(newNumber.match(/^[0-9]+$/) == null){
                    flagSkipp = true;
                    console.log("Error!");
                    flag = true;
                }else{
                    newInsertedNumber = oldNumber + ", " + newNumber;
                    console.log("newInsertedNumber: " + newInsertedNumber);
                }
                
            })
        }
    
    
console.log("here");

    console.log("newInsertedNumber: " + newInsertedNumber);
    if(newInsertedNumber != ""){
        console.log("yes");
        console.log(newInsertedNumber);
        //TODO: update instead of insert
        flagSkipp = true;
            if(!flag){
            updateContactByInsertion(res, oldId, newInsertedNumber);
        }
    }

if(flag){
    res.redirect('contact/list');
}
if(flagSkipp) {
    
}else{
    var contact = new Contact();
    contact.fullName = req.body.fullName;
    contact.phoneNumber = req.body.phoneNumber;
    contact.email = req.body.email;
    contact.address = req.body.address;
    contact.save((err, doc) => {
        if(!err){
            res.redirect('contact/list');
        }else{
            console.log('Error during insert: ' + err);
        }
    })
}
});
}

function updateContactByInsertion(res, oldId, newInsertedNumber){
    console.log("I am in the new function!");
    console.log(newInsertedNumber);
    Contact.findOneAndUpdate({_id: oldId}, {$set: {phoneNumber: newInsertedNumber}}, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('contact/list');
        }  else{
            console.log("Error during update: "+ err);
        }
    })
    console.log("here too");
}

function updateContact(req, res){
    Contact.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('contact/list');
        }  else{
            console.log("Error during update: "+ err);
        }
    })
}

router.get('/list', (req, res) => {
    Contact.find((err, docs) => {
        if(!err){
            res.render('contact/list', {
                list: docs
            })
        }else{
            console.log('Error in retrieval: '+ err);
        }
    })
})

function doAllWork(){
    router.get('/list', (req, res) => {
        Contact.find((err, docs) => {
            if(!err){
                res.render('contact/list', {
                    list: docs
                })
            }else{
                console.log('Error in retrieval: '+ err);
            }
        })
    })
}

router.get("/:id", (req, res) => {
    Contact.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("contact/addOrEdit", {
                viewTitle: "Update Contact",
                contact: doc
            });
            console.log(doc);
        }
    })
});

router.get("/delete/:id", (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            Contact.find((err, docs) => {
                if(!err){
                    doAllWork();
                    res.render('contact/list', {
                        list: docs
                    })
                }else{
                    console.log('Error in retrieval: '+ err);
                }
            })
        } else{
            console.log("Error in the deletion: " + err);
        }
    });
});

module.exports = router;