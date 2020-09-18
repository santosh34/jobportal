const mongoose =  require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title:{
        type: String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: "User"
        
    },
})

module.exports = mongoose.model("Category", categorySchema);