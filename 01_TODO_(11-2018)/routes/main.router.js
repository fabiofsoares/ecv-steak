//Imports

//NodeJS
const{ Router } = require('express')
//Inner
const AuthRouterClass = require('./auth/auth.router');
const MessageRouterClass = require('./message/message.router');



/*Define routers*/
//Parent
const   mainRouter    = Router(),
        apiRouter     = Router();
//Child
const   authRouter    = new AuthRouterClass();
const   messageRouter    = new MessageRouterClass();





//Define routes
mainRouter.use('/api', apiRouter)
apiRouter.use('/auth', authRouter.init())
apiRouter.use('/message', messageRouter.init())

//Exports
module.exports = { mainRouter };