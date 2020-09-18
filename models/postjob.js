const mongoose= require('mongoose');
const Schema = mongoose.Schema;



const jobpostSchema = new Schema({

    title:{
        type:String,
        default:''
        
    },
   
    city:{
        type:String,
        default:''
       
    },
    type:{
        type:String,
        default:''
        
        
    },
 
    date:{
        type:String
       

        
    },
    category:{
        type:Schema.Types.ObjectId,
        ref: "Category"
        
    },

    company:{
        type:Schema.Types.ObjectId,
        ref: "Company"
        
    },
    postuserid:{
        type:Schema.Types.ObjectId,
        ref: "User"
        
    },
    jobcategory:{
        type:String,
        default:''
        
    },
    experience:{
        type:String,
        default:''
        
    },
    experiencelevel:{
        type:String,
        default:''
        
    },
  
    position:{
        type: String,
        default:''
    },
    
    gender:{
        type: String,
        default:''
    },
   
    description:{
        type: String,
        default:''
    },


});

module.exports = mongoose.model("PostJob", jobpostSchema);