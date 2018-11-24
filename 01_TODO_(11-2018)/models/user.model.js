/*
Imports & configs
*/

const   mongoose    = require('mongoose'),
        { Schema }  = mongoose,
        jwt         = require('jsonwebtoken')

/*
Model definition
*/

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
})

/*
Method
*/

userSchema.methods.generateJWT = function generateJWT(){
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
}


/*
Exports
*/

//Pour créer une nouvelle collection sur MongoDB
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;