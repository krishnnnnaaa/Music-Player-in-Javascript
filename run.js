song = document.querySelector('.title');
artist = document.querySelector('.artist');
album = document.querySelector('.album');
prev = document.getElementById('prev');
next = document.getElementById('next');
let darkmode = document.querySelector('.darkmode')
body = document.querySelector('body')
album = document.querySelector('.album');
const music = document.getElementById('sound')
const play = document.getElementById('play')
const like = document.querySelector('#like')
const playlist = document.querySelector('#playlist')
const frame = document.querySelector('.frame')
const fMenu = document.querySelector('.fMenu')
const folder = document.getElementsByClassName('.folder')
const info = document.querySelector('#info')
const mode = document.querySelector('#mode')
const close = document.querySelector('#close')
progress = document.querySelector('#progress');
progressLine = document.querySelector('#progress-line');
let totalDuration = document.getElementById("f-progress");
let current_time = document.getElementById("i-progress");
let leftBack = document.getElementById("remain-progress");
let letter = document.getElementById("letter");
let vbar = document.getElementById("vbar");
let firsthold = document.getElementById("firsthold");
let volume = document.getElementById("volume");
down = document.getElementById('down')
playNav = document.getElementById('playNav')
center = document.querySelector('.center')


times = setInterval(progress_grace, 1000);

center.style.display = 'none'
leftBack.style.display = 'none';
vbar.style.display = 'none';



// Song list

const list = [
    {
        name: "Despacito by J.Fla",
        title: "Despacito",
        Artist: "Jfla",
        album: "Despacito",
        Duration: '02:42'
    },
    {
        name: "Off My Face by J.Fla",
        title: "Off My Face",
        Artist: "Jfla",
        album: "Off My Face",
        Duration: '02:13'
    },
    {
        name: "Perfect Strangers by J.Fla",
        title: "Perfect Strangers",
        Artist: "Jfla",
        album: "Perfect Strangers",
        Duration: '02:39'
    },
    {
        name: "Shape Of You by J.Fla",
        title: "Shape Of You",
        Artist: "Jfla",
        album: "Shape Of You",
        Duration: '02:53'
    },
    {
        name: "Attention by J.Fla",
        title: "Attention",
        Artist: "Jfla",
        album: "Attention",
        Duration: '02:35'
    }
]

const loadSong = (list) => {
    song.textContent = list.title;
    artist.textContent = list.Artist;
    music.src = "songs/" + list.name + ".mp3";
    album.src = "imgs/" + list.album + ".jpg";
    info.setAttribute('title',
        `Title: ${list.title}
Artist: ${list.Artist}
Album: ${list.album}
Duration: ${list.Duration}`)
    like.classList.replace("fa-heart", "fa-heart-o");
    like.style.color = 'black';
}

songIndex = 0;
const nextSong = () => {
    songIndex = (songIndex + 1) % list.length;
    loadSong(list[songIndex]);
    pauseMusic();
}
const prevSong = () => {
    songIndex = (songIndex - 1 + list.length) % list.length;
    loadSong(list[songIndex]);
    pauseMusic();
}

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);


let isLiked = false;
const liked = () => {
    isLiked = true;
    like.classList.replace("fa-heart-o", "fa-heart");
    like.style.color = 'red';
}
const unliked = () => {
    isLiked = false;
    like.classList.replace("fa-heart", "fa-heart-o");
    like.style.color = 'black';
}
like.addEventListener("click", () => {
    if (isLiked) {
        unliked();
    } else {
        liked();
    }
})
let isOpened = false;
const unOpen = () => {
    isOpened = true;
    playlist.style.color = 'blue';
}
const Open = () => {
    isOpened = false;
    playlist.style.color = 'black';
}
playlist.addEventListener("click", () => {
    if (isOpened) {
        Open();
    } else {
        unOpen();
    }
})

let isToggled = false;
const notoggle = () => {
    isToggled = true;
    mode.style.color = 'blue';
    body.classList.add('darkmode')
}
const toggle = () => {
    isToggled = false;
    mode.style.color = 'black';
    body.classList.remove('darkmode')
}
mode.addEventListener("click", () => {
    if (isToggled) {
        toggle();
    } else {
        notoggle();
    }
})



// For controlling audio

let isPlaying = false;
const pauseMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
}
const playMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
}
play.addEventListener("click", () => {
    if (isPlaying) {
        playMusic();
    }
    else {
        pauseMusic();
    }
});



