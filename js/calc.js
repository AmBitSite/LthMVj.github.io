let inputValue = document.querySelector('.calc__result'),
    resulBtn = document.querySelector('.btn__result'),
    calcBtn = document.querySelector('.calc-btn'),
    arrValueInput=[],
    arrStrValueInput,
    resultMath;
function check(input) {
    var value = inputValue.value; 
    var rep = /[ \.;"=:'a-zA-Zа-яА-Я]/; 
    if (rep.test(value)) { 
        value = value.replace(rep, ''); 
        inputValue.value = value; 
    } 
};
function lastValue(){
    if(resultMath== undefined){
        if(localStorage.length ==0){
            return '';
        }
        else
        return localStorage.randomName;
    }
};
inputValue.setAttribute('placeholder', lastValue());
calcBtn.addEventListener('click', (e)=>{
    let btnClick = e.target.innerText;
    arrValueInput.push(btnClick);
    arrStrValueInput = arrValueInput.join('');
    inputValue.value = arrStrValueInput;
});
resulBtn.addEventListener('click', ()=>{
    inputValue.value = eval(arrStrValueInput);
    arrStrValueInput = '';
    arrValueInput=[];
    localStorage.setItem('randomName',`${inputValue.value}`);
    });
inputValue.addEventListener("keydown", (e)=> {
    check();
    if (e.keyCode == 13){
        arrStrValueInput = '';
        arrValueInput=[];
        arrStrValueInput = inputValue.value;
        resultMath = eval(arrStrValueInput);
        localStorage.setItem('randomName',`${resultMath}`);
        inputValue.value ='';
        return inputValue.setAttribute('placeholder', localStorage.randomName);
    };
    
});