/*
Imports routes
*/

const   express             = require('express'),
        authRouter          = express.Router(),
        { register, login } = require('./auth.controller');

const { checkFields } = require('../../services/request.checker');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');

//Routes definition

class AuthRouterClass {
    routes(){
        //Index
        authRouter.get('/', (req, res) => {
            res.json('HEATED API')
        })

        //Create
        authRouter.post('/register', (req, res) =>{
            //res.json('Hello Register')
            //Use controller function
            if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

            // Check for mandatories
            const { miss, extra, ok } = checkFields(['first_name', 'last_name', 'email', 'password'], req.body);
        
            // Check oppropriated values
            if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

            
            register(req.body)
            .then( apiRes =>  sendApiSuccessResponse(res, 'User create', apiRes))
            .catch( apiErr => sendApiErrorResponse(res, 'User not create', apiErr));
            //.then( apiResponse => res.json(apiResponse))
            //.catch( apiResponse => res.json(apiResponse))
        })

        //Login
        authRouter.post('/login', (req, res) =>{
            
            if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );
            
            // Check for mandatories
            const { miss, extra, ok } = checkFields(['email', 'password'], req.body);
        
            // Check oppropriated values
            if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }
            
            login(req.body)
            .then( apiRes =>  sendApiSuccessResponse(res, 'User receveid', apiRes))
            .catch( apiErr => sendApiErrorResponse(res, 'User not receveid', apiErr));
            //.then( apiResponse => res.json(apiResponse))
            //.catch( apiResponse => res.json(apiResponse))

        })
    }
    init(){
        this.routes();
        return authRouter;
    }
}

// Exporter

module.exports = AuthRouterClass;