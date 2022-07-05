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









































