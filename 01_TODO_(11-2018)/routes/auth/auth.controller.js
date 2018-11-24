/*
Imports
*/

const UserMoedel = require('../../models/user.model');
const bcrypt = require('bcryptjs')

/*
Functions
*/

const register = (body) => {
    
    // Search for user
    return new Promise((resolve, reject) => {
        
        UserMoedel.findOne({ email: body.email}, (error, user)=>{
            if(error){ // Mongo Error
                //console.log(error)
                return reject(error)
            } else if(user){ // User Alredy exist
                //console.log(user)
                return reject(user)
            } else {
                //Register new user
                //Crypt password
                bcrypt.hash(body.password, 10)
                .then( hashedPassword =>{
                    // Remplace clear password
                    body.password = hashedPassword;
                     
                    //Save User
                    UserMoedel.create(body, (error, newUser) => {
                        if(error){ // Mongo Error
                            return reject(error)
                        } else { // User Registred
                            return resolve(newUser)
                        }
                    })

                })
                .catch( hashError =>{
                    return reject (hashError)
                })

                /* UserMoedel.create(body, (error, newUser) => {
                    if(error){
                        return reject(error)
                    } else {
                        return resolve(newUser)
                    }
                }) */
            }
        })

    })
   
}

const login = (body) => {
    return new Promise((resolve, reject) => {
        
        UserMoedel.findOne({email: body.email}, (error, user) => {
            if(error){
                return reject(error)
            } else if( !user) {
                return reject ('User not found !')
            } else {
                const validPassword = bcrypt.compareSync(body.password, user.password)

                if(!validPassword){
                    return reject('Password not valid')
                } else {
                    return resolve({
                        user: user,
                        token : user.generateJWT()
                    })
                }
            }
        })
    })
}

module.exports = {register, login}