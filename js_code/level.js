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
var vidas=0;
var imgBg;
var dec;
var bin1=0;
var bin2=0;
var bin3=0;
var bin4=0;
var decimalS;
var numcatch=0;
var levelup;
var gameover;
var finalscore = 0;
var name;
var musicafundo;
var mlevelup;
var mlifes;
var mgameover;
var mcatch;

(function() {window.addEventListener("load", main);}());

function main() {
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
    decimal.textContent+=" "+decimalS;//criar ficheiro de texto e associar, se houver colisao fazer isto para binary ou tirar vida(lifes) e por a visibilidade a hidden, qunado lifes = 0 acabar jogo.
    binary.textContent+=" ?";    hearth = document.getElementById("heart");
    hearth1 = document.getElementById("heart1");
    hearth2 = document.getElementById("heart2");
    levelup = document.getElementById("levelup");
    levelup.style.visibility = 'hidden';
    generateBoneco();
    if(canvas.getContext){
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
                fallingI["speed"] = 3+Math.random()*5;
                fallingI["name"] = "one";
                fallingImages.push(fallingI);
            }else if(number==='zero'){
                //var fallingI = new Object();
                fallingI["image"]=new Image();
                fallingI.image.src='../resources/0.png';
                fallingI["x"]=Math.random()*1270;
                fallingI["y"]=0;
                fallingI["speed"] = 3+Math.random()*5;
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
    objImage.style.top = '400px';
    objImage.style.left = '500px';
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

function finish() {//escrever no ranking caso esteja no top 10
    window.location.href='../html_and_css_files/finish.html';
}

function lup() {//acrescentar score
    if(sessionStorage.getItem("lifes")!=undefined){
        let aux = sessionStorage.getItem("lifes");
        aux = parseInt(aux);
        aux=vidas;
        aux = aux.toString();
        sessionStorage.removeItem("lifes");
        sessionStorage.setItem("lifes",aux);
    }else{
        let aux;
        aux=vidas;
        aux = aux.toString();
        sessionStorage.setItem("lifes",aux);
    }
    window.location.href='../html_and_css_files/level2.html';
}

function moveLeft(){
    if(parseInt(objImage.style.left)-10 > (canvas.width - (canvas.width)+28)) {
        objImage.style.left=parseInt(objImage.style.left)-15 +'px';
    }
}
function moveUp(){
    if(parseInt(objImage.style.top)-10 > (canvas.height-(canvas.height)+60)) {
        objImage.style.top=parseInt(objImage.style.top)-15 +'px';
    }
}
function moveRight(){
    if(parseInt(objImage.style.left) < canvas.width-50) {
        objImage.style.left=parseInt(objImage.style.left)+15 +'px';
    }
}
function moveDown(){
    if(parseInt(objImage.style.top) < canvas.height) {
        objImage.style.top=parseInt(objImage.style.top)+15 +'px';
    }
}

