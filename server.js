const app = require('./src/app')

require('dotenv').config()

const port      = process.env.PORT || 3009;

app.listen(port,()=>{
    console.log(`> server api ready on ${port}`);
})