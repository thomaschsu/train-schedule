// Initialize Firebase
var config = {
  apiKey: "AIzaSyAi69ZnA17ar8nxAEmReUKZ-QBDbCpPMCU",
  authDomain: "train-homework-94ae0.firebaseapp.com",
  databaseURL: "https://train-homework-94ae0.firebaseio.com",
  projectId: "train-homework-94ae0",
  storageBucket: "",
  messagingSenderId: "850284792926"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var empStart = moment($("#first-train").val().trim(), "DD/MM/YY").format("X");
  var freqrate = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: empStart,
    rate: freqrate
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#first-train").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var empStart = childSnapshot.val().start;
  var freqrate = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(empStart);
  console.log(freqrate);

  // Prettify the employee start
  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(empStart, "X"), "months");
  console.log(empMonths);


  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + freqrate + "</td><td>" +
  empStartPretty + "</td><td>" + empMonths + "</td><td>");
});