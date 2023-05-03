const mongoose = require('mongoose');

const uri = 'mongodb+srv://bvb:bvb123@cluster0.73fallx.mongodb.net/?retryWrites=true&w=majority';

const connectToDB = () =>{
    mongoose.connect(uri).then(()=>{
        console.log("Connected to DB success");
    })
    .catch((err)=> {
        console.log(err);
    })
};

module.exports = connectToDB;