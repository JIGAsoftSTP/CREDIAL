var config = {
    apiKey: "AIzaSyCwuLtiQsO5kC5Zl8l83KXratS8y8XfPAA",
    authDomain: "jigahg-credial.firebaseapp.com",
    databaseURL: "https://jigahg-credial.firebaseio.com",
    projectId: "jigahg-credial",
    storageBucket: "jigahg-credial.appspot.com",
    messagingSenderId: "52958733161"
};
firebase.initializeApp(config);


firebase.auth().signInWithEmailAndPassword("jigasoft.stp2015@gmail.com", "credial#jigahd*database").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

/*var userId = firebase.auth().currentUser.uid;
var dda = firebase.database().ref('/users/' + userId).then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
});*/


/*var storage = firebase.storage();
var pathReference = storage.ref('bolsa.zip');

pathReference.getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
    console.log( url );
    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
        var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element:
//   var img = document.getElementById('myimg');
//   img.src = url;
}).catch(function(error) {
    // Handle any errors
});*/
