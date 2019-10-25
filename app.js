const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./jawabdo-4a244-firebase-adminsdk-revog-315d7168bd');
admin.initializeApp({
      credential :  admin.credential.cert(serviceAccount),
      databaseURL : 'https://jawabdo-4a244.firebaseio.com'
    }
);

module.exports = admin;

let token;

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.set('views',__dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/',function (req,res) {

    res.render('index');

});

app.post('/remove', function(req, res) {
    token = null;
});

app.get('/courses', function (req,res) {
    if (token) {
        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                let uid = decodedToken.uid;
                const user = admin.database().ref('users/' + uid);
                user.on('value', function (snapshot) {
                    let Snapshot = snapshot;
                    res.render('courses', {user: snapshot.val(), Snapshot : snapshot});
                });
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    }
    else
        res.render('index');

});

app.post('/test', function (req,res) {
    token = req.body.authorization;
});

app.get('/createquiz',function (req, res) {
    if (token) {
        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                let uid = decodedToken.uid;
                const user = admin.database().ref('users/' + uid);
                user.on('value', function (snapshot) {
                    let Snapshot = snapshot;
                    res.render('quiz', {user: snapshot.val(), Snapshot : snapshot});
                });
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    }});


app.listen(3000);