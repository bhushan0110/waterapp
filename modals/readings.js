const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
    flatNumber:{
        type: Number,
        required: true,
    },
    volume:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    }
});

const Reading = mongoose.model('Reading',ReadingSchema);
module.exports = Reading;