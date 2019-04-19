 let calcInputLine = document.getElementById("main_input");

storage();

let regularButtonsOfCalc = document.getElementsByClassName("regular_button");
for (var i = 0; i < regularButtonsOfCalc.length; i++) {
    regularButtonsOfCalc[i].addEventListener("click", changeCanculatorInputLine);
}

let clearIpnutButton = document.getElementsByClassName("regular_button_cancel")[0];
clearIpnutButton.addEventListener("click", clearInput);

let saveInputButton = document.getElementsByClassName("big_save_button")[0];
saveInputButton.addEventListener("click", saveInput);

let equalInputButton = document.getElementsByClassName("regular_button_result")[0];
equalInputButton.addEventListener("click", calculateInput);

function changeCanculatorInputLine() {
    let clickedButton = event.target.getAttribute('value');
    calcInputLine.value = calcInputLine.value + clickedButton;
    if (+calcInputLine.value) {
        calcInputLine.value = +calcInputLine.value;
    }
    console.log(calcInputLine.value);
}

function calculateInput() {

    calcInputLine.value = eval(calcInputLine.value);
    console.log(calcInputLine.value);
}

function clearInput() {
    calcInputLine.value = 0;
}

function storage() {
    if (localStorage.getItem("result")) {
        calcInputLine.value = localStorage.getItem("result");
        alert('Результат последнего вычисления вы увидите на экране калькулятора')
    } else {
        calcInputLine.value = 0;
    }
}

function saveInput() {
    localStorage.setItem("result", calcInputLine.value);
}