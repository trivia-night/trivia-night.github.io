function saveToFirebase(name, answers) {
    var nameObject = {
        name: name,
        answers: answers
    };

    firebase.database().ref('answer-entries').push().set(nameObject)
        .then(function(snapshot) {
            success(); // some success method
        }, function(error) {
            console.log('error' + error);
            error(); // some error method
        });
}


saveToFirebase(name);