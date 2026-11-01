restart();
rstrt.addEventListener("click", restart);
tab.addEventListener("click", table);
marking.addEventListener("click", function(){
    markMode = !markMode;
    if (markMode){
        marking.textContent = 'Play';
    }
    else{
        marking.textContent = 'Mark';
    }
});