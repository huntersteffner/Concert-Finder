var bandButtonEl = document.getElementById("band-button");
var bandNameSearch = 'Imagine Dragons';
var bands = [];




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

var map = L.map('map').setView([33.74, -84.38], 12);
var marker = L.marker([33.74, -84.38]).addTo(map);
marker.bindPopup("<b>This marker can point to concert locations</b><br>It could also have other relavent information, such as date, indoor/outdoor, weather, etc.").openPopup();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);























function getApi() {
    // fetch request gets a list of objects for all ticketmaster music events
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events?apikey=mgQugAMUEqgKEogCWbyjp56vnUXbRbsr&locale=*&stateCode=GA&segmentName=Music&size=200';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            for (var i = 0; i < data._embedded.events.length; i++) {
                var eventInfo = data._embedded.events[i];
                for(var q = 0; q < eventInfo._embedded.attactions.length; q++){
                bands.push(eventInfo._embedded.attactions[q].name); //Add artist's name to bands array
                }   
                // console.log(data._embedded.events[i]._embedded.venues[0].name); //Venue Name
                // console.log(data._embedded.events[i]._embedded.venues[0].address.line1);    //Street Address
                // console.log(data._embedded.events[i]._embedded.venues[0].city.name);        //City
                // console.log(data._embedded.events[i]._embedded.venues[0].state.stateCode);  //State Abbrev
                // console.log(data._embedded.events[i]._embedded.venues[0].postalCode);       //Zip Code
            }
            console.log(bands);
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
        });
}

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