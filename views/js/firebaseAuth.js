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


function userSignout(){
    firebase.auth().signOut() ;
    checkIfloggedIn();
}
