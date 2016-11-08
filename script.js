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
    "DOM Manipulation": 0,
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
    "events": 0,
  };

  var db = firebase.database();
  var con = db.ref('concepts');

  var wordCloud = function() {
    var r = [];
    for (var word in data) {
      r.push({
        text: word,
        weight: data[word] + 1,
        html: {
          class: "a_word"
        }
      });
    }

    return r;
  }

  var update = function(snapshot) {
    $.extend(data, snapshot.val());
    $('#words').jQCloud('update', wordCloud());
  };

  var send = function(concept) {
    if (data[concept] == undefined) data[concept] = 0;
    con.child(concept).set(data[concept] + 1);
  }

  var get_and_send = function(evt) {
    var value = $(this).text();
    send(value);
  }

  $('#words').jQCloud(wordCloud());
  con.on('value', update);

  $('#words').on('click', '.a_word', get_and_send);
  $('#new').on('submit', function(evt) {
    var value = $(this).find('input').val();
    send(value);

    return false;
  })

})();
