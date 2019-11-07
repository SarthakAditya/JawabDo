var n_q = 0 ;
var ques = [] ;
var o1 = [] , o2 = [] , o3 = [] , o4 = [] , c = [] ;
let test=[];

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
    let dateInput = document.getElementById("date1").value;
    let date = dateInput.split("/");
    let Month = date[0];
    let Date = date[1];
    let Year = date[2];

    let Hour = document.getElementById("HOUR").value;
    let Minutes = document.getElementById("Minute").value;
    let Duration = document.getElementById("Duration").value;

    let url = String(window.location.href);
    let ress = url.split("/");
    let course = ress[ress.length-1];
    var i;
    let database = firebase.database();
    let userRef = database.ref('Courses/'+ course + '/Tests');
    let testTime = database.ref('Courses/'+ course + '/Time');
    for(i = 1 ;  i <= n_q ; ++i){
        userRef.update({
            [(i-1)*6+1] : ques[i-1],
            [(i-1)*6+2] : o1[i-1],
            [(i-1)*6+3] : o2[i-1],
            [(i-1)*6+4] : o3[i-1],
            [(i-1)*6+5] : o4[i-1],
            [(i-1)*6+6] : c[i-1]
        });
    }

    testTime.set({
       Date : Date,
       Duration : Duration,
       HRS : Hour,
       MINS : Minutes,
       Month : Month
    });

    let delayInMilliseconds = 6000; //6 second

    setTimeout(function() {
        window.location.assign('/courses')
    }, delayInMilliseconds);
}