// For update time according to song

music.addEventListener("timeupdate", (event) => {
    const { currentTime, duration } = event.srcElement;

    // Total duration update
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let tot_Duration = `0${min_duration}:${sec_duration}`;

    // Current duration update
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);






    if (sec_currentTime < 10) {
        let tot_currentTime = `${min_currentTime}:0${sec_currentTime}`;
        current_time.textContent = tot_currentTime;
    }
    else {
        let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
        current_time.textContent = tot_currentTime;
    }


    let remainTime = (duration - currentTime);
    let lTime = Math.floor(remainTime / 60);
    let rTime = Math.floor(remainTime % 60);
    leftback = `${lTime}: ${rTime}`;

    if (duration) {
        totalDuration.textContent = tot_Duration;
        leftBack.textContent = leftback;
    }

    if (rTime < 10) {
        leftback = `-${lTime}: 0${rTime}`;
        leftBack.textContent = leftback;
    }
    else {
        leftback = `-${lTime}: ${rTime}`;
        leftBack.textContent = leftback;
    }

    totalDuration.addEventListener("click", function () {
        totalDuration.style.display = ('none')
        leftBack.style.display = ('block')
    })
    leftBack.addEventListener("click", function () {
        totalDuration.style.display = ('block')
        leftBack.style.display = ('none')
    })

    // console.log(sec_currentTime);
})


function volume_change() {
    music.volume = vbar.value / 100;
    let volumeto = vbar.value;
    if (volumeto < 50) {
        volume.classList.replace("fa-volume-up", "fa-volume-down")
    }
    if (volumeto > 50) {
        volume.classList.replace("fa-volume-down", "fa-volume-up")
    }
    if (volumeto == 0) {
        volume.classList.replace("fa-volume-down", "fa-volume-off")
    }
    if (volumeto > 0 && volumeto < 50) {
        volume.classList.replace("fa-volume-off", "fa-volume-down")
    }
    if (volumeto > 0 && volumeto > 50) {
        volume.classList.replace("fa-volume-off", "fa-volume-up")
    }
}



isMute = false;
let halfMute = false;
const unMute = () => {
    music.volume = 0.0;
    isMute = true;
    volume.classList.replace("fa-volume-up", "fa-volume-off")
}
const mute = () => {
    isMute = false;
    volume.classList.replace("fa-volume-off", "fa-volume-up")
    music.volume = vbar.value / 100;
}
const locateMute = () => {
    halfMute = true;
    volume.classList.replace("fa-volume-down", "fa-volume-off")
    music.volume = 0.0;
}
const hMute = () => {
    halfMute = false;
    music.volume = vbar.value / 100;
    volume.classList.replace("fa-volume-off", "fa-volume-down")
}
function mute_sound() {
    if (isMute) {
        mute();
    }
    else {
        unMute();
    }
    if (halfMute) {
        hMute();
    }
    else {
        locateMute();
    }
}

let isClicked = false;
const notoggled = () => {
    isClicked = true;
    vbar.style.display = 'none';
}
const toggled = () => {
    isClicked = false;
    vbar.style.display = 'block';
}
volume.addEventListener("click", function () {
    if (isClicked) {
        toggled();
    }
    else {
        notoggled();
    }
})



function music_change() {
    let progress_position = music.duration * (progress.value / 100);
    music.currentTime = progress_position;
}
function progress_grace() {
    let position = 0;

    if (music.duration != isNaN) {
        position = music.currentTime * (100 / music.duration);
        progress.value = position;
    }
}


let goDown = false;
const tDown = () => {
    goDown = true;
    down.classList.replace("fa-angle-up", "fa-angle-down");
    playNav.style.top = '80px';
    playNav.style.borderBottomLeftRadius = '0';
    playNav.style.borderBottomRightRadius = '0';
    center.style.display = 'block';
}
const noTDown = () => {
    goDown = false;
    down.classList.replace("fa-angle-down", "fa-angle-up");
    playNav.style.top = '428px';
    playNav.style.borderBottomLeftRadius = '40px';
    playNav.style.borderBottomRightRadius = '40px';
    center.style.display = 'none';
}

function toggle_down() {
    if (goDown) {
        noTDown();
    } else {
        tDown();
    }
}

music.addEventListener("ended", function () {
    current_time.textContent = '0:00';
    totalDuration.style.display = ('block')
    leftBack.style.display = ('none')
    play.classList.replace("fa-pause", "fa-play")
})
