console.log("this is a test");






// Initialize and add the map
const initMap = function () {
    // The location of Atlanta
    const atlanta = { lat: 33.74, lng: -84.38 };
    // The map, centered at Atlanta
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: atlanta,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: atlanta,
      map: map,
    });
  }
  
  window.initMap = initMap;









































// $.ajax({
//     type:"GET",
//     url:"https://app.ticketmaster.com/discovery/v2/events?apikey=mgQugAMUEqgKEogCWbyjp56vnUXbRbsr&postalCode=30080&radius=100&locale=*&startDateTime=2022-07-05T13:09:00Z&endDateTime=2022-07-31T13:09:00Z",
//     async:true,
//     dataType: "json",
//     success: function(json) {
//                 // console.log(json);
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
//         return.response.json();
//     })
//     .then(function(data){
//         for var 
//     })