const express = require('express');
const multer = require('multer');

require('dotenv').config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid,authToken);

const upload = multer();
const app = express();

const sendMessage = (req,res) => {
	const number = process.env.TWILIO_NUMBER;
	const messagingSid = process.env.MESSAGING_SID;
	const sender = req.body.sender;
	const celebrant = req.body.celebrant;
	const celebrantNumber = req.body.number;

	const message = `${sender} says: Happy birthday, ${celebrant}`;

	client.messages
				.create({
					body: message,  
         	messagingServiceSid: messagingSid,      
         	to: celebrantNumber
				})
				.done();
}


app.post("/", upload.none(), sendMessage)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));