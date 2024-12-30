var Config = {};
var videoId = Config.videoId;

var pedaljebanypiesczarny = document.createElement("script");
pedaljebanypiesczarny.src = "https://www.youtube.com/iframe_api";

var GramNaSkryptach = document.getElementsByTagName("script")[0];
GramNaSkryptach.parentNode.insertBefore(pedaljebanypiesczarny, GramNaSkryptach);

var player;
var videoIds = [
    "i_yftYJVD38", // VKIE - 120 WERSÓW ŻEBY ZAJE*AĆ CO WASZE (prod. LIL SANTIAGO) [🎥: xawito]
    "KIdhs0Is2Kg", // YUNG ADISZ - CZAS MI MIJA (prod. demod)
    "n7v7MxiCFQY", // Chief Keef - Miód Malina
    "0YGulBeqt2I", // Chief Keef - Pragnienie Milosci
    "bPtuJf-n3Is", // SD x FREDO SANTANA x LIL REESE - Tańcz Tańcz
    "bz6_ejUQyTQ", // CHADA - CIĘŻKI PRZEKAZ 𝕵𝟞𝕶𝟡𝕽 𝕭𝕷𝕰𝕹𝕯
]; 

var skippedVideoIds = [];
var isMusicSkipped = false;

function PozdroNutkaXDDD(videoId) {
var apiKey = "AIzaSyAeIshuYudEVctNr3BY-A2yB7xQoeNFxp0";
var apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.items.length > 0) {
            var videoTitle = data.items[0].snippet.title;
            document.getElementById("SongName").textContent = videoTitle;
        }
    })
}

function skipMusic() {
    if (isMusicSkipped) {
        console.log("Muzyka jest już pominięta.");
        return;
    }

    player.stopVideo();
    isMusicSkipped = true;
    skippedVideoIds.push(videoId);
    onYouTubeIframeAPIReady();
}

function onYouTubeIframeAPIReady() {
    var randomIndex = Math.floor(Math.random() * videoIds.length);
    videoId = videoIds[randomIndex];
    console.log(videoId)

    PozdroNutkaXDDD(videoId);

    player = new YT.Player("PedalskiFilmik", {
        videoId: videoId,
        playerVars: {
            "playlist": videoId,
            "autoplay": 1,
            "controls": 0,
            "disablekb": 1,
            "enablejsapi": 1,
            "loop": 1,
            "vq": "highres"
        },
        events: {
            "onReady": onStart,
            "onError": onError
        }
    });

    document.getElementById("SkipButton").addEventListener("click", skipMusic);
}

var GownoCoZmieniaszGlosnosc = document.getElementById("GownoCoZmieniaszGlosnosc");

function onStart(event) {
    var defaultVolume = localStorage.getItem(`GownoCoZmieniaszGlosnosc-${videoId}`) || 25
    event.target.setVolume(defaultVolume);
    event.target.setPlaybackQuality("highres");
    event.target.playVideo();
    GownoCoZmieniaszGlosnosc.setAttribute("value", defaultVolume);
    onVolume();
    GownoCoZmieniaszGlosnosc.addEventListener("input", onVolume, false);
}

(function () {
    var words = [
        "Oferujemy zaawansowany departament policji w którym będziesz mógł się szkolić oraz także dobrze rozwinięty zawód mechanika w którym będziesz mógł specjalizować się przerabianiem różnorodnych pojazdów",
        "Zachęcamy również spróbowania swoich sił w szeregach administracji. Jesteśmy w stanie zaoferować miłą atmosferę, wysoką aktywność oraz częste spotkania oraz miło spędzone chwilę. ",
        "Naszym głównym założeniem jest szerzenie wysokiego poziomu administracji, dbanie o dobrą reputację serwera oraz wprowadzaniem różnych umilających czas eventów.",
        "Witaj na najlepszym bojówkarskim serwerze na platformie FiveM, tutaj nauczysz się jak poprawnie używać broni oraz jak podbijać strefy i podbijać inne organizacje"
    ];
    var i = 0;

    setInterval(function () {
        $('#changemsg').fadeOut(function () {
            $(this).html(words[(i = (i + 1) % words.length)]).fadeIn();
        });
    }, 5000);
})();

function onError(event) {
    onYouTubeIframeAPIReady()
    console.log("An error occurred: " + event.data);
}

function onVolume() {
    value = GownoCoZmieniaszGlosnosc.value;
    player.setVolume(value - 1);
    localStorage.setItem(`GownoCoZmieniaszGlosnosc-${videoId}`, value);
}