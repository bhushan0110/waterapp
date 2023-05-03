const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
    flatNo:{
        type: String,
        required: true,
    },
    volume:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Reading = mongoose.model('Reading',ReadingSchema);
module.exports = Reading;