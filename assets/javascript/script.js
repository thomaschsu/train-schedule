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

// Submit button on click, grabs all values from form
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#first-train").val().trim(), "hh:mm a").format("X");
  var freqrate = $("#frequency-input").val().trim();
  // Adds data to firebase
  var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      rate: freqrate
  };

  database.ref().push(newTrain);
  // Clears the input
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#first-train").val("");
  $("#frequency-input").val("");
});

// Creates snapshot of child
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var freqrate = childSnapshot.val().rate;
  var trainstartFormat = moment.unix(trainStart).format("hh:mm a");
  var minsAway = moment().diff(moment(trainStart, "X"), "minutes");
  // Adds information to table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + freqrate + "</td><td>" +
      trainstartFormat + "</td><td>" + minsAway + "</td><td>");
});