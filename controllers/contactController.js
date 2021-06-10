const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

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
    var contact = new Contact();
    contact.fullName = req.body.fullName;
    contact.phoneNumber = req.body.phoneNumber;
    contact.email = req.body.email;
    contact.address = req.body.address;
    contact.save((err, doc) => {
        if(!err){
            res.redirect('contact/list');
        }else{
            alert('Error during insert: ' + err);
        }
    })
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

router.get('delete/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect("contact/list");
        } else{
            console.log("Error in the deletion: " + err);
        }
    });
});

module.exports = router;