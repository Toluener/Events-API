//db.js
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose')
const {privateKey} = JSON.parse(process.env.URL_PRIVATE_KEY)
console.log(privateKey);
const url = privateKey;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

 connect = mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    });



