var n_q = 0 ;
var ques = [] ;
var o1 = [] , o2 = [] , o3 = [] , o4 = [] , c = [] ;
let test =[];

function add(){
    n_q++ ;
    ques.push(document.getElementById("ques").value) ;
    o1.push(document.getElementById("opt1").value) ;
    o2.push(document.getElementById("opt2").value) ;
    o3.push(document.getElementById("opt3").value) ;
    o4.push(document.getElementById("opt4").value) ;
    c.push(document.getElementById("opt5").value) ;

    document.getElementById("ques").value = "" ;
    document.getElementById("opt1").value = "" ;
    document.getElementById("opt2").value = "" ;
    document.getElementById("opt3").value = "" ;
    document.getElementById("opt4").value = "" ;
    document.getElementById("opt5").value = "" ;
}

function createQuiz() {
    // Insert all the questions in firebase database with the auth variable and go back to home page
    var i = 0 ;
    for(i = 0 ;  i < n_q ; ++i){
        console.log("Q" +(i + 1) + " " + ques[i]) ;
        console.log("1. " + " " + o1[i]) ;
        console.log("2. " + " " + o2[i]) ;
        console.log("3. " + " " + o3[i]) ;
        console.log("4. " + " " + o4[i]) ;
        console.log("Correct Option" + " "+c);
        test = {Qestions : ques, Answers : c};
    }
    let database = firebase.database();
    let uid = firebase.auth().currentUser.uid;
    let userRef = database.ref('/users'+'/'+uid + '/Mobile_Computing');
    userRef.push(test);
}

