
const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyB6NrdAlM49vtfqzvtUTtfApjI1Qf2-7aA",
  authDomain: "jawabdo-4a244.firebaseapp.com",
  databaseURL: "https://jawabdo-4a244.firebaseio.com",
  projectId: "jawabdo-4a244",
  storageBucket: "",
  messagingSenderId: "949766930175",
  appId: "1:949766930175:web:ee63812174cb0a5ded56ca"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.set('views',__dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',function (req,res) {

  res.render('index');

});

app.listen(3001);