import ExternalServices from "./ExternalServices.mjs";

async function displayTopMovies() {
    try {
        const api = new ExternalServices; 
        const movies = await api.getTopMovies();

        const movieList = document.getElementById("movie-card-list");
        movies.slice(0, 10).forEach(movie => {
            const listItem = document.createElement("li");
            listItem.textContent = `${movie.rank}. ${movie.title} (${movie.year})`;
            movieList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Failed to display movies:", error);
    }
}

async function displayTopSeries() {
    try {
        const api = new ExternalServices; 
        const series = await api.getTopSeries();

        const seriesList = document.getElementById("series-card-list");
        series.slice(0, 10).forEach(serie => {
            const listItem = document.createElement("li");
            listItem.textContent = `${serie.rank}. ${serie.title} (${serie.year})`;
            seriesList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Failed to display series:", error);
    }
}

displayTopMovies();
displayTopSeries();