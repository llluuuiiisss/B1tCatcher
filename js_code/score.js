var scores = [];
var x=10;
var y = 10;
var text1;
var text2;
var text3;
var text4;
var text5;
var text6;
var text7;
var text8;
var text9;
var text10;


function main(){
    text1= document.getElementById("texto1");
    text2= document.getElementById("texto2");
    text3= document.getElementById("texto3");
    text4= document.getElementById("texto4");
    text5= document.getElementById("texto5");
    text6= document.getElementById("texto6");
    text7= document.getElementById("texto7");
    text8= document.getElementById("texto8");
    text9= document.getElementById("texto9");
    text10= document.getElementById("texto0");
    if(localStorage.getItem("array_scores")!=undefined){
        scores = JSON.parse(localStorage.getItem("array_scores"));
        scores.sort(compareSecondColumn);
        for(let i=0;i<10;i++){
            if (i==0){
                text1.textContent+=scores[i][0]+":"+scores[i][1];
            }
            else if (i==1){
                text2.textContent+=scores[i][0]+":"+scores[i][1];
            }
            else if (i==2){
                text3.textContent+=scores[i][0]+":"+scores[i][1];
            }
            else if (i==3){
                text4.textContent+=scores[i][0]+":"+scores[i][1];
            }
            else if (i==4){
                text5.textContent+=scores[i][0]+":"+scores[i][1];
            }
            else if (i==5){
                text6.textContent+=scores[i][0]+":"+scores[i][1];
            }
            else if (i==6){
                text7.textContent+=scores[i][0]+":"+scores[i][1];
            }
            else if (i==7){
                text8.textContent+=scores[i][0]+":"+scores[i][1];
            }
            else if (i==8){
                text9.textContent+=scores[i][0]+":"+scores[i][1];
            }
            else if (i==9){
                text10.textContent+=scores[i][0]+":"+scores[i][1];
            }
        }
    }
    else {
        text1.textContent+= "NONE";
        text2.textContent+= "NONE";
        text3.textContent+= "NONE";
        text4.textContent+= "NONE";
        text5.textContent+= "NONE";
        text6.textContent+= "NONE";
        text7.textContent+= "NONE";
        text8.textContent+= "NONE";
        text9.textContent+= "NONE";
        text10.textContent+= "NONE";
    }
}

function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

window.onload = main;