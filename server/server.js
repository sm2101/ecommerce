const express    = require('express'),
      app        = express(),
      mongoose   = require('mongoose'),
      morgan     = require('morgan'),
      bodyParser = require('body-parser'),
      cors       = require('cors'),
      fs         = require('fs');
require('dotenv').config();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true
}).then(()=>{
    console.log('DB CONNECTED');
}).catch(err =>{
    console.log(err)
})

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

fs.readdirSync('./api/routes').map((r)=>app.use(require("./api/routes/"+r)));
app.listen(process.env.PORT,(req,res)=>{
    console.log('Server is live at',process.env.PORT);
})