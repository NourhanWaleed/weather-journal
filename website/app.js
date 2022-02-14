/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

//url and apikey
const URL ='https://api.openweathermap.org/data/2.5/weather?zip=';
const ApiKey =',&appid=605a9f69a05751b22b47810250c7a131&units=metric';


//server
const server = "http://127.0.0.2:8000";


//the function that will be called by the event listener
function generateData(){
	//get value on button click from user
	const zip = document.getElementById('zip').value;
	const feelings = document.getElementById('feelings').value;
	
	
	 getWeather(URL, zip, ApiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { 
      	newDate: newDate,
      	 temp: userData.main.temp,
      	 feelings: feelings
      	 })
    }).then(function (newData) {
      // call updateUI to update browser content
      updateUI()
    });

};

document.getElementById("generate").addEventListener("click",generateData);


//to get web api data
const getWeather = async (URL, zip, ApiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(URL + zip + ApiKey);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}


//function to post data
async function postData ( url = '' , info = {}){

	const res = await fetch(url, {
		method: 'POST',
		credentials: "same-origin",
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify(info)
	});
	try {
		const newData = await res.json();
		console.log(newData);
		return newData;
	}catch(error){
		console.log(`error: ${error}`);
	}
};

//the asynchronous updating ui function that's called above
async function updateUI() {
	//getting all data
	const res = await fetch('/all');
	//checking for errors
	try{
		const allData = await res.json();
		//updating new entry values
		document.getElementById('date').innerHTML = `Date: ${allData.newDate}`;
		document.getElementById('temp').innerHTML =`Temperature: ${allData.temp} degree celsius`;
		document.getElementById('content').innerHTML =`I feel ${allData.feelings}`;
	}  catch(error){
		console.log(`error: ${error}`);
	}
};