const mongoose=require("mongoose");

const productschema=mongoose.Schema({
    productimage:{
        type: String,
        required: true,
    },
    productbrand:{
        type: String,
        required: true,
    },
    productname:{
        type:String,
        required:true,
    },
    productprice:{
        type:String,
        required:true,
    },
    productrating:{
        type:String,
        required:true,
    },
    createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const productmodel=mongoose.model("product",productschema);

module.exports=productmodel;