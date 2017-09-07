 /*Heather Mathies built September 2017*/

 function firebaseConnection(){
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
    /*-----------variable to reference a specific location in the database/firebase. All of the train data will be stored here. 
    not sure if i need to add a separate folder because its always going to be train data and nothing else-------------------*/
    //var trainref = database.ref();
    /*-------this pushes the train data to firebase- but I'm not sure it's working---*/
    //trainref.push(trains);
 }

 function initFormListener(){
    $('#submit-train').on('click', function() {
       event.preventDefault();
       name = $('#train-name').val().trim();
       destination = $('#destination').val().trim();
       firstTime = $('#first-time').val().trim();
       frequency = $('#frequency').val().trim();
       var train = {
          name : name,
          destination: destination,
          firstTime: firstTime,
          frequency: frequency
        }
       trains.push(train);
       listTrains();
   });
 }

 function calculateNextArrival(firstTime,frequency){

 }

 function listTrains() {
    var trainListTable = $('.train-list');
       for(var i =0; i<trains.length; i++){
          var train = trains[i];
          nextArrival = calculateNextArrival(train.firstTime,train.frequency);
          minutesAway = '';
          var row = '<tr><td>'+train.name+'</td><td>'+train.destination+'</td><td>'+train.frequency+'</td><td>'+nextArrival+'</td><td>'+minutesAway+'</td></tr>';
          trainListTable.append(row);
       }
  }

var trains = [];


 $(document).ready(function() {
    firebaseConnection();
    initFormListener();
    listTrains();
    sandbox();

    function sandbox(){
      var res =moment('10:22').fromNow();
      console.log(res);
    }
 });
