import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// Utility to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Fetch and populate details based on the type (movie or series)
async function populateDetailsPage() {
  const id = getQueryParam("id");  // Get the `id` from query params
  const type = getQueryParam("type"); // Get the `type` from query params

  if (!id || !type) {
    console.error("Missing required query parameters: id or type");
    return;
  }

  try {
    let data;
    if (type === "movie") {
      data = await services.getMovieById(id);
    } else if (type === "series") {
      data = await services.getSerieById(id);
    } else {
      throw new Error("Invalid type specified. Use 'movie' or 'series'.");
    }

    // Populate the details page with fetched data
    document.getElementById("details-title").textContent = data.title || "N/A";
    document.getElementById("details-description").textContent =
      data.description || "N/A";
    document.getElementById("details-year").textContent =
      data.year || "N/A";
    document.getElementById("details-rating").textContent =
      data.rating || "N/A";
    document.getElementById("details-genre").textContent = data.genre || "N/A";
    document.getElementById("details-big_image").src = data.big_image || "default.jpg";
    document.getElementById("details-big_image").alt = data.title || "Poster Image";
  } catch (error) {
    console.error("Error populating details page:", error);
  }
}

// Back button functionality
document.getElementById("back-button").addEventListener("click", () => {
  window.history.back();
});

// Populate the page once the DOM is loaded
document.addEventListener("DOMContentLoaded", populateDetailsPage);
