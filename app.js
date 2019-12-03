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
                let sList =[];
                let Students = [];
                let uid = decodedToken.uid;
                const user = admin.database().ref('Users/' + uid);
                user.on('value', function (snapshot) {
                    let usercrs = snapshot.child('Courses');
                    if (usercrs.val())
                    {
                        let keys = Object.keys(usercrs.val());
                        keys.forEach(function(key){
                            regcourses.push(courses[key]);
                            sList.push(courses[key].Students);
                        });
                    }
                    if (sList)
                    {
                        for (let i=0; i<sList.length;i++)
                        {
                            let count = 0;
                            if (sList[i])
                            {
                                let keys = Object.keys(sList[i]);
                                keys.forEach(function(key){
                                    count++
                                });
                            }
                            Students.push(count)
                        }
                    }
                    res.render('courses', {courses: regcourses,Students : Students, Snapshot : usercrs});
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
                    res.render('addquiz', {user: snapshot.val(), course : course});
                });
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    }});


app.get('/quizlist/:id',function (req, res) {
    let key = req.params.id;
    let quizzes=[];
    if (token) {
        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                let uid = decodedToken.uid;
                const user = admin.database().ref('Courses/' + key + '/Tests');
                user.on('value', function (snapshot) {
                    if (snapshot.val())
                    {
                        let keys = Object.keys(snapshot.val());
                        keys.forEach(function(key){
                            quizzes.push(key)
                        });
                    }
                    res.render('quizzes', {Quizzes: quizzes, Snapshot : snapshot, Qid : key});
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

app.get('/quizData/:id',function (req, res) {
    let id = req.params.id;
    let cid = id.split("+");
    let students=[];
    let marks=[];
    let mean=0;let max=0;
    if (token) {
        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                let uid = decodedToken.uid;
                const user = admin.database().ref('Users/' + uid + '/Courses/' + cid[0] + '/' + cid[1]);
                user.on('value', function (snapshot) {
                    if (snapshot.val())
                    {
                        let keys = Object.keys(snapshot.val());
                        keys.forEach(function(key){
                            students.push(key);
                            marks.push(snapshot.child(key).val());
                            if (snapshot.child(key).val() > max)
                                max = snapshot.child(key).val();
                            mean = mean + snapshot.child(key).val();
                        });
                        mean = mean/marks.length;
                    }
                    res.render('quizresults', {Students: students, Marks : marks, Mean : mean, Max : max, Snapshot : snapshot});
                });
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    }});


app.listen(3000);