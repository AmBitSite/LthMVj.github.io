window.onload = ()=>{
   $('.nav').hide();
    $('.content').hide(); 
};
function hideLoginPage(){
    $(".contain" ).hide("slow");
    $(".nav" ).show("slow");
    $(".content").show("slow");
    $('.content-menu').show('slow');
}
$(function(){
    let step = '',
        text = $('#loading').text()
    function changeStep(){
        $('#loading').text(text +step)
        if(step == '...'){step = ''} else {step += '.'};
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
    navBar = document.querySelector('.nav'),
    btnOut = document.querySelector('.nav__out'),
    playlistHeader = document.querySelector('.playlist-info__track'),
    playListImg,
    arrJSONimg=[],
    arrJSONsingers = [],
    arrJSONbio = [],
    PlayListImgAuthor = document.querySelector('.playlist-song-img'),
    currentTrack = document.getElementById('myAudio'),
    GenresImgAuthor = document.querySelector('.biography-img'),
    biograthyContainer = document.querySelector('.biography-text');

$(".nav__name").text(localStorage.key(localStorage.length-1));

$('.contain').on('keydown', (e)=>{
    let arrlogin = login.value.split('');
    if(e.keyCode == 13){
        if((arrlogin.length>=2)&&(arrlogin.length<=10)){
            $(".nav__name").text(login.value);
            hideLoginPage();
            let user = login.value;
            if(typeof localStorage[user] !== "undefined"){
                setTimeout(function(){
                    alert('Hello again ' + `${user}`);
                }, 1000);
            }
            else{localStorage.setItem(login.value, "1");}
        }
        else alert('Имя должно содержать не менее двух и не более десяти символов, Asshole...');
    };
});
btnOut.addEventListener('click', ()=>{
    $(".nav" ).hide( "slow");
    $(".contain" ).show( "slow");
    $(".content").hide("slow");
    login.value = '';
});
$(function(){
    $.getJSON('json/only_genres.json', function(data) {  
        let template=$('#genre__tpl').html();
        let info=Mustache.render(template,data);
        $('#for_genres').html(info);
    });
})
function firstTrackToList(){
    playlistHeader.innerText = document.querySelector('.playlist-songs-name').innerText;
        let arrStrSong = playlistHeader.innerText.split('-');
        document.querySelector('.song').classList.add("track_active");
        playListImg = arrStrSong[arrStrSong.length-1];
        PlayListImgAuthor.src = arrJSONimg[playListImg];
        currentTrack.src = document.querySelector(".track_active").children[0].dataset.value;
        document.getElementById('back').setAttribute('disabled', 'disabled')
}
$(function(){
    $.getJSON('json/ALL.json', function(data) {
        arrJSONimg = data.img;
        arrJSONsingers = data.singers;
        arrJSONbio = data.bio;
        let template=$('#song__tpl').html();
        let info=Mustache.render(template, data);
        $('#for_song-container').html(info);
        firstTrackToList();
    });
});
let genre='ALL';
$('.carousel-inner').on('click', function(e){
    genre = e.target.innerText;
    getGenre (compareNameFromAZ);
    currentTrack.load();
    $('#pause').hide();
    $('#play').show();
});
function getGenre(typeOfSort){
        $.getJSON('json/'+genre+'.json', function(data) { 
        data.singers.sort(typeOfSort); 
            let template = $('#song__tpl').html();
            let info = Mustache.render(template, data);
            $('#for_song-container').html(info);
            removeblockBtn();
            firstTrackToList();
        });
    };

function nextTrack(){
    let currentTrackParent = document.querySelector('.track_active');
    let parentSong = currentTrackParent.nextElementSibling;
    if(parentSong!==null){
        currentTrackParent.classList.remove('track_active');
        parentSong.classList.add('track_active');
        track = parentSong.children[0];
        recursive(track);
        }
    else{document.getElementById('forward').setAttribute('disabled', 'disabled')}
}
function recursive(track){
    playlistHeader.innerText = track.innerText;
    let arrStrSong = playlistHeader.innerText.split('-');
    playListImg = arrStrSong[arrStrSong.length-1];
    PlayListImgAuthor.src = arrJSONimg[playListImg];
    currentTrack.src = track.dataset.value;
    currentTrack.play();
    $('#play').hide();
    $('#pause').show();
};
function removeblockBtn(){
    document.getElementById('back').removeAttribute('disabled');
    document.getElementById('forward').removeAttribute('disabled');
}
$(currentTrack).on('ended',function(){
        nextTrack();
        $('#pause').hide();
        $('#play').show();
});
$('.playlist-songs').on('click', function(e){
    let track = e.target;
    if(track.children.length==0){
        $('.song').removeClass("track_active");
        $(track).parent('.song').addClass("track_active");
        let currentTrackParent = document.querySelector('.track_active');
        if(currentTrackParent.previousElementSibling==null){
            document.getElementById('back').setAttribute('disabled', 'disabled');
        }
        else if(currentTrackParent.previousElementSibling!==null){
            document.getElementById('back').removeAttribute('disabled');
        }
        document.getElementById('forward').removeAttribute('disabled');
        recursive(track);
    };
});
$('#forward').on('click', function(){
    document.getElementById('back').removeAttribute('disabled', 'disabled');
    nextTrack()});
$('#back').on('click', function(){
    removeblockBtn();
    let currentTrackParent = document.querySelector('.track_active');
    let prevParent = currentTrackParent.previousElementSibling;
    let prevPrevParent = prevParent.previousElementSibling;
        currentTrackParent.classList.remove('track_active');
        prevParent.classList.add('track_active');
        track = prevParent.children[0];
        recursive(track);
    if(prevPrevParent== null){document.getElementById('back').setAttribute('disabled', 'disabled')}
});
$('#pause').on('click', function(){
    currentTrack.pause();
    $('#pause').hide();
    $('#play').show();
});
$('#play').on('click', function(){
    currentTrack.play();
    $('#pause').show();
    $('#play').hide();
    document.getElementById('forward').removeAttribute('disabled');
});
$('.playlist-header').on('click', function (e) {
    let x = e.target;
    if(x = document.querySelector('.playlist-song-img')){
        (GenresImgAuthor.src===x.src )?$(".bio_container").fadeToggle():$(".genre_container").fadeOut();
        GenresImgAuthor.src = x.src;
        let arrImgLink = x.src.split("/");
        let arrImg = arrImgLink[arrImgLink.length - 1].split('.');
        let bioKey = arrImg[0]
        biograthyContainer.innerText = arrJSONbio[bioKey];
    }
});
$('.close-bio').on('click', function(){
    $(".bio_container").fadeToggle("slow");
});
$('.genres-btn').on('click', function(){
    $(".genre_container").fadeToggle("slow");
    $(".bio_container").fadeToggle("slow");
});
currentTrack.addEventListener('timeupdate', ShowCurrenTimeSong);
let volume = document.getElementById('start');
volume.addEventListener("change", changeVolume);
function changeVolume() {
  currentTrack.volume= (+volume.value);
};
function ShowCurrenTimeSong() {
    let currentTimeSong = currentTrack.currentTime;
    let time = document.getElementsByClassName('time')[0];
    let min=0; 
    let sec = currentTimeSong;
    let progBar = document.getElementsByClassName('progress-bar-fill')[0];
    let prog = document.getElementsByClassName('progress-bar')[0];
    let curMin=Math.floor(sec/60);
    let curSec=Math.floor(sec%60);
    time.innerText =curMin+':'+('0'+curSec).slice(-2);
      if (progBar.style.width!= 100) {progBar.style.width=(currentTimeSong/currentTrack.duration*100)+'%';
     prog.style.width=100-((currentTimeSong/currentTrack.duration*100))+'%'
  };
};
document.querySelector('.progress-bar').addEventListener('click', timeSongChangePlus);
document.querySelector('.progress-bar-fill').addEventListener('click', timeSongChangeMinus);
function timeSongChangeMinus () {
currentTrack.currentTime = currentTrack.currentTime-10;
};
function timeSongChangePlus () {
currentTrack.currentTime = currentTrack.currentTime+10;
};

function compareNameFromAZ(a,b) {
    if (a.name<b.name) return -1;
    if (a.name>b.name) return 1;
    return 0;
}
function compareNameFromZA(a,b) {
    if (a.name<b.name) return 1;
    if (a.name>b.name) return -1;
    return 0;
}
function compareNameShuffle(a,b) {
    if (a.name<b.name) return Math.random() - 0.5;
    
}
let sortingSongs = document.querySelectorAll('.sortOf');
for (let i=0; i < sortingSongs.length; i++) {
    sortingSongs[i].addEventListener('change', chooseSort);
}
function chooseSort () {
  let typeOfSort;
if    (document.querySelectorAll('.sortOf')[0].value==0) {
    getGenre (compareNameFromAZ) }
 else if (document.querySelectorAll('.sortOf')[0].value==1) {
getGenre (compareNameFromZA); }
else if (document.querySelectorAll('.sortOf')[0].value==2) {
getGenre (compareNameShuffle); }
}
