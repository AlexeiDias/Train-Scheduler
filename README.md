# Train-Scheduler

##### This app shows the arrival time of the next train by calculating the time entered by the user and the current time. It also shows the current time, next train time, and how many minutes away it is.
---
### Technologies used on the project
* HTML 5
* CSS 3
* JavaScript
* JQuery ( a JavaScript library)
* BootStrap ( a framework for website layout)
* Momentjs ( a time tool calculator)
---
##### A Screenshot of the app
![how it looks](assets/images/2.png)

-----

##### This piece of code shows the firebase configuration and its initialization.
```javascript
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAAAPRsS6JnfsWK-Fhz4ioHxP5zRNIvBfQ",
    authDomain: "alexei-930cb.firebaseapp.com",
    databaseURL: "https://alexei-930cb.firebaseio.com",
    projectId: "alexei-930cb",
    storageBucket: "",
    messagingSenderId: "856201311867",
    appId: "1:856201311867:web:0c4f145a7cf5526f6854de"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    
    var dataRef = firebase.database();

```
##### this code shows momentjs in action!

```javascript
 // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    var currentTime =("CURRENT TIME: " + moment(currentTime).format('MMMM Do YYYY, h:mm:ss a'));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % inputFrequency;
    // console.log("time remainder" + " " + tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = inputFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrain = (moment(nextTrain).format("hh:mm"));

```
---
> Author
 Alexei Dias
 Linkedin 
 https://www.linkedin.com/in/alexei-dias-b4054a164/

