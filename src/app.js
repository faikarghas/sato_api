const express           = require('express');
const cors              = require('cors');
const logger            = require('morgan');
const fileUpload        = require('express-fileupload');


const project           = require('../routes/project');
const career           = require('../routes/career');
const studies           = require('../routes/studies');
const testimonials           = require('../routes/testimonials');
const ourTeam           = require('../routes/ourTeam');
const slider           = require('../routes/slider');
const faq           = require('../routes/faq');
const intouch           = require('../routes/intouch');
const search           = require('../routes/search');
const admin           = require('../routes/admin');
const web           = require('../routes/web');
const auth           = require('../routes/authentication');

const app       = express();


app.use(cors());
app.use(fileUpload());


app.use('/images', express.static(__dirname + '/../images'));

app.use('/api',auth)
app.use('/api',project)
app.use('/api',career)
app.use('/api',studies)
app.use('/api',testimonials)
app.use('/api',ourTeam)
app.use('/api',slider)
app.use('/api',faq)
app.use('/api',intouch)
app.use('/api',search)

app.use('/api',admin)
app.use('/api',web)




app.use(logger('dev'))


app.get('/',(req,res)=>{
    res.status(200).send('sato rest api')
})


module.exports = app
