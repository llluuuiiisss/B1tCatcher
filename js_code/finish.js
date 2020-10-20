var s;
var name;
var array = [];
var array_principal = []
function main() {
    s = document.getElementById("fscore");
    s.textContent += sessionStorage.getItem("finalscore");
    if(sessionStorage.getItem("playername")!=undefined && sessionStorage.getItem("finalscore")!=undefined){
        if(localStorage.getItem("array_scores")!= undefined){
            array_principal = JSON.parse(localStorage.getItem("array_scores"));
            array.push(sessionStorage.getItem("playername"));
            array.push(sessionStorage.getItem("finalscore"));
            array_principal.push(array);
            localStorage.removeItem("array_scores");
            localStorage.setItem("array_scores",JSON.stringify(array_principal));
        }else{
            array.push(sessionStorage.getItem("playername"));
            array.push(sessionStorage.getItem("finalscore"));
            array_principal.push(array);
            localStorage.setItem("array_scores",JSON.stringify(array_principal));
        }

    }
}
window.onload=main;