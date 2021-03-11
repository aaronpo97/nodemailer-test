require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const nodemailer = require('nodemailer');

app.use(express.static('public'));
app.use(express.json());

app.post('/', (req, res) => {
	const trasnporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASS,
			// todo: add OAUTH 2.0 with google api
		},
	});

	const { message, subject, email } = req.body;
	const mailOptions = {
		to: email,
		subject: subject,
		text: message,
	};

	trasnporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.send('error');
			return;
		}

		console.log(`Email sent: ${info.response}`);
		res.send(`Email sent to ${process.env.EMAIL} successfully.`);
	});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
