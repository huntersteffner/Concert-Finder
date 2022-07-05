console.log("this is a test");
















































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

var mainURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=mgQugAMUEqgKEogCWbyjp56vnUXbRbsr';

fetch(mainURL)
    .then(function(response){
        return.response.json();
    })
    .then(function(data){
        for var 
    })