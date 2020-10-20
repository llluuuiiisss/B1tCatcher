"use strict";
var objImage= null;
var canvas = null;
var hearth = null;
var hearth1 = null;
var hearth2 = null;
var ctx;
var one = null;
var zero = null;
var decimal = null;
var binary = null;
var fallingImages = [];
var colArray = [];
var noOfDrops = 20;
var x=0;
var y=0;
var imgBg;
var dec;
var bin1=0;
var bin2=0;
var bin3=0;
var bin4=0;
var decimalS;
var numcatch=0;
var vidas=0;
var levelup;
var gameover;
var finalscore = 0;
var name;
var obstacle;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var obstacle7;
var obs = [];
var increasingfactor = 5;
var time3;
var musicafundo;
var mlevelup;
var mlifes;
var mgameover;
var mcatch;


(function() {window.addEventListener("load", main);}());

function main()
{
    if(sessionStorage.getItem("lifes")!=undefined){
        let aux = sessionStorage.getItem("lifes");
        vidas = parseInt(aux);
    }
    else {
        vidas=0;
    }
    decimal = document.getElementById("dec");
    binary = document.getElementById("bin");
    gameover = document.getElementById("gameover");
    gameover.style.visibility = 'hidden';
    canvas = document.getElementById("canvas");
    musicafundo=document.getElementById("musica");
    mlevelup=document.getElementById("levelupup");
    mcatch=document.getElementById("catch");
    mlifes=document.getElementById("lifeslost");
    mgameover=document.getElementById("gamover");
    musicafundo.loop=true;
    mlevelup.loop=false;
    mcatch.loop=false;
    mlifes.loop=false;
    mgameover.loop=false;
    musicafundo.volume=0.3;
    musicafundo.play();
    numeroAleatorio();
    createObstacles();
    decimal.textContent+=" "+decimalS;//criar ficheiro de texto e associar, se houver colisao fazer isto para binary ou tirar vida(lifes) e por a visibilidade a hidden, qunado lifes = 0 acabar jogo.
    binary.textContent+=" ?";
    hearth = document.getElementById("heart");
    hearth1 = document.getElementById("heart1");
    hearth2 = document.getElementById("heart2");
    if (vidas>0){
        hearth2.style.visibility="hidden";
    }
    if (vidas>1){
        hearth1.style.visibility="hidden";
    }
    levelup = document.getElementById("levelup");
    levelup.style.visibility = 'hidden';
    generateBoneco();
    if(canvas.getContext)
    {
        ctx = canvas.getContext('2d');
        imgBg = new Image();
        imgBg.src="../resources/grey.png";
        var time = setInterval(draw,50);
        var time2= setInterval(intersects,0);
        for(var i=0;i<noOfDrops;i++){
            var array =['zero','one'];
            const number = array[Math.floor(Math.random() * array.length)];
            var fallingI=new Object();
            if (number=== 'one') {
                //var fallingI = new Object();
                fallingI["image"]=new Image();
                fallingI.image.src='../resources/1.png';
                fallingI["x"]=Math.random()*1270;
                fallingI["y"]=0;
                fallingI["speed"] = 3+Math.random()*increasingfactor;
                fallingI["name"] = "one";
                fallingImages.push(fallingI);
            }else if(number==='zero'){
                //var fallingI = new Object();
                fallingI["image"]=new Image();
                fallingI.image.src='../resources/0.png';
                fallingI["x"]=Math.random()*1270;
                fallingI["y"]=0;
                fallingI["speed"] = 3+Math.random()*increasingfactor;
                fallingI["name"] = "zero";
                fallingImages.push(fallingI);
            }
        }
    }
}

function drawBackground()
{
    ctx.drawImage(imgBg,0,0);
}

function draw() {
    drawBackground();
    for(var i=0;i<noOfDrops;i++){
        if(fallingImages[i]!=null)
        {
            ctx.drawImage(fallingImages[i].image,fallingImages[i].x, fallingImages[i].y);
            fallingImages[i].y+=fallingImages[i].speed;
            if(fallingImages[i].y >500)
            {
                fallingImages[i].y = -100;
                fallingImages[i].x = Math.random()*1200;
            }
        }
    }
}

