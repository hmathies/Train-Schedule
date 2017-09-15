/*Heather Mathies built September 2017*/
$(document).ready(function() {
    //variable to hold the train data in firebase
    var trains = [];
    var database = null;

    function firebaseConnection() {
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

    }

    firebaseConnection();

    function storeInDatabase() {
        var jsonObject = JSON.stringify(trains);
        var database = firebase.database();
        firebase.database().ref('train').set({
            trains: jsonObject
        });
    }

    function retrieveFromDatabase() {
        var getTrains = firebase.database().ref('train/trains');
        getTrains.on('value', function(snapshot) {
            retrievedTrains = snapshot.val();
            console.log(retrievedTrains);
            if (retrievedTrains != null && retrievedTrains != undefined) {
                trains = JSON.parse(retrievedTrains);
                listTrains();
            }
        });
    }


    function initFormListener() {
        $('#submit-train').on('click', function() {
            event.preventDefault();
            name = $('#train-name').val().trim();
            destination = $('#destination').val().trim();
            firstTime = $('#first-time').val().trim();
            frequency = $('#frequency').val().trim();
            var train = {
                name: name,
                destination: destination,
                firstTime: firstTime,
                frequency: frequency
            }
            trains.push(train);
            listTrains();
            storeInDatabase();
        });
    }

    function calculateNextArrival(firstTime, frequency) {
        var testTime = moment(firstTime, "HH:mm").format("HH:mm");
        var currentTime = moment().format("HH:mm");
        var nextArrival = '';
        for (var i = 0; i < 1440; i++) {
            var testTime = moment(testTime, "HH:mm").add(frequency, 'minutes').format("HH:mm"); // 02:30
            if (testTime > currentTime) {
                nextArrival = testTime;
                break;
            }
        }

        return nextArrival;
    }

    function calculateMinutesAway(nextArrival) {
        return moment(nextArrival, "HH:mm").fromNow();

    }

    function listTrains() {
        var trainListTable = $('.train-list');
        $(row).html('');
        for (var i = 0; i < trains.length; i++) {
            var train = trains[i];
            nextArrival = calculateNextArrival(train.firstTime, train.frequency);
            minutesAway = calculateMinutesAway(nextArrival);
            var row = '<tr><td>' + train.name + '</td><td>' + train.destination + '</td><td>' + train.frequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>';
            trainListTable.append(row);
        }
    }

    retrieveFromDatabase();
    initFormListener();

});
