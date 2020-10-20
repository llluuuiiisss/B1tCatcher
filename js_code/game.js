var playername;

function main(){
    playername = document.getElementById("textfield").value;
    sessionStorage.setItem("playername",playername);
}

window.onload= main;