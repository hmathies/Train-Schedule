 /*Heather Mathies built September 2017*/
 /*----when the page loads*/
  $(document).ready(function() {

//initialize Firebase
  var config = {
    apiKey: "AIzaSyDayqtJ-tTarim-e55T56edQWDn-omh0gs",
    authDomain: "train-app-7b721.firebaseapp.com",
    databaseURL: "https://train-app-7b721.firebaseio.com",
    projectId: "train-app-7b721",
    storageBucket: "",
    messagingSenderId: "45457176829"
  };
  firebase.initializeApp(config);
  //variable to reference the database
  var database = firebase.database();
  console.log("database says: " + database);




});