function generateBoneco()
{
    objImage = new Image(60,60);
    objImage.src = '../resources/pc.png';
    document.body.appendChild(objImage);
    objImage.style.position = 'absolute';
    objImage.style.top = '400px';//400
    objImage.style.left = '635px';
}

function createObstacles() {
    obstacle = new Image();
    obstacle.src = "../resources/bin_.png";
    document.body.appendChild(obstacle);
    obstacle.style.position = "absolute";
    obstacle.style.top = '382px';
    obstacle.style.left = '20px';
    obstacle.style.height = '18px';
    obstacle.style.width = '430px';
    obs.push(obstacle);
    obstacle1 = new Image();
    obstacle1.src = "../resources/bin_.png";
    document.body.appendChild(obstacle1);
    obstacle1.style.position = "absolute";
    obstacle1.style.top = '202px';
    obstacle1.style.left = '250px';
    obstacle1.style.height = '198px';
    obstacle1.style.width = '20px';
    obs.push(obstacle1);
    obstacle2 = new Image();
    obstacle2.src = "../resources/bin_.png";
    document.body.appendChild(obstacle2);
    obstacle2.style.position = "absolute";
    obstacle2.style.top = '382px';
    obstacle2.style.left = '950px';
    obstacle2.style.height = '18px';
    obstacle2.style.width = '345px';
    obs.push(obstacle2);
    obstacle3 = new Image();
    obstacle3.src = "../resources/bin_.png";
    document.body.appendChild(obstacle3);
    obstacle3.style.position = "absolute";
    obstacle3.style.top = '193px';
    obstacle3.style.left = '1100px';
    obstacle3.style.height = '195px';
    obstacle3.style.width = '17px';
    obs.push(obstacle3);
    obstacle4 = new Image();
    obstacle4.src = "../resources/bin_.png";
    document.body.appendChild(obstacle4);
    obstacle4.style.position = "absolute";
    obstacle4.style.top = '475px';
    obstacle4.style.left = '550px';
    obstacle4.style.height = '95px';
    obstacle4.style.width = '295px';
    obs.push(obstacle4);
    obstacle5 = new Image();
    obstacle5.src = "../resources/bin_.png";
    document.body.appendChild(obstacle5);
    obstacle5.style.position = "absolute";
    obstacle5.style.top = '65px';
    obstacle5.style.left = '550px';
    obstacle5.style.height = '150px';
    obstacle5.style.width = '20px';
    obs.push(obstacle5);
    obstacle6 = new Image();
    obstacle6.src = "../resources/bin_.png";
    document.body.appendChild(obstacle6);
    obstacle6.style.position = "absolute";
    obstacle6.style.top = '295px';
    obstacle6.style.left = '574px';
    obstacle6.style.height = '18px';
    obstacle6.style.width = '196px';
    obs.push(obstacle6);
    obstacle7 = new Image();
    obstacle7.src = "../resources/bin_.png";
    document.body.appendChild(obstacle7);
    obstacle7.style.position = "absolute";
    obstacle7.style.top = '165px';
    obstacle7.style.left = '770px';
    obstacle7.style.height = '148px';
    obstacle7.style.width = '25px';
    obs.push(obstacle7);
}


