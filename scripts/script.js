let login = document.getElementById('input_login'),
    pass = document.getElementById('input_pass'),
    welcomePage = document.querySelector('.contain'),
    navBar = document.querySelector('.nav');

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


        