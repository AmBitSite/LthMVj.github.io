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
    $.getJSON('json/only_genres.json', function(data) {  
        let template=$('#genre__tpl').html();
        let info=Mustache.render(template,data);
        $('#for_genres').html(info)
    })
})
$(function(){
    $.getJSON('json/data.json', function(data) {
        arrJSONimg = data.img;
        arrJSONsingers = data.singers;
        arrJSONbio = data.bio;
        let template=$('#song__tpl').html();
        let info=Mustache.render(template, data);
        $('#for_song-container').html(info);
        playlistHeader.innerText = document.querySelector('.playlist-songs-name').innerText;
        let arrStrSong = playlistHeader.innerText.split('-');
        document.querySelector('.song').classList.add("track_active");
        playListImg = arrStrSong[arrStrSong.length-1];
        PlayListImgAuthor.src = arrJSONimg[playListImg];
    })
})
$('.carousel-inner').on('click', function(e){
    let x = e.target;
    $(function(){
        $.getJSON('json/'+x.innerText+'.json', function(data) {  
            arrJSON = data.img;
            arrJSONbio = data.bio;
            let template = $('#song__tpl').html();
            let info = Mustache.render(template, data);
            $('#for_song-container').html(info);
        })
    })
});

$('.playlist-songs').on('click', function(e){
    var track = e.target;
    function remuveClassActive(){
        $(".track_active").removeClass("track_active");
    };
    $('.song').removeClass("track_active");
    $(track).parent('.song').addClass("track_active");
    $(".song").click(function() {
        remuveClassActive();
        $(this).addClass("track_active");
    });
    function recursive(){
        playlistHeader.innerText = track.innerText;
        let arrStrSong = playlistHeader.innerText.split('-');
        playListImg = arrStrSong[arrStrSong.length-1];
        PlayListImgAuthor.src = arrJSONimg[playListImg];
        currentTrack.src = track.dataset.value;
        currentTrack.play();
        $('#play').hide();
        $('#pause').show();
        $(currentTrack).on('ended',function(){
            let parentSong = $(track).parent('.song').removeClass("track_active");
            let nextTrack = $(parentSong[0]).next().addClass("track_active");
            track = nextTrack[0].children[0];
            recursive(track);
        });
    };
    recursive();
    $('#forward').on('click', function nextTrack(){
         remuveClassActive();
        let parentSong = $(track).parent('.song').removeClass("track_active");
        let nextTrack = $(parentSong).next().addClass("track_active");
        track = nextTrack[0].children[0];
        recursive(track);
    });
    $('#back').on('click', function(){
        remuveClassActive();
        let parentSong = $(track).parent('.song').removeClass("track_active");
        let prevTrack = $(parentSong).prev().addClass("track_active");
        track = prevTrack[0].children[0];
        recursive(track);
    });
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
$('.close-bio').on('click', function(){
    $(".genre_container").fadeToggle("slow");
})
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


















