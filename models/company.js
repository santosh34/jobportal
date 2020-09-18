const mongoose= require('mongoose');
const Schema = mongoose.Schema;



const companySchema = new Schema({



    cname:{
        type:String,
        default:''
        
    },
    cphone:{
        type:Number,
        require:''
        
    },

    cemail:{
        type:String,
        default:''
       
    },
    cwebsite:{
        type:String,
        default:''
    },
    postjob:{
        type: Schema.Types.ObjectId,
        ref: "PostJob"
    },
    ccity:{
        type:String,
        default:''
        
    },
    corganization:{
        type: String,
        default:''
    },
    cemploye:{
        type: String,
        default:''
    },
    cmedia:{
        type: String,
        default:''
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
        
       
    },
    cdescription:{
        type: String,
        default:''
    },
 

});

module.exports = mongoose.model("Company", companySchema);