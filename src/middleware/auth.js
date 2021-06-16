const jwt = require('jsonwebtoken')
const user = require('../models/user')

const auth = async(req , res , next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ' , '');
        // console.log(token);
        const decode = jwt.verify(token , 'hereisthetoken');
        const User = await user.findOne({_id:decode._id , 'tokens.token':token});

        if(!User){
            throw new Error();
        }

        req.token = token;
        req.User = User;
        next();
    }
    catch(e){
        res.status(401).send({error: 'please authenticate'} )
    }
}

module.exports = auth