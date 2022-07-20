# Concert Finder

## Contributors:

* **Alex Wilkinson**
* **Hunter Steffner**
* **Matthew Lyjak**
* **Joseph Gossett**

## Abstract:

Website that Allows user to find concerts based on State and Band Name

## Project Brief:

This site includes a navbar in the top right (currently unused).  A google search next to it the pops out a window for general information related to music.  There is a Jumbottron that contains a text search bar for Artist Names and a dropdown of States along with a Search button.  Once the search button is clicked A button will display to show a map of the venue.  If not results are found a message will be displayed and a new search button will appear.  Any past searchers are stored in local storage and the map can be pulled back up by clicking one of the opitions in the recent searches section.

## Technologies used:

* HTML 5
* CSS
* Javascript
* Bootstrap
* GitHub
* APIs:
    * Google Search
    * Google Maps
    * Leaflet
    * Ticketmaster
* Various Hardware including multiple different screen sizes and mobile devices

## Project Links:

https://github.com/MLyjak1/G-10_Musical_Chairs

https://mlyjak1.github.io/G-10_Musical_Chairs/#gsc.tab=0


![](Presentation/G-10%20Screenshot%20Map.png)

![](Presentation/G-10%20Screenshot%20Main.png)


## Instructions for Future Developers:

    The top Navbar is in place for future "browsing options as opposed to the driect search currently implemented.  There can be containers for future planned Music Player Widgets and Info Panes that can be place on either side of the carousel 

## Known Bugs:

    No way to search for second concert unless page is refreshed
    Searches are Case Sensitive currently


## License Information:

    Thanks to Google, JQuery, Bootstrap, Leaflet, and Ticketmaster for use of their APIs


## Version Information:

**0.0 - Initial Commit of Original Source Code - 7/4/22**

    * Added index.html
    * Added style.css
    * Added script.js
    * Added README.md template
    * Added links to style.css and script.js and tested to ensure they were properly linked

**0.01 - Initial testing of basic functions and webpage setup**
    
    * Added JQuery call to HTML
    * Added Google maps call to HTML
    * Set up general layout
    * Displayed local map on page
    * Designed General Wireframe of Website

**0.02 - Added Beginning code for accessing ticketmaster events**
    
    * Changed first button to id= band-button
    * Assigned band-button to var bandButtonEl in JS
    * Fetch'd Ticketmaster events and found event name in object respons
    * Displayed 1 event name to console as test 

**0.03 - Main page Styling and Javascript Object Path Pulling**
    
    * Added Jumbotron
    * Added Navbar
    * Added Search Button to trigger function
    * Added General Google Search
    * Updated README

**0.04 - Styling and Javascript Logic**
    
    * Added Glass Pane to Jumbotron with main search bars
    * Used ticketmaster API pathing to pull pertinent artist and venue information needed and displayed to console.
    * Tested using static band names and States. - PASSED
    * Added Artist search bar, and State search bar

**0.05 - Enhancing Look and Feel of Page**
    
    * Changed Jumbotron to moving Gif
    * Tested Map function would pop out and display static venue location - PASSED
    * Added State Dropdown to Navbar
    * Changed Google Search bar to focus on music-oirented pages
    * Changed styling for mouse cursor to fit music theme.

**0.06 - Full MVP implementation**
    
    * Moved State Dropdown into Jumbotron
    * Pulled value from Artist Search Toolbar into JS variable bandNameSearch
    * Moved State Dropdown to Glass Pane in Dropdown
    * Assigned state selected to variable in JS
    * Added Link to Jumbotrons to take users to relevant sites

**0.07 - Bug Fixes**
    
    * Moved buttons around to clean up site flow.
    * Added Local storage for past searches
    * Added Reset Search to Reset Map
    * Moved Map Search Button above Jumbotron
    * Ran Tests for full functionality
    * Added 'No Results Found' Function 
    
**0.08 - Final Touches**
    
    * Recent Searches will pull back up previous info
    * Removed commented out code
    * Finished README

**0.09 - Beta Testing**

    * PASSED
