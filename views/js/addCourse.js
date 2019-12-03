window.onload = function() {
    firebase.auth().onAuthStateChanged(function(user) {

        firebase.database().ref('Users/' + user.uid).once('value').then(function (snapshot) {
            userval = snapshot.val();
            console.log(userval.Name);
            if (userval.Name=="NULL")
            {
                let INAME = document.getElementById("instructorname");
                INAME.setAttribute('style', 'display : block ; visibility : visible');
            }
        })
    });

};

function createCourse() {

    let courses;
    let name = document.getElementById("coursename").value;
    let instname = document.getElementById("instructorname").value;
    let cuid = document.getElementById("courseid").value;

    let delayInMilliseconds = 3000; //6 second

    let database = firebase.database();
    let courseAdd = 'Courses/';
    let currentUserID = firebase.auth().currentUser.uid;

    if (instname)
    {
        firebase.database().ref('Users/' + currentUserID).update({
            Name : instname
        })
    }

    else {
        firebase.database().ref('Users/' + currentUserID).once('value').then(function (snapshot) {
            instname = snapshot.val().Name
        })
    }

    let userRef = 'Users/'+currentUserID+'/Courses';
    let flag = true;

    firebase.database().ref('Courses/').once('value').then(function(snapshot) {
        courses = snapshot.val();
        useruid = firebase.auth().currentUser.uid;
        let keys = Object.keys(courses);
        keys.forEach(function (key)
        {
            if (key===cuid)
                flag = false;
        });

        if (flag===true)
        {
            firebase.database().ref(courseAdd).update({
                [cuid] : cuid
            });

            firebase.database().ref(userRef).update({
                [cuid] : cuid
            });

            let coursesRef = database.ref('Courses/'+cuid);

            firebase.database().ref(coursesRef).update({
                Instructor : instname, Name : name, Instructor_UID : useruid
            });

            setTimeout(function() {
                window.location.assign('/courses')
            }, delayInMilliseconds);

            console.log("Course Created");
        }
        else
        {
            console.log("Course Already Exists");
        }

    });
/*
*/

}