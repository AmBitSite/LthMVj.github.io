window.onload = ()=>{
    (localStorage.length !==0)?hideLoginPage():($( ".nav" ).hide(), $(".content").hide(), $(".content-menu").hide());
};
$(function(){
    let step = '',
        text = $('#loading').text()
    function changeStep(){
        $('#loading').text(text +step)
        if(step == '...'){
            step = ''
        }
        else {step += '.'}
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
    dataJSON=[],
    x =[];
    
    $(".nav__name").text(localStorage.key(localStorage.length-1));

function hideLoginPage(){
    $(".contain" ).hide("slow");
    $(".nav" ).show("slow");
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
    $(".nav" ).hide( "slow");
    $(".contain" ).show( "slow");
    $(".content").hide("slow");
    localStorage.removeItem($(".nav__name").text());
});


$(function(){
    $.getJSON('scripts/only_genres.json', function(data) {  
        let template=$('#genretpl').html();
        let info=Mustache.to_html(template,data);
        $('#for_genres').html(info)
    })
})



 
$.getJSON("scripts/genres.json", function(data) {
     //dataJSON.ganres = data.rap/*Object.getOwnPropertyNames(data.rap.Eminem.songs.Stan)*/;
    /*dataJSON.push(data.rap);
    dataJSON.push(data.rock);
    dataJSON.push(data.electro);
    dataJSON.push(data.jazz);*/
    
    
    dataJSON.rap = data.rap;
    dataJSON.rock = data.rock;
    dataJSON.electro = data.electro;
    dataJSON.jazz = data.jazz;
check()
    
})

function check(){for (let key in dataJSON.rap.Eminem.songs.Stan) {
  x.push( key, dataJSON.rap.Eminem.songs.Stan[key]);
  //x.push(`${key}`, `${dataJSON.rap.Eminem[key]}`);
};}

//console.log(x);



































