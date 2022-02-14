//just a small note at first: I looked at about 4-5 projects for reference while working on this one and trying to fix the errors so I'm afraid I 
//would have the same thinking strateg as the other developers because I had to fix some things in my code to fix the errors


// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//require body parser
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
//Here we are configuring express to use cors as middle-ware.
app.use(cors());



// Initialize the main project folder
app.use(express.static('website'));

 //p.s this project was really tiring, I cried alot and searched alot



//get request
app.get('/all',function(req, res) {
    res.status(200).send(projectData)
});

//post function
const postData = (req,res) =>{
	projectData = req.body;
	console.log(projectData);
	res.status(200).send(projectData);
}

//post route
app.post('/add',postData);


//using port 8000
//p.s: I had to check that xampp(Apache) was working on another port before choosing this port

// Setup Server
const port = 8000;

const server = app.listen(port,console.log(`serevr running on local host: ${port}`));