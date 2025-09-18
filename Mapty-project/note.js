//user stories combined together describe the functionality or exact features then build flowchart, then architecture(how w organize our code and what js feature we use)
//user story - Description of the applications functionality from the users perspective
// common format : As a [type of user], I want [an action] so that [a benefit]

//1. As a user , i want to log my running workouts with location, distance, time, pace and steps/minute, so i can keep a log of all my running
//2. as a user i want to log my cycling workouts with location, distamce, time,speed and elevation gain so i can keep a log of all my cycling
//3. as a user i want to see all my workouts at a glance so ican easilty track my progress over time
// 4. as a user i want to also see my workouts on map, so ican easily check where i work out the most
//5. As a user i want to see all my workouts whn i leave the app and comeback later, so i can keep using the app over time


// FEATURES
//1. map where user clicks to add new workout(best way to get location coordinates)
//geolocation to display map at current location
//form to input distance,time,pace , steps/minute

//2. form to input distance,time,speed, elevation gain

//3. display all workout in a list

//4. display all workouts in a map

//5.  store workout data in the browser using local stoarage API
//on page load, read the saved data from local storage and display

//6. move map to workout location on click

//geolocation api is a browser api like internationalization
//there are other browser api to access user's camera , to make users phone vibrate etc

//in js navigator object gives information about the browser and the device running your webpage

const firstName = 'pratyush Unnithan'


//any variable which is global in one script will available to other scripts (only if the global variable is in scriptthat is the before the script which access this global variable (scripts are in the html)

//using _ is convention used to denote private, unused, helper values

//important aspect of creating architecture is to know where and how we store data

// organizing data with classes
//common data are stored in parent class while data parameter which different or sepcific are stored in child clases

//thats why inheritance exist so we can have more specific classes with common properties from parent class(ie common to all child classes)
//while using eventlisteners inside class we have to bind the this keyword because the this keyword of callback function inside the the eventlistener will point to the html element

//imp note the this keyword in callback function of eventListener will point to the object to which eventlistener is attached