(function() {
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAgnjaeng_1v3Btvbaecxwuy_e5_P9wiOI",
    authDomain: "jsreview-c8f89.firebaseapp.com",
    databaseURL: "https://jsreview-c8f89.firebaseio.com",
    storageBucket: "jsreview-c8f89.appspot.com",
    messagingSenderId: "803592547685"
  };
  firebase.initializeApp(config);

  var data = {
    "DOM Maniuplation": 0,
    "jQuery": 0,
    "scope": 0,
    "console log": 0,
    "if-then": 0,
    "truthiness": 0,
    "alerts, prompts, confirms": 0,
    "arrays": 0,
    "objects": 0,
    "pseudocode": 0,
    "functions": 0,
    "random numbers": 0,
  };

  var db = firebase.database();
  var con = db.ref('concepts');

  var update = function(snapshot) {
    $.extend(data, $snapshot.val());
    console.log(data);
    window.data = data;
  };

  var send = function(concept) {
    if (data[concept] == undefined) data[concept] = 0;
    con.child(concept).set(data[concept] + 1);
  }

  window.send = send;

})();
