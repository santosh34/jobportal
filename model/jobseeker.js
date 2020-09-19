const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const jobseekerSchema =new Schema({
    jobseekerusername:{
        type:String
    },
    jobseekeremail:{
        type:String
     },
    jobseekerpassword:{
        type:String
    },
    preferredcategories:{
        type:String
     },
    jobexperience:{
        type:String
    },
    phonenumber:{
        type:String
    },
    temporaryaddress:{
        type:String
     },

    aboutyou:{
        type:String
    },
    avtar:{
        type:String
     }
});

module.exports = mongoose.model("JobSeeker", jobseekerSchema);