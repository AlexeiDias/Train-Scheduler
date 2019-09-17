$(document).ready(function () {

    // Static

    // The first basic method of Moment.js is the moment() method. Use this to get today's info!
    console.log(moment());

    console.log(moment().format());

    // Using moment format, there are different ways that we can display todays date!
    $("#date").text(moment());
    $("#date-formatted").text(moment().format());
    $("#date-my").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

    $("#day-week").text(moment().format('do'));
    $("#day-month").text(moment().format('Do'));
    $("#day-year").text(moment().format('DDDo'))

    // Current Time
    // Here we want to use setInterval to constantly update the time
    let updateTime = function () {
        let currentTime = moment().format('h:mm:ss')
        $("#time").text(currentTime)
    }

    // Here we will get the number of hours in the year
    let updateHour = function () {
        let date = moment().dayOfYear()
        let yearHours = date * 24
        let todayHours = moment().hour();
        let sumHours = yearHours + todayHours
        $("#hours").text(sumHours)
    }

    // Here we will get the number of minutes in the week
    let updateMinutes = function () {
        let date = moment().weekday();
        let weekMinutes = (date * 24 * 60) + (moment().minute());
        $("#minutes").text(weekMinutes);
    }

    // Here we will get the number of seconds in the day
    let updateSeconds = function () {
        let todayHours = moment().hour();
        let todaySeconds = todayHours * 60 * 60;
        let thisSecond = moment().second();
        let sumSeconds = thisSecond + todaySeconds;
        $("#seconds").text(sumSeconds);
    }

    let countdown = function () {

        // Friday
        let friday = moment().day("fr")._d

        // convert this into day of the year
        let fridayDate = moment(friday).dayOfYear();

        // This will get the milliseconds of Friday
        let fridayMils = fridayDate * 24 * 60 * 60 * 1000
        // Turn into seconds

        // Today
        // Turn into milliseconds

        let date = moment().dayOfYear()
        let yearMils = date * 24 * 60 * 60 * 1000
        let todayMils = moment().hour() * 60 * 60 * 1000;
        let thisMilsSecond = moment().second() * 1000;
        let thisMils = moment().millisecond();

        // This value should be increasing over time
        let sumMils = yearMils + todayMils + thisMilsSecond + thisMils;

        let ms = fridayMils - sumMils;
        $("#countdown").text(ms)
    }

    // To initally set the times, we will call the functions
    updateTime();
    updateHour();
    updateMinutes();
    updateSeconds();
    countdown();

    // To continuously call the functions, we will use setInterval
    setInterval(updateTime, 1000);
    setInterval(updateHour, 1000);
    setInterval(updateMinutes, 1000);
    setInterval(updateSeconds, 1000);
    setInterval(countdown, 1);

})


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
    
          // Initial Values
          $("#input-train").val(" ");
          $("#input-destination").val(" ");
          $("#train-time").val(" ");
          $("#input-frequency").val(" ");
    
        
    
    
    
        //declare variables that will hold the imput of each rext field
        $("#submit").on("click", function (event) {
          event.preventDefault();
          var inputTrain = $("#input-train").val();
          console.log(inputTrain)
          var inputDestination = $("#input-destination").val();
          console.log(inputDestination)
          var firstTrain = $("#train-time").val();
          console.log(firstTrain)
          var inputFrequency = $("#input-frequency").val();
          console.log(inputFrequency)
    
    // Code for the push
     dataRef.ref().push({
          inputTrain: inputTrain,
          inputDestination: inputDestination,
          firstTrain: firstTrain,
          inputFrequency: inputFrequency,
          // firstTimeConverted: firstTimeConverted,
          
          
          });
    
        });
    
        // Firebase watcher + initial loader HINT: .on("value")
        dataRef.ref().on("child_added", function(snapshot) {
          // Log everything that's coming out of snapshot
          console.log(snapshot.val());
          console.log(snapshot.val().inputTrain);
          console.log(snapshot.val().inputDestination);
          console.log(snapshot.val().firstTrain);
          console.log(snapshot.val().inputFrequency);
    
          var inputDestination = snapshot.val().inputDestination
          var inputTrain = snapshot.val().inputTrain
          var firstTrain = snapshot.val().firstTrain
          var inputFrequency = snapshot.val().inputFrequency
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
        
         // Create the new row
      var newRow = $("<tr>").append(
        $("<td>").text(inputTrain),
        $("<td>").text(inputDestination),
        $("<td>").text(inputFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
        
      );
      // var m = moment();
      // Append the new row to the table
      $("#employee-table > tbody").append(newRow);
      $("#current-time").html("<h2>" + " " + currentTime + " " + "</h2>");
      });