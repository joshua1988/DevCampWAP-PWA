document.getElementById('loginG').addEventListener("click", loginWithGoogle);


var provider = new firebase.auth.GoogleAuthProvider();


function loginWithGoogle() {
  return firebase.auth().signInWithPopup(provider).then(function(result) {
   // This gives you a Google Access Token. You can use it to access the Google API.
   var token = result.credential.accessToken;
   // The signed-in user info.
   var user = result.user;

   console.log(result);
   location.href="main.html";
  }).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // The email of the user's account used.
   var email = error.email;
   // The firebase.auth.AuthCredential type that was used.
   var credential = error.credential;

   console.log(error);
   // ...
  });
}




// // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// // The Firebase SDK is initialized and available here!
//
// firebase.auth().onAuthStateChanged(user => { });
// firebase.database().ref('/path/to/ref').on('data', snapshot => { });
// firebase.messaging().requestPermission().then(() => { });
// firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
//
// // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
