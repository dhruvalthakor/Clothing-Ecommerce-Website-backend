const mongoose=require("mongoose");

module.exports.conection=async()=>{
    await mongoose.connect(process.env.Mongodb);
    console.log("database connected on atles");
}