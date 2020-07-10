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
    user = null;

    auth.getRedirectResult().then(function (result) {
        if (!auth.currentUser) {
            // User not logged in, start login.
            auth.signInWithRedirect(provider);
        } else {
            user = auth.currentUser;
        }
    }).catch(function (error) {
      console.log(error)
    });
})();

function submitAnswers() {
    var form1 = document.getElementById("inputTeamName");
    var form2 = document.getElementById("inputAnswers");
    firebase.database().ref('responses').push().set({
        name: form1.value,
        answers: form2.value,
        email: auth.currentUser.email
    });
    form1.value = '';
    form2.value = '';
}

function suggestCategory() {
    var suggestion = document.getElementById("inputSuggestion").value;
    firebase.database().ref('suggestions/' + user.uid + '/info').set({
        name: user.displayName,
        suggestion: suggestion,
        email: user.email
    });
    firebase.database().ref('suggestions/' + user.uid + '/list').push().set({
        suggestion: suggestion
    });
    suggestion.value = '';
}

function voteCategory() {
    var choices = document.getElementsByName("category");
    var vote;
    for(i = 0; i < choices.length; i++) { 
        if(choices[i].checked) 
            vote = choices[i].value;
            choices[i].checked = false;
    }
    console.log(auth.currentUser.email);
    firebase.database().ref('votes/' + user.uid).set({
        name: user.displayName,
        vote: vote,
        email: auth.currentUser.email
    });
}