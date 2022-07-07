var bandButtonEl = document.getElementById("band-button");
var bandNameSearch = 'Chris Stapleton';
var bands = [];
let lat
let long
let listOfResults = ''
const arrayOfResults = []
let currentOption
let number = 0

const arrayForLocalStorage = []
const retrievedFromLS = JSON.parse(window.localStorage.getItem('search'))
console.log(retrievedFromLS)
if(retrievedFromLS === null) {
  console.log("its empty")
  $('#recent-searches').append('<h3>Recent Searches will go here</h3>')
} else {
  console.log('Not empty')
  arrayForLocalStorage.push(retrievedFromLS)
  for(let i = 0; i < arrayForLocalStorage.length; i ++) {
    console.log(arrayForLocalStorage[i][0].name)
    $('#recent-searches').append(`${arrayForLocalStorage[i][0].name}`)
  }

}



// Initialize and add the map
// const initMap = function () {
//     // The location of Atlanta
//     const atlanta = { lat: 33.74, lng: -84.38 };
//     // The map, centered at Atlanta
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 10,
//         center: atlanta,
//     });
//     // The marker, positioned at Uluru
//     const marker = new google.maps.Marker({
//         position: atlanta,
//         map: map,
//     });
// }

// window.initMap = initMap;
let marker

const mapSearch = function(lat, long) {

  var map = L.map('map').setView([lat, long], 12);
  marker = L.marker([lat, long]).addTo(map);


  
  
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);
}
// mapSearch(33.74, -84.38)



// Application name	Concert Finder
// API key	c34e1d9396ec00f422f5ee6f423a0503
// Shared secret	596cec3680a048608375b6758853cd94
// Registered to	huntersteffner

let searchEntry = 'Imagine Dragons'
searchEntry = searchEntry.replaceAll(' ', '-')
console.log(searchEntry)

let fetchedObject
let testImg



fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchEntry}&api_key=c34e1d9396ec00f422f5ee6f423a0503&format=json`).then(function(res) {
  return res.json()
}).then(function(data) {
  console.log(data)
  testImg = `<img src="${data.results.artistmatches.artist[0]}" alt="">`
  console.log(testImg)
})













// This is to search by state

let state
// The logic below will dynamically add a list of all 50 states to the dropdown anywhere in the HTML as long as it has an ID of #state.
stateDropdownHTML = ''
const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
for(let i = 0; i < states.length; i ++) {
  stateDropdownHTML += `<option value="${states[i]}">${states[i]}</option>`
}
$('#state').append(stateDropdownHTML)





function getApi() {
  // The line of code below pulls what the current selected state is.
  state = document.getElementById('state').value
  console.log(state)
    // fetch request gets a list of objects for all ticketmaster music events
    var requestUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=mgQugAMUEqgKEogCWbyjp56vnUXbRbsr&locale=*&stateCode=${state}&segmentName=Music&size=200`;

   fetch(requestUrl).then(function(res) {
    return res.json()
   }).then(function(data) {
    console.log(data._embedded.events)
    let results = data._embedded.events
    for(let i = 0; i < results.length; i++) {
      
      // console.log(results[i].name)
      if(results[i].name.includes(bandNameSearch)) {
        console.log(results[i])
        $('#glass-container').remove()
        
       

        listOfResults += `<li id="${number}" class="list-group-item">${results[number].dates.start.localDate} - ${results[number]._embedded.venues[0].name}</li>`

      

        number ++
      arrayOfResults.push(results[i])



        
        // mapSearch(lat, long)
        // This logic controls the text that displays in the popup marker when searching for a concert.
        // marker.bindPopup(`<b>${results[i].name}</b><br>Venue: ${results[i]._embedded.venues[0].name}<br>Date: ${results[i].dates.start.localDate}<br>Time: ${results[i].dates.start.localTime}<br>Tickets starting at $${results[i].priceRanges[0].min}<br><a href="${results[i].url}" target="_blank">See Web Page</a>`).openPopup();

      }
    }
    console.log(arrayOfResults)
    console.log(listOfResults)
    $('#choices-list').append(listOfResults)

    $('#choices-list').children().on('click', function(e) {
      currentOption = $(this).each(function(e) {
        return $(this).attr('id')
      }).attr('id')
      console.log(currentOption)

      lat = arrayOfResults[currentOption]._embedded.venues[0].location.latitude
      long = arrayOfResults[currentOption]._embedded.venues[0].location.longitude
      console.log(lat, long)
      mapSearch(lat, long)
        // This logic controls the text that displays in the popup marker when searching for a concert.
        marker.bindPopup(`<b>${arrayOfResults[currentOption].name}</b><br>Venue: ${arrayOfResults[currentOption]._embedded.venues[0].name}<br>Date: ${arrayOfResults[currentOption].dates.start.localDate}<br>Time: ${arrayOfResults[currentOption].dates.start.localTime}<br><a href="${arrayOfResults[currentOption].url}" target="_blank">See Web Page</a>`).openPopup();
        $('#choices').remove()
        $('#newSerach').append('<button id="refresh-button" class="btn-primary rounded">Click for New Search</button>')
        $('#refresh-button').on('click', function() {
          location.reload()
        })

        arrayForLocalStorage.push(arrayOfResults[currentOption])
        console.log(arrayForLocalStorage)

        localStorage.setItem(`search`, JSON.stringify(arrayForLocalStorage))
    })
   })
}
    // fetch(requestUrl)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);
            // for (var i = 0; i < data._embedded.events.length; i++) {
            //     var eventInfo = data._embedded.events[i];
            //     for(var q = 0; q < eventInfo._embedded.attactions.length; q++){
            //     bands.push(eventInfo._embedded.attactions[q].name); //Add artist's name to bands array
                // }   
                // console.log(data._embedded.events[i]._embedded.venues[0].name); //Venue Name
                // console.log(data._embedded.events[i]._embedded.venues[0].address.line1);    //Street Address
                // console.log(data._embedded.events[i]._embedded.venues[0].city.name);        //City
                // console.log(data._embedded.events[i]._embedded.venues[0].state.stateCode);  //State Abbrev
                // console.log(data._embedded.events[i]._embedded.venues[0].postalCode);       //Zip Code
            // }
            // console.log(bands);
            // console.log(bandNameSearch);
            // for(var y=0; y<bands.length; y++){
            //     if(bandNameSearch == bands[y]){
            //         console.log(data._embedded.events[y]._embedded.venues[0].name); //Venue Name
            //     console.log(data._embedded.events[y]._embedded.venues[0].address.line1);    //Street Address
            //     console.log(data._embedded.events[y]._embedded.venues[0].city.name);        //City
            //     console.log(data._embedded.events[y]._embedded.venues[0].state.stateCode);  //State Abbrev
            //     console.log(data._embedded.events[y]._embedded.venues[0].postalCode);       //Zip Code
            //     }
            // }

        // });
// }

// getApi()
bandButtonEl.addEventListener('click', getApi);













// $.ajax({
//     type:"GET",
//     url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=mgQugAMUEqgKEogCWbyjp56vnUXbRbsr",
//     // async:true,
//     dataType: "json",

//     success: function(json) {
//                 console.log(json);
//                 // Parse the response.

//                 // Do other things.
//              },
//     error: function(xhr, status, err) {
//                 // This time, we do not end up here!
//              }
//   });

// var mainURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=mgQugAMUEqgKEogCWbyjp56vnUXbRbsr';

// fetch(mainURL)
//     .then(function(response){
//       var test = response.json();
//       console.log(test);
//     })
//     // .then(function(data){
//     //     for var 
//     // })
// https://app.ticketmaster.com/discovery/v2/events?apikey=mgQugAMUEqgKEogCWbyjp56vnUXbRbsr&postalCode=30080&radius=100&locale=*&startDateTime=2022-07-05T13:09:00Z&endDateTime=2022-07-31T13:09:00Z