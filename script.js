let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrl = document.getElementById('ctrl');
let songName = document.getElementById('song-name');
let singerName = document.getElementById('singer-name');


let currentSongIndex = 0;
let isShuffle = false;
let isRepeat = false;

let songs = [
    "./songs/Cruel Summer.mp3",
    "./songs/Tum Se Hi.mp3",
    "./songs/Shayad.mp3",
    "./songs/Kill Em With Kindness.mp3",
    "./songs/Hold On.mp3"
];

let songData = [
    { song: "Cruel Summer", singer: "Taylor Swift", image: "/images/lover.jpg" },
    { song: "Tum Se Hi", singer: "Mohit Chauhan", image: "/images/tumsehi.jfif" },
    { song: "Shayad", singer: "Arijit Singh", image: "/images/shayad.jpg" },
    { song: "Kill 'em with kindness", singer: "Selena Gomez", image: "/images/selena.jpg" },
    { song: "Hold On", singer: "Chord Overstreet", image: "/images/tvd.jpg" }
];

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

setInterval(() => {
    progress.value = song.currentTime;
}, 200);

function playPause() {
    if (ctrl.classList.contains("fa-pause")) {
        song.pause();
        ctrl.classList.remove("fa-pause");
        ctrl.classList.add("fa-play");
    } else {
        song.play();
        ctrl.classList.add("fa-pause");
        ctrl.classList.remove("fa-play");
    }
}

progress.onchange = function() {
    song.currentTime = progress.value;
};


document.getElementById('prev').addEventListener('click', function() {
    currentSongIndex = isShuffle ? getRandomIndex() : (currentSongIndex - 1 + songs.length) % songs.length;
    changeSong(currentSongIndex);
});

document.getElementById('next').addEventListener('click', function() {
    currentSongIndex = isShuffle ? getRandomIndex() : (currentSongIndex + 1) % songs.length;
    changeSong(currentSongIndex);
});

function changeSong(index) {
    song.src = songs[index];
    song.currentTime = 0;
    song.load();
    song.play();
    updateSongDetails(index);
}

function updateSongDetails(index) {
    songName.textContent = songData[index].song;
    singerName.textContent = songData[index].singer;
    document.getElementById('song-image').src = songData[index].image;
}

function getRandomIndex() {
    return Math.floor(Math.random() * songs.length);
}

song.addEventListener('ended', function() {
    if (isRepeat) {
        song.currentTime = 0;
        song.play();
    } else {
        document.getElementById('next').click();
    }
});


var wavesurfer = WaveSurfer.create({
    container: '#waveforms',
    waveColor: 'silver',
    progressColor: 'blue',
    barWidth: 4,
    responsive: true,
    height: 90,
    barRadius: 4
});

wavesurfer.on('ready', function() {
    wavesurfer.play();
});

changeSong(currentSongIndex);
