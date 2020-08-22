const express           = require('express');
const cors              = require('cors');
const logger            = require('morgan');
const fileUpload        = require('express-fileupload');

const leads           = require('../routes/leads');
const auth           = require('../routes/authentication');

const app       = express();


app.use(cors());
app.use(fileUpload());


app.use('/images', express.static(__dirname + '/../document'));

app.use('/api', leads);
app.use('/api',auth)


app.use(logger('dev'))


app.get('/',(req,res)=>{
    res.status(200).send('prosper rest api')
})


module.exports = app
