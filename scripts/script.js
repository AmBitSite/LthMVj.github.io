window.onload = ()=>{
    (localStorage.length !==0)?hideLoginPage():($( ".nav" ).hide(), $(".content").hide());
};

let login = document.getElementById('input_login'),
    pass = document.getElementById('input_pass'),
    welcomePage = document.querySelector('.contain'),
    navBar = document.querySelector('.nav'),
    btnOut = document.querySelector('.nav__out');

function hideLoginPage(){
    $( ".contain" ).hide("slow");
    $( ".nav" ).show("slow");
    $(".content").show("slow");
}

welcomePage.addEventListener('keydown', (e)=>{
   if(e.keyCode == 13){
        if((login.value =='Pavel')&&(pass.value=='Rosolko')){
            localStorage.setItem(`${login.value}`, `${pass.value}`);
            hideLoginPage();
        };
    }
});

btnOut.addEventListener('click', ()=>{
    $( ".nav" ).hide( "slow");
    $( ".contain" ).show( "slow");
    $(".content").hide("slow");
    localStorage.removeItem(`${login.value}`);
});
   

$(function(){
    $.getJSON('scripts/only_genres.json', function(data) {  
        let template=$('#genretpl').html();
        let info=Mustache.to_html(template,data);
        $('#for_genres').html(info)
})

})
