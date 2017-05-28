setTimeout(function(){



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
// const departments = {
//   communications : 76,
//   commercial: 89,
//   rrw: 99,
//   management: 93,
//   activities: 95,
//   finance: 91,
//   officers: 97
// }


const departments = {
  activities: [95, "Activities"],
  commercial: [89, "Commercial"],
  communications : [76, "Communications"],
  finance: [91, "Finance"],
  management: [93, "Management"],
  officers: [97, "Sabbatical officers"],
  rrw: [99, "Research, Representation and Welfare"]
}



// Callback function to process the recieved data
function processData(response, departments){
  // Blank object to hold data formatted in the correct manner
  var processedData = {};
  // For every entry in the departments array, filter the response and pull out users of that department, then add them into a fresh, orderly object
  for (var department in departments) {
    // Special [] notation used here for dynamic key names inside the loop
    processedData[department] = response.filter(function(user){
      // True/false condition
      return user.jh_meta.dept == departments[department][0];
    });
  }
  // And sort the array alphabetically

  // Now data is processed, display it
  displayGallery(processedData);
}

// Finally, a callback function to actually display the recieved data
function displayGallery(processedData){
  // Grab the container element from the DOM
  var container = document.getElementById('simon-team-gallery');
  // Clear away the spinner
  container.innerHTML = '';

  for (var department in processedData) {
    // Opening markup
    container.innerHTML += `<h3 class="department">${departments[department][1]}</h3><ul class="team" id="${department}"></ul>`;
    // For every member in the team, display them acording to the following template string
    for (var i = 0; i < processedData[department].length; i++) {

      // Only show members who have the "perm staff" role with a listed job title
      if (processedData[department][i].jh_meta.roles.permstaff && processedData[department][i].jh_meta.job_title) {
        document.getElementById(department).innerHTML += `
          <li class="member">
            <div class="img" style="background-image:url(${processedData[department][i].jh_meta.primary_picture ? processedData[department][i].jh_meta.primary_picture : processedData[department][i].jh_meta.fallback_picture})">
              <div class="cover">
                <div class="member-contact">
                ${processedData[department][i].jh_meta.twitter ? '<a target="blank" href=http://twitter.com/' + processedData[department][i].jh_meta.twitter + '><i class="fa fa-twitter"></i></a>' : ''}

                  <a href="mailto:${processedData[department][i].jh_meta.email}"><i class="fa fa-envelope-o"></i></a>
                  <a href="tel:02079115000${processedData[department][i].jh_meta.phone}"><i class="fa fa-phone"></i></a>
                </div>
              </div>
            </div>
            <p class="member-job-title">${processedData[department][i].jh_meta.job_title}</p>
            <h4 class="member-name">${processedData[department][i].name}</h4>
          </li>
        `;
      }


    }
  }

  // For debuggin'
  console.log(processedData)
}

},1000)
