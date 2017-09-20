/*Heather Mathies built September 2017*/
    
/*---------------Initialize Firebase--------------------*/
 var config = {
     apiKey: "AIzaSyDayqtJ-tTarim-e55T56edQWDn-omh0gs",
     authDomain: "train-app-7b721.firebaseapp.com",
     databaseURL: "https://train-app-7b721.firebaseio.com",
     projectId: "train-app-7b721",
     storageBucket: "train-app-7b721.appspot.com",
     messagingSenderId: "45457176829"
 };
 firebase.initializeApp(config);
 //variable to reference the database
 var database = firebase.database();
 
 /*-------this is where the user added train is added to firebase---------*/
 $('#submit-train').on('click', function(event) {
     event.preventDefault();

     database.ref().push({
        
         name: $('#train-name').val().trim(),
         destination: $('#destination').val().trim(),
         firstTime: moment($('#first-time').val().trim(), 'HH:mm').unix(),
         frequency: $('#frequency').val().trim(),
         dateAdded: firebase.database.ServerValue.TIMESTAMP
     });

     $('.addTrainForm input').val('');


 });

 /*--------this calculates the next arrival and minutes away by order of when entered
           then displays it to the page---------------------------------------------*/
 database.ref().orderByChild("dateAdded").on('child_added', function(snapshot) {

     var sv = snapshot.val();
     var currentTime = moment();
     
     var thisFreq = sv.frequency;
     var firstTimeConverted = moment(sv.firstTime, 'X');

     var diffTime = currentTime.diff((firstTimeConverted), "minutes");
     var trainRemainder = diffTime % thisFreq;

     var minutesAway = thisFreq - trainRemainder;
     var nextArrival = currentTime.add(minutesAway, 'minutes').format('HH:mm');


     $(".train-list tbody").append('<tr><td>' + sv.name +
         '</td><td>' + sv.destination +
         '</td><td>' + sv.frequency +
         '</td><td>' + nextArrival +
         '</td><td>' + minutesAway +
         '</td></tr>');

/*-----------------Handle the errors------------------*/
 }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
 });