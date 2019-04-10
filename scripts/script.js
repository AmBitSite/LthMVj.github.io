window.onload = ()=>{
    (localStorage.length !==0)?hideLoginPage():($( ".nav" ).hide(), $(".content").hide());
};
$(function(){
    let step = '',
        text = $('#loading').text()
    function changeStep(){
        $('#loading').text(text +step)
        if(step == '...'){
            step = ''
        }
        else {step +- '.'}
    }
    let interval = setInterval(changeStep, 500)
    $(document).ready(function(){
        setTimeout(function(){
            clearInterval(interval)
            $('#preloader').addClass('hide')
        }, 2000);
    });
});

let login = document.getElementById('input_login'),
    welcomePage = document.querySelector('.contain'),
    navBar = document.querySelector('.nav'),
    btnOut = document.querySelector('.nav__out'),
    dataJSON ={};
    $(".nav__name").text(localStorage.key(localStorage.length-1));

function hideLoginPage(){
    $( ".contain" ).hide("slow");
    $( ".nav" ).show("slow");
    $(".content").show("slow");
}

welcomePage.addEventListener('keydown', (e)=>{
   if(e.keyCode == 13){
            localStorage.setItem(`${login.value}`, "1");
            $(".nav__name").text(`${login.value}`);
            hideLoginPage();
    }
});

btnOut.addEventListener('click', ()=>{
    $( ".nav" ).hide( "slow");
    $( ".contain" ).show( "slow");
    $(".content").hide("slow");
    localStorage.removeItem($(".nav__name").text());
});

$.getJSON("scripts/genres.json", function(data) {
    dataJSON.genres = data.genres;
})
console.log(dataJSON);

























