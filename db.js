//db.js
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose')

const url = mongodb+srv://toluehinmosan51:toluehinmosan51@cluster0.ezos16b.mongodb.net/?retryWrites=true&w=majority;

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



