const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:false
    },
    confirmationCode:{
        type: String,
        unique: true,
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
    tokens: [{
        token: {
            type: String,
            required: true
    }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'hereisthetoken')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token;
}

userSchema.statics.findByCredentials = async(username , password)=>{
    const User = await user.findOne({username});
    // console.log(User);
    if(!User){
        throw new Error("Unable to login");
    }
    bcrypt.compare(password, User.password, (err, result)=> {
        if(result==true){
            return User;
        }
        else{
            return err;
        }
    });
    const Password = await user.findOne({password});
    return User;
}

// userSchema.pre('save' , async function(next) {
//     const user = this;

//     console.log("Just before saving");

//     next();
// })

userSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password ,8);
})

const user = new mongoose.model('user' , userSchema);
module.exports = user;