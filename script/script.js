
var myPlayList = document.getElementById("myAudio");
var buttonPlay = document.getElementById('play');
var buttonPause = document.getElementById('pause');
var buttonForward = document.getElementById('forward');
var buttonBack = document.getElementById('back');
var volume = document.getElementById('start');
var numberOfTrack = 0;
buttonBack.disabled = true;
buttonPlay.addEventListener("click", playAudio);
buttonPause.addEventListener("click", pauseAudio);
buttonForward.addEventListener("click", forwardSong);
buttonBack.addEventListener("click", backSong);
myPlayList.addEventListener("play", hideButtonPlay);
myPlayList.addEventListener("pause", hideButtonPause);
volume.addEventListener("change", changeVolume);
myPlayList.addEventListener('timeupdate', ShowCurrenTimeSong);

var playlist = ["music/Scorpions-Wing_of_change.mp3", "music/Scorpions-Stll_Loving_You_Scorpions.mp3", "music/Scorpions-Send_Me_An_Angel.mp3",
"music/Scorpions-Humanity.mp3", "music/Imagine-Dragons-Believer.mp3", "music/Imagine-Dragons-Natural.mp3", "music/Imagine-Dragons-Thunder.mp3", 
"music/Imagine-Dragons-Radioactive.mp3"];
myPlayList.src = playlist[0];

function ShowCurrenTimeSong() {
    var currentTimeSong = myPlayList.currentTime;
    var time = document.getElementsByClassName('time')[0];
    var min=0; 
    var sec = currentTimeSong;
    var progBar = document.getElementsByClassName('progress-bar-fill')[0];
    if (progBar.style.width!= 100) {progBar.style.width=(currentTimeSong/myPlayList.duration*100)
        +'%'};
    var curMin=Math.floor(sec/60);
    var curSec=Math.floor(sec%60);
    time.innerText =curMin+':'+('0'+curSec).slice(-2);
}

function changeVolume() {
   myPlayList.volume= (+volume.value);
}

function playAudio() {
    myPlayList.play();
}

function pauseAudio() {
    myPlayList.pause();
}

function forwardSong() {
    buttonBack.disabled = false;
    myPlayList.pause();
    numberOfTrack++;
    console.log(numberOfTrack);
    myPlayList.src = playlist[numberOfTrack];
    myPlayList.play();
    if ((numberOfTrack + 1) == playlist.length) {
        buttonForward.disabled = true;
    }
}

function backSong() {
    buttonForward.disabled = false;
    myPlayList.pause();
    numberOfTrack--;
    console.log(numberOfTrack);
    myPlayList.src = playlist[numberOfTrack];
    myPlayList.play();
    if (numberOfTrack == 0) {
        buttonBack.disabled = true;
    }
}

function hideButtonPlay() {
    buttonPlay.style.display = 'none';
    buttonPause.style.display = 'inline-block';
}

function hideButtonPause() {
    buttonPlay.style.display = 'inline-block';
    buttonPause.style.display = 'none';
}

function loadtypeOfMusic(typeOfMusic) {
    parsedTypeOFMusic = JSON.parse(typeOfMusic);
    var templat = $('#templates').html();
    var rendered = Mustache.render(templat, parsedTypeOFMusic);
    $('#songs').html(rendered);

}
loadtypeOfMusic(rock);
var listOfSongs = document.getElementById('songs').querySelectorAll('li');
var playingSong = document.getElementsByClassName('listening_song')[0];
for (i = 0; i < listOfSongs.length; i++) {
    listOfSongs[i].addEventListener("click", chooseSong);
}

function chooseSong() {
    buttonForward.disabled = false;
    buttonBack.disabled = false;
    var clickedSong = event.target.innerText;
    playingSong.innerText = clickedSong;
    console.log(playingSong.innerText);
    //var numtrack;
    for (let i = 0; i < parsedTypeOFMusic.rock.length; i++) {
        if (parsedTypeOFMusic.rock[i] == playingSong.innerText) {
            numberOfTrack = i;
        }
    }
    myPlayList.src = playlist[numberOfTrack];
    console.log(numberOfTrack);
    playAudio();

    if ((numberOfTrack + 1) == playlist.length) {
        buttonForward.disabled = true;
        buttonBack.disabled = false;
    }
    if (numberOfTrack == 0) {
        buttonBack.disabled = true;
    }
}