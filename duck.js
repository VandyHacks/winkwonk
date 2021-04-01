  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC4veoSNW5rSrRLlg1mbaB9aTjoVyKp-dY",
    authDomain: "winkwonk-d0ead.firebaseapp.com",
    projectId: "winkwonk-d0ead",
    storageBucket: "winkwonk-d0ead.appspot.com",
    messagingSenderId: "735745231329",
    appId: "1:735745231329:web:f118fb150cab6677afeaa0",
    measurementId: "G-K53FQ7EBEV",
    databaseURL: "https://winkwonk-d0ead-default-rtdb.firebaseio.com/",

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();



  var database = firebase.database();

  $(document).ready(function(){
    $("#submitEmail").click(function(){
      var email = $("#email").val();
      firebase.database().ref('emails/' + email).set(email);
      alert("Submitted email!")
    });
    $("#submitPhone").click(function(){
        var phone = $("#phone").val();
        firebase.database().ref('phones/' + phone).set(phone);
        alert("Submitted phone!")
      });
  });
  