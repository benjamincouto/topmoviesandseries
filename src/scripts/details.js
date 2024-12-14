import ExternalServices from "./ExternalServices.mjs";

// Example data (you would get this from your API or main page)
const movieData = {
    title: "The Best Movie",
    description: "An amazing journey through the lives of extraordinary characters.",
    releaseDate: "2023-12-25",
    rating: "9.2/10",
    genre: "Adventure",
    poster: "best-movie.jpg" // Replace with actual image URL
};

// Populate the details page
document.getElementById("details-title").textContent = movieData.title;
document.getElementById("details-description").textContent = movieData.description;
document.getElementById("details-release-date").textContent = movieData.releaseDate;
document.getElementById("details-rating").textContent = movieData.rating;
document.getElementById("details-genre").textContent = movieData.genre;
document.getElementById("details-poster").src = movieData.poster;

// Back button functionality
document.getElementById("back-button").addEventListener("click", () => {
    window.history.back();
});
