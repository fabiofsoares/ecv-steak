/*
Imports routes
*/

const   express             = require('express'),
        messageRouter       = express.Router(),
        { newMessage, allMessages, deleteMessage } = require('./message.controller');
       
const { checkFields } = require('../../services/request.checker');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');

//Routes definition

class MessageRouterClass {
    routes(){
        
        //Index
        messageRouter.get('/', (req, res) => {
            res.json('MESSAGE API')
        })
        
        //Create
        messageRouter.post('/new', (req, res) => {

            if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

            // Check for mandatories
            const { miss, extra, ok } = checkFields(['user_id', 'message'], req.body);
        
            // Check oppropriated values
            if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

            newMessage(req.body)
            .then( apiRes =>  sendApiSuccessResponse(res, 'Message create', apiRes))
            .catch( apiErr => sendApiErrorResponse(res, 'Message not create', apiErr));
            
        })

         //Delete by User ID
         messageRouter.post('/delete', (req, res) => {

            if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

            // Check for mandatories
            const { miss, extra, ok } = checkFields(['user_id'], req.body);
        
            // Check oppropriated values
            if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

            deleteMessage(req.body)
            .then( apiRes =>  sendApiSuccessResponse(res, 'Message deleted create', apiRes))
            .catch( apiErr => sendApiErrorResponse(res, 'Message deleted not create', apiErr));
            
        })
        
        //Show all
        messageRouter.get('/all', (req, res) => {

            allMessages()
            .then( apiRes =>  sendApiSuccessResponse(res, 'All messages received', apiRes))
            .catch( apiErr => sendApiErrorResponse(res, 'All messages not received', apiErr));
        })

        
    }
    init(){
        this.routes();
        return messageRouter;
    }
}

// Exporter

module.exports = MessageRouterClass;