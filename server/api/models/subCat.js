const mongoose = require('mongoose'),
      {ObjectId} = mongoose.Schema;

const subCatSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:[2,'Too Short'],
        maxlength:[32,'Too Long']
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    },
    parent:{
        type:ObjectId,
        ref:"Cat",
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("SubCat",subCatSchema);