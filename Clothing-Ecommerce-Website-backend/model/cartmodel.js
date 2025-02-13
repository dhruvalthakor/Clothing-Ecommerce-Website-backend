const mongoose=require("mongoose");

const cartschema=mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    product:{
        type: Object,
        required: true,
    },
    size:{
        type: Object,
        required: true,
    },
    quantity:{
        type: Object,
        required: true,
    }
});

const cartmodel=mongoose.model("cart",cartschema);

module.exports=cartmodel;