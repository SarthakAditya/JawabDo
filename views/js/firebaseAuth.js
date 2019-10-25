const firebaseConfig = {
    apiKey: "AIzaSyB6NrdAlM49vtfqzvtUTtfApjI1Qf2-7aA",
    authDomain: "jawabdo-4a244.firebaseapp.com",
    databaseURL: "https://jawabdo-4a244.firebaseio.com",
    projectId: "jawabdo-4a244",
    storageBucket: "",
    messagingSenderId: "949766930175",
    appId: "1:949766930175:web:ee63812174cb0a5ded56ca"
};

firebase.initializeApp(firebaseConfig);

function userSignup() {
    var email = document.getElementById("uemail").value ;
    var pswd = document.getElementById("psw").value ;
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pswd) ;
    promise.catch(e => console.log(e.message)) ;
    checkIfloggedIn();
}

function userLogin(){
    var email = document.getElementById("uemail").value ;
    var pswd = document.getElementById("psw").value ;
    const promise = firebase.auth().signInWithEmailAndPassword(email , pswd) ;
    promise.catch(e => console.log(e.message)) ;
    checkIfloggedIn();
}

function userSignout(){
    firebase.auth().signOut() ;
    checkIfloggedIn();
}


function checkIfloggedIn() {

    firebase.auth().onAuthStateChanged(function(user) {
        //console.log(user);

        if (user) {
            console.log("Logged in");
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                console.log(idToken);
                axios.post('/test', {
                    authorization: idToken
                });

                var login_u = document.getElementById("uname");
                login_u.setAttribute('style', 'display : none ; visibility : hidden');

                var login_p = document.getElementById("psw");
                login_p.setAttribute('style', 'display : none ; visibility : hidden');

                var login_un = document.getElementById("uemail");
                login_un.setAttribute('style', 'display : none ; visibility : hidden');

                var login_pn = document.getElementById("pwd");
                login_pn.setAttribute('style', 'display : none ; visibility : hidden');

                var login = document.getElementById("login");
                login.setAttribute('style', 'display : none ; visibility : hidden');

                var sgnbtn = document.getElementById("signup");
                sgnbtn.setAttribute('style', 'display : none ; visibility : hidden');

                var gbtn = document.getElementById("signgoogle");
                gbtn.setAttribute('style', 'display : none ; visibility : hidden');

                var sgnout = document.getElementById("signout");
                sgnout.setAttribute('style', 'display : block ; visibility : visible');

                var courses = document.getElementById("gotoCourses");
                courses.setAttribute('style', 'display : block ; visibility : visible');

            }).catch(function(error) {
                console.log("error",error);

            });
        }

        else {
            axios.post('/remove');
            console.log('Not log in') ;

            var login_u = document.getElementById("uname");
            login_u.setAttribute('style', 'display : block ; visibility : visible');

            var login_p = document.getElementById("psw");
            login_p.setAttribute('style', 'display : block ; visibility : visible');

            var login_un = document.getElementById("uemail");
            login_un.setAttribute('style', 'display : block ; visibility : visible');

            var login_pn = document.getElementById("pwd");
            login_pn.setAttribute('style', 'display : block ; visibility : visible');

            var login = document.getElementById("login");
            login.setAttribute('style', 'display : block ; visibility : visible');

            var sgnbtn = document.getElementById("signup");
            sgnbtn.setAttribute('style', 'display : block ; visibility : visible');

            var gbtn = document.getElementById("signgoogle");
            gbtn.setAttribute('style', 'display : block ; visibility : visible');

            var sgnout = document.getElementById("signout");
            sgnout.setAttribute('style', 'display : none ; visibility : hidden');

            var courses = document.getElementById("gotoCourses");
            courses.setAttribute('style', 'display : none ; visibility : hidden');

        }

    })
    
}

window.onload = function () {


    checkIfloggedIn();
    
};

function signInWithGoogle() {

    const googleauthprovider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleauthprovider)
        .then(function (data) {
            console.log(data);
            checkIfloggedIn();
        })
        .catch(function (err) {
            console.log(err);

        })
    
}