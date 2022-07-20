// Global Variables
let bandButtonEl = document.getElementById("band-button");
let bandNameSearch = document.getElementById("form1").value;
let bands = [];
let lat;
let long;
let listOfResults = '';
const arrayOfResults = [];
let currentOption;
let number = 0;
let marker;
// Initial logic to pull previous search results from Local Storage and display on the DOM
let arrayForLocalStorage = [];
let retrievedFromLS = JSON.parse(window.localStorage.getItem('search'));
// If statement that checks if local storage is empty.
if(retrievedFromLS === null) {
  retrievedFromLS = [];
  $('#recent-searches').append('<h5>No Recent Searches Yet</h5>');
} else {
  // If local storage is not empty
  for(let i = 0; i< retrievedFromLS.length; i++) {
    arrayForLocalStorage.push(retrievedFromLS[i]);
  }
  // Add HTML to recent searches list 
  for(let j = 0; j < arrayForLocalStorage.length; j ++) {
    // This if statement elimates anything in the array that says Null
    if(arrayForLocalStorage[j].name != null ) {
      $('#recent-searches-list').append(`<li id="${j}" class="list-group-item">${arrayForLocalStorage[j].name}</li>`)
    }
  }
}
// After the recent searches are loaded, this function controls what happens when you click on one of the options
$('#recent-searches-list').children().on('click', function() {
  const curArray = $(this).attr('id')
// Set latitude and longitude
  lat = arrayForLocalStorage[curArray]._embedded.venues[0].location.latitude
  long = arrayForLocalStorage[curArray]._embedded.venues[0].location.longitude
// Locate on map by pulling information from API
      mapSearch(lat, long)
      // This controls the marker's text that displays
      marker.bindPopup(`<b>${arrayForLocalStorage[curArray].name}</b><br>Venue: ${arrayForLocalStorage[curArray]._embedded.venues[0].name}<br>Date: ${arrayForLocalStorage[curArray].dates.start.localDate}<br>Time: ${arrayForLocalStorage[curArray].dates.start.localTime}<br><a href="${arrayForLocalStorage[curArray].url}" target="_blank">See Web Page</a>`).openPopup();
      $('#glass-container').remove()
      $('#recent-searches').remove()
      $('#newSearch').append('<button id="refresh-button" class="btn-primary rounded">Click for New Search</button>')
      $('#choices-list').remove()
      // It adds a refresh button that reloads the page when you click on it
      $('#refresh-button').on('click', function() {
        location.reload()
      })
})
// function for searching on map. Can be called in other places
const mapSearch = function(lat, long) {
// Set the maps and marker's latitude and longitude. They should be equal to values in the parameters
  let map = L.map('map').setView([lat, long], 12);
  marker = L.marker([lat, long]).addTo(map);
// Addition code for setting map position
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);
}
// Code for setting list of states in the dropdown menu on HTML page
let select = document.getElementById("myInput")
let options = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
for(let i = 0; i < options.length; i++) {
  let opt = options[i];
  let el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  select.appendChild(el);
}
// Fetch request to pull data from API
function getApi() {
  $('#recent-searches').remove()
  // The line of code below pulls what the current selected state is.
  state = document.getElementById('myInput').value;
  let bandNameSearch = document.getElementById('form1').value;
    // fetch request gets a list of objects for all ticketmaster music events
    let requestUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=mgQugAMUEqgKEogCWbyjp56vnUXbRbsr&locale=*&stateCode=${state}&segmentName=Music&size=200`;
   fetch(requestUrl).then(function(res) {
    return res.json()
   }).then(function(data) {
    let results = data._embedded.events
    for(let i = 0; i < results.length; i++) {
      if(results[i].name.includes(bandNameSearch)) {
        // It removes search option
        $('#glass-container').remove()
        // Inserts HTML for the concert information
        listOfResults += `<li id="${number}" class="list-group-item">${results[number].dates.start.localDate} - ${results[number]._embedded.venues[0].name}</li>`
        number ++
      arrayOfResults.push(results[i])
      } else {
        $('#glass-container').html(`<h2>No results found</h2><br><button id="refresh-button" class="btn-primary rounded">Click for New Search</button>`)
        $('#refresh-button').on('click', function() {
          location.reload()
        })
      }
    }
    // Append the choices of concerts to HTML
    $('#choices-list').append(listOfResults)
    // When you click on one it populates the map
    $('#choices-list').children().on('click', function(e) {
      currentOption = $(this).each(function(e) {
        return $(this).attr('id')
      }).attr('id')
      // Map search logic
      lat = arrayOfResults[currentOption]._embedded.venues[0].location.latitude
      long = arrayOfResults[currentOption]._embedded.venues[0].location.longitude
      mapSearch(lat, long)
        // This logic controls the text that displays in the popup marker when searching for a concert.
        marker.bindPopup(`<b>${arrayOfResults[currentOption].name}</b><br>Venue: ${arrayOfResults[currentOption]._embedded.venues[0].name}<br>Date: ${arrayOfResults[currentOption].dates.start.localDate}<br>Time: ${arrayOfResults[currentOption].dates.start.localTime}<br><a href="${arrayOfResults[currentOption].url}" target="_blank">See Web Page</a>`).openPopup();
        $('#choices').remove()
        $('#newSearch').append('<button id="refresh-button" class="btn-primary rounded">Click for New Search</button>')
        $('#refresh-button').on('click', function() {
          location.reload()
        })
        // Adds new results to local storage
        arrayForLocalStorage.push(arrayOfResults[currentOption])
        localStorage.setItem(`search`, JSON.stringify(arrayForLocalStorage))
        $('#choices-list').remove()
    })
   })
}
// When you click the band button, the API information is pulled
bandButtonEl.addEventListener('click', getApi);