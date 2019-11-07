
function userSignup() {
        var email = document.getElementById("uemail").value ;
        var pswd = document.getElementById("psw").value ;
        const promise = firebase.auth().createUserWithEmailAndPassword(email, pswd) ;
        promise.catch(e => console.log(e.message)) ;
        checkIfloggedIn();
}

function userLogin(){
        /*axios.post('/sendnotification', {
            authorization: "idToken"
        });*/
        var email = document.getElementById("uemail").value ;
        var pswd = document.getElementById("psw").value ;
        const promise = firebase.auth().signInWithEmailAndPassword(email , pswd) ;
        promise.catch(e => console.log(e.message)) ;
        checkIfloggedIn();
}


window.onload = function () {


        checkIfloggedIn();

};

function checkIfloggedIn() {

        firebase.auth().onAuthStateChanged(function(user) {
                let count = 0;
                //console.log(user);

                if (user) {
                        console.log("Logged in");
                        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                                console.log(idToken);
                                axios.post('/test', {
                                        authorization: idToken
                                });

                                if (user.emailVerified)
                                {
                                        addUser();

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
                                        console.log(user.displayName)
                                }
                                else {
                                        console.log("Verify Your Email");
                                        sendVerification();
                                        userSignout();
                                }

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

function signInWithGoogle() {

        const googleauthprovider = new firebase.auth.GoogleAuthProvider;
        firebase.auth().signInWithPopup(googleauthprovider)
            .then(function (data) {
                    checkIfloggedIn();
            })
            .catch(function (err) {
                    console.log(err);

            })

}

function addUser() {

        let database = firebase.database();
        database.ref('Users/' + firebase.auth().currentUser.uid).once('value',function (snapshot) {
                if (snapshot.val()==null)
                {
                        let userRef = database.ref('Users/' + firebase.auth().currentUser.uid);
                        let Name = "NULL";
                        if (firebase.auth().currentUser.displayName!=null)
                        {
                                Name = firebase.auth().currentUser.displayName;
                        }
                        userRef.update({
                                Faculty: "T",
                                Name: Name,
                                Roll_no: "Faculty"

                        });
                }
        });
}

function sendVerification() {

        let user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {
                window.alert("Verification Mail sent");
        }).catch(function(error) {
                window.alert("error : "+error);
        });

}
