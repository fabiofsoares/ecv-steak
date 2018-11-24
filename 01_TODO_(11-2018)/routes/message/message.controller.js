/*
Imports
*/

const MessageModel = require('../../models/message.model');
const bcrypt = require('bcryptjs')

/*
Functions
*/

const newMessage = (body) => {
    
    return new Promise((resolve, reject) => {
        
        MessageModel.create(body, (error, newMessage) => {
            if(error){ // Mongo Error
                return reject(error)
            } else { // User Registred
                return resolve(newMessage)
            }
        })       

    })
   
}
const allMessages = () => {
    
    return new Promise((resolve, reject) => {
        
        MessageModel.find({}, (error, newMessage) => {
            if(error){ // Mongo Error
                return reject(error)
            } else { // User Registred
                return resolve(newMessage)
            }
        })
    })
}

const deleteMessage = (body) => {
    
    return new Promise((resolve, reject) => {
        
        MessageModel.findOneAndDelete(body, (error, newMessage) => {
            if(error){ // Mongo Error
                return reject(error)
            } else { // User Registred
                return resolve(newMessage)
            }
        })
    })
}



module.exports = { newMessage, allMessages, deleteMessage }