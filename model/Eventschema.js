const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    attendees: [{name:{type:String }, email:{type: String, required: true}}]
    }, 
    { versionKey: false});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;