function intersects()
{
    let x0 = objImage.x-(objImage.width);
    let y0 = objImage.y-(objImage.height*2);
    let x0w = objImage.x+(objImage.width/4)+20;
    let y0h = objImage.y+(objImage.height/4-20);
    let col =false;
    for(let i=0; i<fallingImages.length;i++) {
        if(fallingImages[i]!=null) {
            let x = fallingImages[i].x;
            let y = fallingImages[i].y;
            let xw = fallingImages[i].x+fallingImages[i].width;
            let yh = fallingImages[i].y+fallingImages[i].height;
            let tmpArray = [];
            if((y0 <= y && y0h >= y) || (y0 >= y && y0h <= yh) || (y0<=yh && y0h >= y)) {
                if((x0 <= x && x0w >= x) || (x0 >= x && x0w <= xw) || (x0 <= xw && x0w >= xw)) {
                    col=true;
                }
            }
            else if(x>=x0 && xw <= x0w && y>=y0 && yh<=y0h) {
                col=true;
            }
            if (col===true) {
                col = false;
                if(fallingImages[i].name === "zero") {
                    colArray.push(0);
                    console.log("0");
                    fallingImages[i]=null;
                    if(numcatch==0){//primeiro numero
                        if(bin1==0){//apanha o certo
                            binary.textContent="BINARY: "+bin1.toString()+" ?";
                            numcatch++;
                            mcatch.play();
                        }
                        else{//tirar uma vida
                            if (vidas==0){
                                vidas++;
                                hearth2.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==1){
                                vidas++;
                                hearth1.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==2){//GAME OVER
                                vidas++;
                                hearth.style.visibility='hidden';
                                objImage.style.visibility='hidden';
                                gameover.style.visibility='visible';
                                if(sessionStorage.getItem("finalscore")!=undefined){
                                    let a = sessionStorage.getItem("finalscore");
                                    a = parseInt(a);
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.removeItem("finalscore");
                                    sessionStorage.setItem("finalscore",a);
                                }else{
                                    let a = 0;
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.setItem("finalscore",a);
                                }
                                mcatch.volume=0;
                                musicafundo.pause();
                                mgameover.play();
                                setTimeout(finish,3000);
                            }
                        }
                    }
                    else if(numcatch==1){//segundo mumero
                        if(bin2==0){//apanha o certo
                            binary.textContent="BINARY: "+bin1.toString()+" "+bin2.toString()+" ?";
                            numcatch++;
                            mcatch.play();
                        }
                        else{//tirar uma vida
                            if (vidas==0){
                                vidas++;
                                hearth2.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==1){
                                vidas++;
                                hearth1.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==2){//GAME OVER
                                vidas++;
                                hearth.style.visibility='hidden';
                                objImage.style.visibility='hidden';
                                gameover.style.visibility='visible';
                                if(sessionStorage.getItem("finalscore")!=undefined){
                                    let a = sessionStorage.getItem("finalscore");
                                    a = parseInt(a);
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.removeItem("finalscore");
                                    sessionStorage.setItem("finalscore",a);
                                }else{
                                    let a = 0;
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.setItem("finalscore",a);
                                }
                                mcatch.volume=0;
                                musicafundo.pause();
                                mgameover.play();
                                setTimeout(finish,3000);
                            }
                        }
                    }
                    else if(numcatch==2){//3 numero
                        if(bin3==0){//apanha o certo
                            binary.textContent="BINARY: "+bin1.toString()+" "+bin2.toString()+" "+bin3.toString()+" ?";
                            numcatch++;
                            mcatch.play();
                        }
                        else{//tirar uma vida
                            if (vidas==0){
                                vidas++;
                                hearth2.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==1){
                                vidas++;
                                hearth1.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==2){//GAME OVER
                                vidas++;
                                hearth.style.visibility='hidden';
                                objImage.style.visibility='hidden';
                                gameover.style.visibility='visible';
                                if(sessionStorage.getItem("finalscore")!=undefined){
                                    let a = sessionStorage.getItem("finalscore");
                                    a = parseInt(a);
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.removeItem("finalscore");
                                    sessionStorage.setItem("finalscore",a);
                                }else{
                                    let a = 0;
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.setItem("finalscore",a);
                                }
                                mcatch.volume=0;
                                musicafundo.pause();
                                mgameover.play();
                                setTimeout(finish,3000);
                            }
                        }
                    }
                    else if(numcatch==3){//4 numero
                        if(bin4==0){//apanha o certo        GANHOU
                            binary.textContent="BINARY: "+bin1.toString()+" "+bin2.toString()+" "+bin3.toString()+" "+bin4.toString();
                            numcatch++;
                            finalscore+=100;
                            objImage.style.visibility='hidden';
                            levelup.style.visibility='visible';
                            if(sessionStorage.getItem("finalscore")!=undefined){
                                let a = sessionStorage.getItem("finalscore");
                                a = parseInt(a);
                                a+=finalscore;
                                a = a.toString();
                                sessionStorage.removeItem("finalscore");
                                sessionStorage.setItem("finalscore",a);
                            }else{
                                let a = 0;
                                a+=finalscore;
                                a = a.toString();
                                sessionStorage.setItem("finalscore",a);
                            }
                            musicafundo.pause();
                            mlevelup.play();
                            setTimeout(lup,3000);
                        }
                        else{//tirar uma vida
                            if (vidas==0){
                                vidas++;
                                hearth2.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==1){
                                vidas++;
                                hearth1.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==2){//GAME OVER
                                vidas++;
                                hearth.style.visibility='hidden';
                                objImage.style.visibility='hidden';
                                gameover.style.visibility='visible';
                                if(sessionStorage.getItem("finalscore")!=undefined){
                                    let a = sessionStorage.getItem("finalscore");
                                    a = parseInt(a);
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.removeItem("finalscore");
                                    sessionStorage.setItem("finalscore",a);
                                }else{
                                    let a = 0;
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.setItem("finalscore",a);
                                }
                                mcatch.volume=0;
                                musicafundo.pause();
                                mgameover.play();
                                setTimeout(finish,3000);
                            }
                        }
                    }
                }
                else if(fallingImages[i].name === "one") {
                    colArray.push(1);
                    console.log("1");
                    fallingImages[i]=null;
                    if(numcatch==0){//primeiro numero
                        if(bin1==1){//apanha o certo
                            binary.textContent="BINARY: "+bin1.toString()+" ?";
                            numcatch++;
                            mcatch.play();
                        }
                        else{//tirar uma vida
                            if (vidas==0){
                                vidas++;
                                hearth2.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==1){
                                vidas++;
                                hearth1.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==2){//GAME OVER
                                vidas++;
                                hearth.style.visibility='hidden';
                                objImage.style.visibility='hidden';
                                gameover.style.visibility='visible';
                                if(sessionStorage.getItem("finalscore")!=undefined){
                                    let a = sessionStorage.getItem("finalscore");
                                    a = parseInt(a);
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.removeItem("finalscore");
                                    sessionStorage.setItem("finalscore",a);
                                }else{
                                    let a = 0;
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.setItem("finalscore",a);
                                }
                                mcatch.volume=0;
                                musicafundo.pause();
                                mgameover.play();
                                setTimeout(finish,3000);
                            }
                        }
                    }
                    else if(numcatch==1){//segundo mumero
                        if(bin2==1){//apanha o certo
                            binary.textContent="BINARY: "+bin1.toString()+" "+bin2.toString()+" ?";
                            numcatch++;
                            mcatch.play();
                        }
                        else{//tirar uma vida
                            if (vidas==0){
                                vidas++;
                                hearth2.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==1){
                                vidas++;
                                hearth1.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==2){//GAME OVER
                                vidas++;
                                hearth.style.visibility='hidden';
                                objImage.style.visibility='hidden';
                                gameover.style.visibility='visible';
                                if(sessionStorage.getItem("finalscore")!=undefined){
                                    let a = sessionStorage.getItem("finalscore");
                                    a = parseInt(a);
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.removeItem("finalscore");
                                    sessionStorage.setItem("finalscore",a);
                                }else{
                                    let a = 0;
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.setItem("finalscore",a);
                                }
                                mcatch.volume=0;
                                musicafundo.pause();
                                mgameover.play();
                                setTimeout(finish,3000);
                            }
                        }
                    }
                    else if(numcatch==2){//3 numero
                        if(bin3==1){//apanha o certo
                            binary.textContent="BINARY: "+bin1.toString()+" "+bin2.toString()+" "+bin3.toString()+" ?";
                            numcatch++;
                            mcatch.play();
                        }
                        else{//tirar uma vida
                            if (vidas==0){
                                vidas++;
                                hearth2.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==1){
                                vidas++;
                                hearth1.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==2){//GAME OVER
                                vidas++;
                                hearth.style.visibility='hidden';
                                objImage.style.visibility='hidden';
                                gameover.style.visibility='visible';
                                if(sessionStorage.getItem("finalscore")!=undefined){
                                    let a = sessionStorage.getItem("finalscore");
                                    a = parseInt(a);
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.removeItem("finalscore");
                                    sessionStorage.setItem("finalscore",a);
                                }else{
                                    let a = 0;
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.setItem("finalscore",a);
                                }
                                mcatch.volume=0;
                                musicafundo.pause();
                                mgameover.play();
                                setTimeout(finish,3000);
                            }
                        }
                    }
                    else if(numcatch==3){//4 numero
                        if(bin4==1){//apanha o certo        GANHOU
                            binary.textContent="BINARY: "+bin1.toString()+" "+bin2.toString()+" "+bin3.toString()+" "+bin4.toString();
                            numcatch++;
                            finalscore+=100;
                            objImage.style.visibility='hidden';
                            levelup.style.visibility='visible';
                            if(sessionStorage.getItem("finalscore")!=undefined){
                                let a = sessionStorage.getItem("finalscore");
                                a = parseInt(a);
                                a+=finalscore;
                                a = a.toString();
                                sessionStorage.removeItem("finalscore");
                                sessionStorage.setItem("finalscore",a);
                            }else{
                                let a = 0;
                                a+=finalscore;
                                a = a.toString();
                                sessionStorage.setItem("finalscore",a);
                            }
                            musicafundo.pause();
                            mlevelup.play();
                            setTimeout(lup,3000);
                        }
                        else{//tirar uma vida
                            if (vidas==0){
                                vidas++;
                                hearth2.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==1){
                                vidas++;
                                hearth1.style.visibility='hidden';
                                mlifes.play();
                            }
                            else if (vidas==2){//GAME OVER
                                vidas++;
                                hearth.style.visibility='hidden';
                                objImage.style.visibility='hidden';
                                gameover.style.visibility='visible';
                                if(sessionStorage.getItem("finalscore")!=undefined){
                                    let a = sessionStorage.getItem("finalscore");
                                    a = parseInt(a);
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.removeItem("finalscore");
                                    sessionStorage.setItem("finalscore",a);
                                }else{
                                    let a = 0;
                                    a+=finalscore;
                                    a = a.toString();
                                    sessionStorage.setItem("finalscore",a);
                                }
                                mcatch.volume=0;
                                musicafundo.pause();
                                mgameover.play();
                                setTimeout(finish,3000);
                            }
                        }
                    }
                }
            }
        }
    }
}

