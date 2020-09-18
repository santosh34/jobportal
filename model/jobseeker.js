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
    }
});
jobseekerSchema.methods.encryptPassword = (jobseekerpassword) => {
    return bcrypt.hashSync(jobseekerpassword, bcrypt.genSaltSync(10), null);
}

jobseekerSchema.methods.validPassword = function(jobseekerpassword) {
    return bcrypt.compareSync(jobseekerpassword, this.jobseekerpassword);
};


module.exports = mongoose.model("JobSeeker", jobseekerSchema);