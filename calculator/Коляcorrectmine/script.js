let calcInputLine = document.getElementById("main_input"),
    regularButtonsOfCalc = document.getElementsByClassName("regular_button"),
    clearIpnutButton = document.querySelector(".regular_button_cancel"),
    saveInputButton = document.querySelector(".big_save_button"),
    equalInputButton = document.querySelector(".regular_button_result");
for (var i = 0; i < regularButtonsOfCalc.length; i++){
    regularButtonsOfCalc[i].addEventListener("click", (event)=>{
        let clickedButton = event.target.getAttribute('value');
            calcInputLine.value = calcInputLine.value + clickedButton;
        if (+calcInputLine.value){
            calcInputLine.value = +calcInputLine.value;
        }
    });
};
storage();
clearIpnutButton.addEventListener("click", ()=>{
    return calcInputLine.value = 0;
});
saveInputButton.addEventListener("click", ()=>{
    return localStorage.setItem("result", calcInputLine.value);
});
equalInputButton.addEventListener("click", ()=>{
    calcInputLine.value = eval(calcInputLine.value);
});
function storage() {
    if (localStorage.getItem("result")) {
        calcInputLine.value = localStorage.getItem("result");
    } else {
        calcInputLine.value = 0;
    }
}