function numeroAleatorio() {
    var aux;
    dec=Math.floor(Math.random() * 16);
    decimalS=dec.toString();
    aux=dec;
    if(aux>=8){
        bin1=1;
        aux=aux-8;
    }
    else {
        bin1=0;
    }
    if (aux>=4){
        bin2=1;
        aux=aux-4;
    }
    else{
        bin2=0;
    }
    if(aux>=2){
        bin3=1;
        aux=aux-2;
    }
    else{
        bin3=0;
    }

    if (aux>=1){
        bin4=1;
    }
    else{
        bin4=0;
    }

}


function getKeyAndMove(e){
    var key_code=e.which||e.keyCode;
    switch(key_code){
        case 37: //left arrow key
            moveLeft();
            break;
        case 38: //Up arrow key
            moveUp();
            break;
        case 39: //right arrow key
            moveRight();
            break;
        case 40: //down arrow key
            moveDown();
            break;
    }
}

function finish() {//escrever no ranking caso estaja no top 10
    window.location.href='../html_and_css_files/finish.html';
}

function lup() {//acrescentar score
    if(sessionStorage.getItem("lifes")!=undefined){
        let aux = sessionStorage.getItem("lifes");
        aux = parseInt(aux);
        aux = vidas;
        aux = aux.toString();
        sessionStorage.removeItem("lifes");
        sessionStorage.setItem("lifes",aux);
    }else{
        let aux;
        aux=vidas;
        aux = aux.toString();
        sessionStorage.setItem("lifes",aux);
    }
    window.location.href='../html_and_css_files/level3.html';
}

