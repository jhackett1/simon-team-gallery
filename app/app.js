// First, trigger the spinner while we wait
document.getElementById('simon-team-gallery').innerHTML = '<i class="fa fa-spinner" id="spinner"></i>'

// Open a new HTTP request
const xmlhttp = new XMLHttpRequest();

// Where is the API we'll get the data from?
const endpoint = "http://uwsustaff.com/wp-json/wp/v2/users?per_page=50";

// Make the request
xmlhttp.onreadystatechange = function() {
    // Ifthe response comes back okay, encode it as JSON and send it into the callback function
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log('200: Response from uwsustaff.com recieved');
        processData(response, departments);
    }
};
xmlhttp.open("GET", endpoint, true);
xmlhttp.send();

// Object to keep track of which dept values correspond to departments
const departments = {
  communications : 76,
  "Commercial": 89,
  "Research, Representation & Welfare": 99,
  "Management": 93,
  "Activities": 95,
  "Finance": 91,
  "Student officers": 97
}

// Helper function to pull out those of a particular department (passed in via string) and return the value
function deptSorter(needle, haystack, departments){

}

// Callback function to process the recieved data
function processData(response, departments){
  // Blank object to hold data formatted in the correct manner
  var processedData = {};

  // DESIRED STRUCTURE
  //
  // var processedData = {
  //   "communications" : [
  //     {
  //       name: "",
  //       job_title: "",
  //       phone: "",
  //       email: "",
  //       twitter: "",
  //       primary_picture: "",
  //       alt_picture: "",
  //       fallback_picture: "",
  //     },
  //     {}
  //   ]
  // }


  var communicationsTeam = response.filter(function(user){
    return user.jh_meta.dept == departments.communications;
  })
  processedData.communications = communicationsTeam;




  displayGallery(processedData);
}

// Finally, a callback function to actually display the recieved data
function displayGallery(processedData){
  // Grab the container element from the DOM
  var container = document.getElementById('simon-team-gallery');
  // Clear away the spinner
  container.innerHTML = '';

  console.log(processedData)

}
