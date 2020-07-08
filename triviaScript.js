(function() {
    const firebaseConfig = {
        apiKey: "AIzaSyCRd83FqIhvG2LNKc0IKxRYpxGJccFmrBs",
        authDomain: "trivia-night-8d0f7.firebaseapp.com",
        databaseURL: "https://trivia-night-8d0f7.firebaseio.com",
        projectId: "trivia-night-8d0f7",
        storageBucket: "trivia-night-8d0f7.appspot.com",
        messagingSenderId: "707876449830",
        appId: "1:707876449830:web:f22796e494709beb34c0e7",
        measurementId: "G-3LGEG2R9XV"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    auth = firebase.auth();
    provider = new firebase.auth.GoogleAuthProvider();

    console.log("Here");

    auth.getRedirectResult().then(function (result) {
        if (!currentUser) {
            // User not logged in, start login.
            auth.signInWithRedirect(provider);
        } else {
        
        }
    }).catch(function (error) {
      console.log(error)
    });
})();

function submitAnswers() {
    var form1 = document.getElementById("inputName");
    var form2 = document.getElementById("inputAnswers");
    firebase.database().ref('responses').push().set({
        name: form1.value,
        answers: form2.value,
        email: userEmail
    });
    form1.value = '';
    form2.value = '';
}

function suggestCategory() {
    var form1 = document.getElementById("inputName");
    var form2 = document.getElementById("inputSuggestion");
    firebase.database().ref('suggestions').push().set({
        name: form1.value,
        suggestion: form2.value,
        email: userEmail
    });
    form1.value = '';
    form2.value = '';
}

function voteCategory() {
    var name = document.getElementById("inputName").value;
    var choices = document.getElementsByName("category");
    var vote;
    for(i = 0; i < choices.length; i++) { 
        if(choices[i].checked) 
            vote = choices[i].value;
            choices[i].checked = false;
    }
    firebase.database().ref('votes').push().set({
        name: name,
        vote: vote,
        email: userEmail
    });
}