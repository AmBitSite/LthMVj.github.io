let login = document.getElementById('input_login'),
    pass = document.getElementById('input_pass'),
    welcomePage = document.querySelector('.contain'),
    navBar = document.querySelector('.nav'),
    btnOut = document.querySelector('.nav__out');

$( ".nav" ).hide();
welcomePage.addEventListener('keydown', (e)=>{
   if(e.keyCode == 13){
        if((login.value =='Pavel')&&(pass.value=='Rosolko')){
            $( ".contain" ).hide( "slow", function() {
                $( ".nav" ).show( "slow");
            });
        };
    }
});

btnOut.addEventListener('click', ()=>{
    $( ".nav" ).hide( "slow", function() {
        $( ".contain" ).show( "slow");
        });
});
        