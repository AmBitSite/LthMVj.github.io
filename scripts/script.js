let login = document.getElementById('input_login'),
    pass = document.getElementById('input_pass'),
    welcomePage = document.querySelector('.contain'),
    navBar = document.querySelector('.nav'),
    btnOut = document.querySelector('.nav__out');

welcomePage.addEventListener('keydown', (e)=>{
   if(e.keyCode == 13){
        if((login.value =='Pavel')&&(pass.value=='Rosolko')){
            welcomePage.classList.remove('d-f');
            welcomePage.classList.add('d-none');
            navBar.classList.remove('d-none');
            navBar.classList.add('d-f');
        };
    }
});

btnOut.addEventListener('click', ()=>{
    if((login.value =='Pavel')&&(pass.value=='Rosolko')){
        navBar.classList.remove('d-f');
        navBar.classList.add('d-none');
        welcomePage.classList.remove('d-none');
        welcomePage.classList.add('d-f');
    };
});
        