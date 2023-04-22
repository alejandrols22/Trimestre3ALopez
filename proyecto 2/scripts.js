// Reemplaza estas variables con las tuyas
const clientId = "ce09f6f3a5d141a09528f04f5d135076";
const clientSecret = "92f58646068f4720822ff4e75c6fc87d";

const genres = [
    { id: "pop", name: "Pop" },
    { id: "rock", name: "Rock" },
    { id: "flamenco", name: "Flamenco" },
    { id: "jazz", name: "Jazz" },
    { id: "classical", name: "Clásica" },
    // Añade más géneros aquí
];

let accessToken;
let streakCount = 0;

async function getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    accessToken = data.access_token;
}

async function getSongsByGenre(genre) {
    const response = await fetch(
        `https://api.spotify.com/v1/browse/categories/${genre}/playlists?limit=1`,
        {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        }
    );

    const data = await response.json();
    const playlistId = data.playlists.items[0].id;

    const tracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        }
    );

    const tracksData = await tracksResponse.json();
    const filteredTracks = tracksData.items.filter(item => item.track.popularity > 50);

    const randomIndex1 = Math.floor(Math.random() * filteredTracks.length);
    let randomIndex2 = Math.floor(Math.random() * filteredTracks.length);

    while (randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * filteredTracks.length);
    }

    const song1 = filteredTracks[randomIndex1].track;
    const song2 = filteredTracks[randomIndex2].track;

    displaySongs(song1, song2);
}

function displaySongs(song1, song2) {
    const songContainer = $("#song-container");
    songContainer.empty();

    const songCard1 = createSongCard(song1);
    const songCard2 = createSongCard(song2);

    songCard1.on("click", () => checkAnswer(song1, song2));
    songCard2.on("click", () => checkAnswer(song2, song1));

    songContainer.append(songCard1);
    songContainer.append(songCard2);

    $("#game-container").show();
}

function createSongCard(song) {
    const songCard = $("<div>").addClass("song-card");
    const songImage = $("<img>")
        .addClass("song-image")
        .attr("src", song.album.images[0].url);
    const songTitle = $("<h3>").text(song.name);
    const songArtist = $("<p>").text(song.artists[0].name);

    songCard.append(songImage);
    songCard.append(songTitle);
    songCard.append(songArtist);

    return songCard;
}

function checkAnswer(selectedSong, otherSong) {
    if (selectedSong.popularity > otherSong.popularity) {
        const currentStreak = parseInt($("#streak-count").text(), 10);
        $("#streak-count").text(currentStreak + 1);
        alert("Respuesta correcta! Continúa jugando.");
        startGame();
    } else {
        alert("Respuesta incorrecta. Fin del juego.");
        $("#streak-count").text("0");
        $("#game-container").hide();
    }
}

function startGame() {
    console.log("Juego iniciado");
    const selectedGenre = $("#genre-select").val();
    console.log("Género seleccionado:", selectedGenre);
    getSongsByGenre(selectedGenre);
}
// Cuando el documento esté listo
$(document).ready(() => {
    // Crear opciones de género y agregarlas al elemento select
    const genreSelect = $("#genre-select");
    genres.forEach((genre) => {
        const option = $("<option>").val(genre.id).text(genre.name);
        genreSelect.append(option);
    });

    // Obtén el token de acceso
    getAccessToken();

    // Evento para comenzar el juego
    $("#start-game").on("click", startGame);
});