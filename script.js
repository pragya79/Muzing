let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrl = document.getElementById('ctrl');
let songName = document.getElementById('song-name');
let singerName = document.getElementById('singer-name');

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

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

setInterval(() => {
    progress.value = song.currentTime;
}, 200);

progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    ctrl.classList.add("fa-pause");
    ctrl.classList.remove("fa-play");
}

let currentSongIndex = 0;
let songs = ["./songs/Cruel Summer.mp3", "./songs/Tum Se Hi.mp3", "./songs/Shayad.mp3", "./songs/Kill Em With Kindness.mp3", "./songs/Hold On.mp3"];

let previousBtn = document.getElementById('prev');
previousBtn.addEventListener('click', function() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    changeSong(currentSongIndex);
});

let nextBtn = document.getElementById('next');
nextBtn.addEventListener('click', function() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    changeSong(currentSongIndex);
});

let songData = [
    { song: "Cruel Summer", singer: "Taylor Swift", image: "/images/lover.jpg" },
    { song: "Tum Se Hi", singer: "Mohit Chauhan", image: "/images/tumsehi.jfif" },
    { song: "Shayad", singer: "Arijit Singh", image: "/images/shayad.jpg" },
    { song: "Kill 'em with kindness", singer: "Selena Gomez", image: "/images/selena.jpg" },
    { song: "Hold On", singer: "Chord Overstreet", image: "/images/tvd.jpg" },
];

function changeSong(index) {
    song.pause();
    song.src = songs[index];
    song.load();

    songName.textContent = getSongName(index);
    singerName.textContent = getSingerName(index);
    
    // Update the song image
    let imageElement = document.getElementById('song-image'); // Ensure this ID matches your HTML
    imageElement.src = getImage(index); // Update the image based on the current song

    song.play();
}

function getSongName(index) {
    return index >= 0 && index < songData.length ? songData[index].song : songData[0].song;
}

function getSingerName(index) {
    return index >= 0 && index < songData.length ? songData[index].singer : songData[0].singer;
}

function getImage(index) {
    return index >= 0 && index < songData.length ? songData[index].image : "";
}

// Show the playlist functionality (if needed)
let list = document.querySelector('#list');
function showList() {
    list.addEventListener('click', () => {
        let playlist = document.querySelector('.playlist');
        playlist.style.display = "flex";
        setTimeout(() => {
            playlist.style.opacity = 1;
        }, 0);
    });
}

// WaveSurfer setup (if needed)
var wavesurfer = WaveSurfer.create({
    container: '#waveforms',
    waveColor: 'silver',
    progressColor: 'silver',
    barWidth: 4,
    responsive: true,
    height: 90,
    barRadius: 4
});
wavesurfer.load('Hold On.mp3');
