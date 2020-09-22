const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')
const postjobSchema =new Schema({
    jobtitle:{
        type:String
    },
    jobskills:{
        type:String
    },
    jobtype:{
        type:String
    },
    educationlevel:{
        type:String
    },
    jobexperience:{
        type:String
    },
    jobexperiencelevel:{
        type:String
    },
    gender:{
        type:String
    },
    location:{
        type:String
    },
    jobbycategory:{
        type:String
    },
    jobexpire:{
           type:String,

    },
    jobdescription:{
        type:String,
    },
    jobpostdate:{
        type:String
    },
    postuserid:{
        type:Schema.Types.ObjectId,
        ref: "User"
        
    }
   
});


module.exports = mongoose.model("PostJob", postjobSchema);