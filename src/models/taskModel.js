const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    title : {
        type : String , 
        required : true , 
        minlength : 3 , 
        trim : true , 
        maxlength : 30 , 
    }, 
    completed : {
        type : Boolean , 
        default : false 
    }
} , {timestamps : true }); 


const Task = mongoose.model("tasks", taskSchema); 
module.exports = Task ; 