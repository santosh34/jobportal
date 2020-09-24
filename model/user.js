const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema =new Schema({
    username:{
        type:String
        
  
    },
    postjob:{
        type:Schema.Types.ObjectId,
        ref: "PostJob"
        
    },
    appliedjobseeker:[{
        type: Schema.Types.ObjectId,
        ref: "JobSeeker"
    }],
    postjob:{
        type:Schema.Types.ObjectId,
        ref: "PostJob"
        
    },
    useraddress:{
        type:String
  
    },
    fullname:{
        type:String
       
  
    },
    email:{
        type:String
     
      
    },
    password:{
        type:String
      
    },
    companyname:{
        type:String
        
  
    },
    companytype:{
        type:String
    
      
    },
    ownership:{
        type:String
       
    },
    userphone:{
        type:Number
       
    },
    companyaddress:{
        type:String
       
    },
    website:{
        type:String
    
    },
    companyphone:{
        type:Number
       
    },
    medialink:{
        type:String
    },
    companyemail:{
        type:String
    },
    companydescription:{
        type:String
    },
    companylogo:{
        type: String
    }
});
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model("User",userSchema);