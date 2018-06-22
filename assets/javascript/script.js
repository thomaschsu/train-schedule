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
  var empStart = moment($("#first-train").val().trim(), "hh:mm a").format("X");
  var freqrate = $("#frequency-input").val().trim();

  var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: empStart,
      rate: freqrate
  };

  database.ref().push(newTrain);

  $("#train-input").val("");
  $("#destination-input").val("");
  $("#first-train").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var empStart = childSnapshot.val().start;
  var freqrate = childSnapshot.val().rate;

  var empStartPretty = moment.unix(empStart).format("hh:mm a");

  var empMonths = moment().diff(moment(empStart, "X"), "months");

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + freqrate + "</td><td>" +
      empStartPretty + "</td><td>" + empMonths + "</td><td>");
});