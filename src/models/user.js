const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    gender:String,
    profilePic:String,
    friends:{
        type:[],
        required:false
    },
    requests:{
        type:[],
        required:false
    }
});

// --- save local storage ---
// userSchema.methods.getId = async function () {
//     try {
//         // const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
//         // this.tokens = this.tokens.concat({token:token});
//         // await this.save();
//         // return token; 
//     } catch (error) {
//         console.log("catch block of generate token");
//         res.send(error);
//     }
// }

// ---- bcrypt password ---
userSchema.pre("save",async function (next) {
    this.password = await bcrypt.hash(this.password,10);
})

const UserDoc = new mongoose.model("User",userSchema);

module.exports = UserDoc;