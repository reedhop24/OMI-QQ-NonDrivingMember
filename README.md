# Oregon Mutual Quick Quote Changes

##### This repository holds the code I built for changes that Oregon Mutual had IBQ make to our QuickQuote platform. Essentially they not only wanted us to have the ability to add Drivers, but also non Driving Household Memebers. Therefore, I set up a new route on the back end that would serve the fields for the Non Driving Household Member. 

##### The front end makes GET's to either the Driver or the Household Member route and appends that to the corresponding Form. I am making use of the fields handling that is also on my GitHub to actually append the data received from the BackEnd. Then I am then keeping a list of Drivers and Household members that is displayed once the user has entered one. Once a user has added all of the Drivers / Household members the platform will be displayed as such:

##### This project is built using JavaScript, jQuery, Ajax, Node.js, Express, and MongoDB. 