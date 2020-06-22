# Oregon Mutual Quick Quote Changes

##### This repository holds the code I built for changes that Oregon Mutual had IBQ make to our QuickQuote platform. Essentially they not only wanted us to have the ability to add Drivers, but also non Driving Household Memebers. Therefore, I set up a new route on the back end that would serve the fields for the Non Driving Household Member. 

##### The front end makes GET's to either the Driver or the Household Member route and appends that to the corresponding Form. I am making use of the fields handling that is also on my GitHub to actually append the data received from the BackEnd. Then I am then keeping a list of Drivers and Household members that is displayed once the user has entered one. If a user has selected to add a household member, I am indicating that is the form they are on by changing the background color of the selected button, for instance:

![image](https://user-images.githubusercontent.com/40578449/85238487-19cc7800-b3e3-11ea-80db-6fb1204ca8b3.PNG)

##### If the user has selected a driver, then the form will look as such:

![image](https://user-images.githubusercontent.com/40578449/85238546-8778a400-b3e3-11ea-9b84-4c2c91dd911a.PNG)

##### This project is built using JavaScript, jQuery, Ajax, Node.js, Express, and MongoDB. 
