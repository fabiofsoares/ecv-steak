/*
Imports & configs
*/

const   mongoose    = require('mongoose'),
        { Schema }  = mongoose,
        jwt         = require('jsonwebtoken')

/*
Model definition
*/

const messageSchema = new Schema({
    user_id: String,
    date: { type: Date, default: Date.now  },
    message: String
})

/*
Method
*/

/* userSchema.methods.generateJWT = function generateJWT(){
    //set expiration
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 59);

    //JWT creation
    return jwt.sign({
        _id: this._id,
        email: this.email,
        password: this.password,
        expireIn: '10s',
        exp: parseInt(expiry.getTime() / 100, 10)
    }, process.env.JWT_SECREAT)
} */


/*
Exports
*/

//Pour créer une nouvelle collection sur MongoDB
const MessageModel = mongoose.model('message', messageSchema);
module.exports = MessageModel;