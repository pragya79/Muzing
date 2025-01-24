let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrl = document.getElementById('ctrl');
let songName = document.getElementById('song-name');
let singerName = document.getElementById('singer-name');
let volumeControl = document.getElementById('volume');
let muteBtn = document.getElementById('mute');
let shuffleBtn = document.getElementById('shuffle');
let repeatBtn = document.getElementById('repeat');

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

// Load metadata and update progress
song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

// Update progress bar as the song plays
setInterval(() => {
    progress.value = song.currentTime;
}, 200);

// Play or pause functionality
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

// Change progress manually
progress.onchange = function() {
    song.currentTime = progress.value;
};

// Change volume
volumeControl.addEventListener('input', function() {
    song.volume = volumeControl.value / 100;
});

// Mute/unmute functionality
muteBtn.addEventListener('click', function() {
    song.muted = !song.muted;
    muteBtn.textContent = song.muted ? "Unmute" : "Mute";
});

// Shuffle functionality
shuffleBtn.addEventListener('click', function() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
});

// Repeat functionality
repeatBtn.addEventListener('click', function() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active');
});

// Previous song
document.getElementById('prev').addEventListener('click', function() {
    currentSongIndex = isShuffle ? getRandomIndex() : (currentSongIndex - 1 + songs.length) % songs.length;
    changeSong(currentSongIndex);
});

// Next song
document.getElementById('next').addEventListener('click', function() {
    currentSongIndex = isShuffle ? getRandomIndex() : (currentSongIndex + 1) % songs.length;
    changeSong(currentSongIndex);
});

// Change song
function changeSong(index) {
    song.src = songs[index];
    updateSongDetails(index);
    song.load();
    song.play();
}

// Update song details
function updateSongDetails(index) {
    songName.textContent = songData[index].song;
    singerName.textContent = songData[index].singer;
    document.getElementById('song-image').src = songData[index].image;
}

// Get random song index for shuffle
function getRandomIndex() {
    return Math.floor(Math.random() * songs.length);
}

// Play next song when the current one ends
song.addEventListener('ended', function() {
    if (isRepeat) {
        song.currentTime = 0;
        song.play();
    } else {
        document.getElementById('next').click();
    }
});

// Display playlist
let playlist = document.querySelector('.playlist');
songs.forEach((song, index) => {
    let listItem = document.createElement('li');
    listItem.textContent = songData[index].song;
    listItem.addEventListener('click', () => changeSong(index));
    playlist.appendChild(listItem);
});

// WaveSurfer setup
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

// Load the initial song
changeSong(currentSongIndex);

