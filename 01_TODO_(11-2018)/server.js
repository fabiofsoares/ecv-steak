//Imports et configurations

const   express     = require('express'),
        path        = require('path'),
        bodyParser  = require('body-parser');
                      require('dotenv').config();

const   port            = process.env.PORT,
        host            = process.env.HOST,
        server          = express(),
        { mainRouter }  = require('./routes/main.router')
        db              = require('./services/db')

const init = () => {
    // => MongoDB
    db.initClient()

    // =>Body Parser
    server.use(bodyParser.json({limit: '10mb'}))
    server.use(bodyParser.urlencoded({extended: true}))

    // => Router
    server.use('/', mainRouter);

    server.listen(port, host, () => {
        console.log(`Server is running on ${host}:${port}`)
    })
}

init();