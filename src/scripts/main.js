
import ExternalServices from "./ExternalServices.mjs";

const baseURL = import.meta.env.VITE_IMDB_API_URL;

// Function to fetch and display the top movies
async function displayTopMovies() {
    try {
        const api = new ExternalServices();
        const movies = await api.getTopMovies();
        const movieList = document.getElementById("movie-card-list");
        movieList.innerHTML = ""; // Clear the list before rendering

        movies.slice(0, 10).forEach(movie => {
            const listItem = document.createElement("li");

            // Create the item and make it a link to access details
            const link = document.createElement("a");
            link.href = `/detail-pages/index.html?type=movie&id=${movie.id}`; // URL to details page
            link.textContent = `${movie.rank}. ${movie.title} (${movie.year})`;

            // Append to the list
            listItem.appendChild(link);
            movieList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Failed to display movies:", error);
    }
}

// Function to fetch and display the top series
async function displayTopSeries() {
    try {
        const api = new ExternalServices();
        const series = await api.getTopSeries();
        const seriesList = document.getElementById("series-card-list");
        seriesList.innerHTML = ""; // Clear the list before rendering

        series.slice(0, 10).forEach(serie => {
            const listItem = document.createElement("li");

            // Create the item and make it a link to access details
            const link = document.createElement("a");
            link.href = `/detail-pages/index.html?type=series&id=${serie.id}`; // URL to details page
            link.textContent = `${serie.rank}. ${serie.title} (${serie.year})`;

            // Append to the list
            listItem.appendChild(link);
            seriesList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Failed to display series:", error);
    }
}

// Function to handle search functionality
async function handleSearch() {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
    if (!searchInput) {
        // If search input is empty, fetch and display top movies and series again
        displayTopMovies();
        displayTopSeries();
        return;
    }

    try {
        const api = new ExternalServices();
        
        // Fetch full data from both movies and series endpoints
        const allMovies = await api.getFullMovieList(); // Get full movie list
        const allSeries = await api.getFullSeriesList(); // Get full series list

        // Filter movies and series based on the search input
        const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(searchInput));
        const filteredSeries = allSeries.filter(serie => serie.title.toLowerCase().includes(searchInput));

        // Render filtered movies and series
        renderSearchResults(filteredMovies, "movie-card-list");
        renderSearchResults(filteredSeries, "series-card-list");

        // Show "Back to Top 10" button
        document.getElementById("back-to-top-button").style.display = "inline-block";
    } catch (error) {
        console.error("Search failed:", error);
    }
}

// Utility function to render search results
function renderSearchResults(items, listId) {
    const list = document.getElementById(listId);
    list.innerHTML = ""; // Clear the list before rendering

    if (items.length === 0) {
        const noResults = document.createElement("li");
        noResults.textContent = "No results found.";
        list.appendChild(noResults);
    } else {
        items.slice(0, 10).forEach(item => {
            const listItem = document.createElement("li");

            // Create the item and make it a link to access details
            const link = document.createElement("a");
            link.href = `/detail-pages/index.html?type=${listId === "movie-card-list" ? "movie" : "series"}&id=${item.id}`;
            link.textContent = `${item.rank}. ${item.title} (${item.year})`;

            // Append to the list
            listItem.appendChild(link);
            list.appendChild(listItem);
        });
    }
}

// Attach event listener for search button
document.getElementById("search-button").addEventListener("click", handleSearch);

// Event listener for "Back to Top 10" button
document.getElementById("back-to-top-button").addEventListener("click", () => {
  // Clear the current search results
  document.getElementById("movie-card-list").innerHTML = "";
  document.getElementById("series-card-list").innerHTML = "";

  // Fetch and display top 10 movies and series again
  displayTopMovies();
  displayTopSeries();

  // Hide the "Back to Top 10" button
  document.getElementById("back-to-top-button").style.display = "none";
});

// Initial fetch and display of top movies and series
displayTopMovies();
displayTopSeries();
