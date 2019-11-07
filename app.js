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

const messaging = admin.messaging;

const topic = 'XYZ';

module.exports = admin;

let token;

let courses;


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

app.get('/courses',async function (req,res) {

    admin.database().ref('Courses/').on('value',function (snapshot) {
        courses = snapshot.val();
    });

    if (token) {
        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                let regcourses = [];
                let uid = decodedToken.uid;
                const user = admin.database().ref('Users/' + uid);
                user.on('value', function (snapshot) {
                    let usercrs = snapshot.child('Courses');
                    if (usercrs.val())
                    {
                        let keys = Object.keys(usercrs.val());
                        keys.forEach(function(key){
                            regcourses.push(courses[key]);
                        });
                    }
                    res.render('courses', {courses: regcourses, Snapshot : usercrs});
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

app.get('/createquiz/:id',function (req, res) {
    let key = req.params.id;
    let course;
    if (token) {
        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                let uid = decodedToken.uid;
                const user = admin.database().ref('Users/' + uid);
                user.on('value', function (snapshot) {
                    course = courses[key];
                    res.render('quiz', {user: snapshot.val(), course : course});
                });
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    }});


app.get('/addcourse',function (req,res) {
    if (token) {
        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                let uid = decodedToken.uid;
                const user = admin.database().ref('Users/' + uid);
                user.on('value', function (snapshot) {
                    res.render('addcourse');
                });
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    }
});


app.listen(3000);