window.onload = ()=>{
    (localStorage.length !==0)?hideLoginPage():($( ".nav" ).hide(), $(".content").hide());
};
let list = `<li class="song"><span class="playlist-songs-name"></span> <span class="playlist-songs-dash">-</span><span class="playlist-songs-group"></span><span class="playlist-songs-time"></span></li>`;
var playList = document.querySelector('.playlist-songs');

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
function newList() {
    playList.innerHTML += list;
}


var qwe = JSON.parse(data);




