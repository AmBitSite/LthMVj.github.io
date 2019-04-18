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
    playlistHeader = document.querySelector('.playlist-info__track'),
    playListImg,
    arrJSONimg=[],
    arrJSONsingers = [],
    arrJSONbio = [],
    arrJSONdata,
    PlayListImgAuthor = document.querySelector('.playlist-song-img'),
    currentTrack = document.getElementById('myAudio'),
    play = document.querySelector('.player'),
    GenresImgAuthor = document.querySelector('.biography-img'),
    biograthyContainer = document.querySelector('.biography-text');

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
        let template=$('#genre__tpl').html();
        let info=Mustache.render(template,data);
        $('#for_genres').html(info)
    })
})
$(function(){
    $.getJSON('scripts/eminem.json', function(data) {
        arrJSONimg = data.img;
        arrJSONsingers = data.singers;
        arrJSONbio = data.bio;
        arrJSONdata = data;
        let template=$('#song__tpl').html();
        let info=Mustache.render(template, arrJSONdata);
        $('#for_song-container').html(info);
        playlistHeader.innerText = document.querySelector('.playlist-songs-name').innerText;
        let arrStrSong = playlistHeader.innerText.split('-');
        document.querySelector('.song').classList.add("track_active");
        playListImg = arrStrSong[arrStrSong.length-1];
        PlayListImgAuthor.src = arrJSONimg[playListImg];
    })
})
delete arrJSONdata;

$('.carousel-inner').on('click', function(e){
    let x = e.target;
    alert(x.innerText);
    $(".genre_container").hide("slow");
});
$('.playlist-songs').on('click', function(e){
    var x = e.target;
    $(".song").click(function() {
        $(".song").removeClass("track_active");
        $(this).addClass("track_active");
    });
    console.log(arrJSONdata);
    function recursive(){
        playlistHeader.innerText = x.innerText;
        let arrStrSong = playlistHeader.innerText.split('-');
        playListImg = arrStrSong[arrStrSong.length-1];
        PlayListImgAuthor.src = arrJSONimg[playListImg];
        playlist = arrJSONsingers;
        currentTrack.src = x.getAttribute('data-value');
        currentTrack.play();
        $('#play').hide();
        $('#pause').show();
        $(currentTrack).on('ended',function(){
            let parentSong = $(x).parent('.song').removeClass("track_active");
            let nextTrack = $(parentSong).next().addClass("track_active");
            x = nextTrack[0].children[0];
            recursive(x);
        });
    };
    recursive();
    $('#forward').on('click', function nextTrack(){
        let parentSong = $(x).parent('.song').removeClass("track_active");
        let nextTrack = $(parentSong).next().addClass("track_active");
        x = nextTrack[0].children[0];
        recursive(x);
    })
    $('#back').on('click', function(){
        let parentSong = $(x).parent('.song').removeClass("track_active");
        let prevTrack = $(parentSong).prev().addClass("track_active");
        x = prevTrack[0].children[0];
        recursive(x);
    })
});
$('.playlist-header').on('click', function (e) {
    let x = e.target;
    (GenresImgAuthor.src===x.src )?$(".genre_container").fadeToggle():$(".genre_container").fadeOut();
    GenresImgAuthor.src = x.src;
    let arrImgLink = x.src.split("/");
    let arrImg = arrImgLink[arrImgLink.length - 1].split('.');
    let bioKey = arrImg[0]
    biograthyContainer.innerText = arrJSONbio[bioKey];
});
$('.genres-btn').on('click', function(){
    $(".genre_container").toggle("slow");
})
$('#pause').on('click', function(){
    currentTrack.pause();
    $('#pause').hide();
    $('#play').show();
})
$('#play').on('click', function(){
    currentTrack.play();
    $('#pause').show();
    $('#play').hide();
})
currentTrack.addEventListener('timeupdate', ShowCurrenTimeSong);
let volume = document.getElementById('start');
volume.addEventListener("change", changeVolume);

function changeVolume() {
  currentTrack.volume= (+volume.value);
}
function ShowCurrenTimeSong() {
    var currentTimeSong = currentTrack.currentTime;
    var time = document.getElementsByClassName('time')[0];
    var min=0; 
    var sec = currentTimeSong;
    var progBar = document.getElementsByClassName('progress-bar-fill')[0];
    var curMin=Math.floor(sec/60);
    var curSec=Math.floor(sec%60);
    time.innerText =curMin+':'+('0'+curSec).slice(-2);
    if (progBar.style.width!= 100) {progBar.style.width=(currentTimeSong/currentTrack.duration*100)
        +'%'}
}


















