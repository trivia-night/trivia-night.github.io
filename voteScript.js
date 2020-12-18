auth.onAuthStateChanged(function(user) {
    loadVotePage();
});

function loadVotePage() {
    var ref = firebase.database().ref('votes/' + user.uid);
    ref.once("value")
        .then(function(snapshot) {
            if(snapshot.exists()) {
                reveal(document.getElementById("votedText"));
            }
        });
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

    reveal(document.getElementById("votedText"));
}