const express = require('express');
const nodemailer = require('nodemailer');
const eventModel = require('../model/Eventschema');
const auth = require('../middleware/auth');
const sendEmail = require('../utilis/email');



const app = express();

app.use(express.json());


//GET Homepage
app.get('/', (req, res) => 
{res.send('Welcome to Events API');
res.end();});


//GETALL Events
app.get('/events', auth, async (req, res) =>
{const events = await eventModel.find({});

try {
    res.json(events);}
 catch(error){res.status(500).send(error);}
});


app.get('/event/:id', auth, async (req, res) =>
{const event = await eventModel.findById(req.params.id);

try {
    res.send(`REPORT: For your event ${event.description}, the number of attendees registered for the event is:${event.attendees.length}, the attendees registered are ${event.attendees}, the date and time for this event is ${event.date}, ${event.time} and it will be held at ${event.location}. 
    Make sure to prepare on time as you are the host. Wishing you a fun filled event!!`);}
 catch(error){res.status(500).send(error);}
});



//POST create a new event
app.post('/event', auth, async (req, res) =>{
    const event = new eventModel(req.body);

    try {
        await event.save();

        if(event.attendees){

            for(let i = 0; i < event.attendees.length; i++ ){
        
                await sendEmail(
                    {
                      email: event.attendees[i].email,
                      subject: 'Event Attendance Status',
                      message: `You have been added to the event: ${event.id} with description: ${event.description}`});
                    }}
        res.json(event);            
    } catch(error) {
        res.status(500).send(error);
    }})





//PATCH  update event
app.patch('/event/:id', auth, async (req, res) => {
    
    try{
        const event = await eventModel.findById(req.params.id);

        if(!event){ res.status(404).send("Event not found");}
    
    else if(event){
    const newevent = await eventModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

    if(req.body.attendees){

    for(let i = 0; i < newevent.attendees.length; i++ ){

        await sendEmail(
            {
              email: newevent.attendees[i].email,
              subject: 'Event Attendance Status',
              message: `You have been added to the event: ${newevent.id} with description: ${newevent.description}`
            });}
        res.sendStatus(200);}
        else{res.send('Your Event has been sucessfully updated');}       
    }}
catch(error){res.status(500).send(error);}});



//DELETE delete event

app.delete('/event/:id', auth, async (req, res) => {
    try{
        const event = await eventModel.findByIdAndDelete(req.params.id);

        if(!event) res.status(404).send("Event not found")
        else(res.status(200).send("The event has been removed"));}
    catch(error) {res.status(500).send(error);}});




  //DELETE ATTENDEE FROM EVENT

  app.delete('/remove/attendee/:id', auth, async (req, res) => {
    try{
        const event = await eventModel.findById(req.params.id);
        const email = req.query.attendeeemail;

        if(!event){ res.status(404).send("Event not found")}
    
 if(event){let index = event.attendees.findIndex(i => i.email === email); 

          if(index >= 0){let arr = event.attendees.splice(index, 1);
        await eventModel.findByIdAndUpdate(req.params.id, {attendees: event.attendees}, {new: true}).then(
            res.send(`This attendee has been removed, your new attendee count is ${event.attendees.length}`)
            );
        await sendEmail(
            {
              email: email,
              subject: 'Event Attendance Status',
              message: `You have been removed from the event: ${event.id} with description: ${event.description}`
            })
    } 
         else{res.send('attendee not found');}
    }
} catch(error){res.status(500).send(error);}});

    module.exports = app;