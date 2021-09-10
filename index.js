const express = require('express');
const multer = require('multer');

require('dotenv').config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid,authToken);

const upload = multer();
const app = express();

const sendMessage = (req,res,next) => {
	const messagingSid = process.env.MESSAGING_SID;
	const sender = req.body.sender;
	const celebrant = req.body.celebrant;
	const number = req.body.number;

	const message = `${sender} says: Happy birthday, ${celebrant}`;

	client.messages
				.create({
					body: message,  
         			messagingServiceSid: messagingSid,      
         			to: number
				})
				.done();
	next();
}

app.get("/", (req,res) => res.status(200).send())
app.post("/", upload.none(), sendMessage, (req,res) => res.status(200).send())

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening on port ${port}...`));