function moveLeft(){
    if((parseInt(objImage.style.top)>415)&&(parseInt(objImage.style.left)>485)&&(parseInt(objImage.style.left)<850)){

    }
    else if((parseInt(objImage.style.left)<460)&&(parseInt(objImage.style.top)<400)&&(parseInt(objImage.style.top)>325)){

    }
    else if((parseInt(objImage.style.top)>145)&&(parseInt(objImage.style.top)<330)&&(parseInt(objImage.style.left)>185)&&(parseInt(objImage.style.left)<280)){

    }
    else if ((parseInt(objImage.style.top)<220)&&(parseInt(objImage.style.left)>485)&&(parseInt(objImage.style.left)<580)){

    }
    else if ((parseInt(objImage.style.top)>130)&&(parseInt(objImage.style.top)<330)&&(parseInt(objImage.style.left)>1040)&&(parseInt(objImage.style.left)<1120)){

    }
    else if ((parseInt(objImage.style.top)>100)&&(parseInt(objImage.style.top)<310)&&(parseInt(objImage.style.left)>710)&&(parseInt(objImage.style.left)<805)){

    }
    else if(parseInt(objImage.style.left)-10 > (28)) {
        objImage.style.left=parseInt(objImage.style.left)-15 +'px';
    }
}

function moveUp(){
    if((parseInt(objImage.style.left)<455)&&(parseInt(objImage.style.top)<405)&&(parseInt(objImage.style.top)>325)){

    }
    else if ((parseInt(objImage.style.top)<225)&&(parseInt(objImage.style.left)>485)&&(parseInt(objImage.style.left)<575)){

    }
    else if ((parseInt(objImage.style.left)>890)&&(parseInt(objImage.style.top)>325)&&(parseInt(objImage.style.top)<405)){

    }
    else if((parseInt(objImage.style.left)>515)&&(parseInt(objImage.style.left)<800)&&(parseInt(objImage.style.top)>235)&&(parseInt(objImage.style.top)<315)){

    }
    else if(parseInt(objImage.style.top)-10 > 60) {
        objImage.style.top=parseInt(objImage.style.top)-15 +'px';
    }
}
function moveRight(){
    if((parseInt(objImage.style.top)>415)&&(parseInt(objImage.style.left)>480)&&(parseInt(objImage.style.left)<845)){

    }
    else if((parseInt(objImage.style.top)>145)&&(parseInt(objImage.style.top)<330)&&(parseInt(objImage.style.left)>180)&&(parseInt(objImage.style.left)<275)){

    }
    else if ((parseInt(objImage.style.top)<220)&&(parseInt(objImage.style.left)>480)&&(parseInt(objImage.style.left)<575)){

    }
    else if ((parseInt(objImage.style.left)>885)&&(parseInt(objImage.style.top)>325)&&(parseInt(objImage.style.top)<400)){

    }
    else if ((parseInt(objImage.style.top)>130)&&(parseInt(objImage.style.top)<330)&&(parseInt(objImage.style.left)>1035)&&(parseInt(objImage.style.left)<1115)){

    }
    else if((parseInt(objImage.style.left)>510)&&(parseInt(objImage.style.left)<715)&&(parseInt(objImage.style.top)>235)&&(parseInt(objImage.style.top)<310)){

    }
    else if ((parseInt(objImage.style.top)>100)&&(parseInt(objImage.style.top)<310)&&(parseInt(objImage.style.left)>705)&&(parseInt(objImage.style.left)<800)){

    }
    else if(parseInt(objImage.style.left) < canvas.width-50) {
        objImage.style.left=parseInt(objImage.style.left)+15 +'px';
    }
}
function moveDown(){
    if((parseInt(objImage.style.top)>410)&&(parseInt(objImage.style.left)>485)&&(parseInt(objImage.style.left)<845)){

    }
    else if((parseInt(objImage.style.left)<455)&&(parseInt(objImage.style.top)<400)&&(parseInt(objImage.style.top)>320)){

    }
    else if((parseInt(objImage.style.top)>140)&&(parseInt(objImage.style.top)<330)&&(parseInt(objImage.style.left)>185)&&(parseInt(objImage.style.left)<275)){

    }
    else if ((parseInt(objImage.style.left)>890)&&(parseInt(objImage.style.top)>320)&&(parseInt(objImage.style.top)<400)){

    }
    else if ((parseInt(objImage.style.top)>125)&&(parseInt(objImage.style.top)<330)&&(parseInt(objImage.style.left)>1040)&&(parseInt(objImage.style.left)<1115)){

    }
    else if((parseInt(objImage.style.left)>515)&&(parseInt(objImage.style.left)<715)&&(parseInt(objImage.style.top)>230)&&(parseInt(objImage.style.top)<310)){

    }
    else if ((parseInt(objImage.style.top)>95)&&(parseInt(objImage.style.top)<310)&&(parseInt(objImage.style.left)>710)&&(parseInt(objImage.style.left)<800)){

    }
    else if(parseInt(objImage.style.top) < canvas.height) {
        objImage.style.top=parseInt(objImage.style.top)+15 +'px';
    }
}
