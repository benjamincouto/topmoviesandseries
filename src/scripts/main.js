import ExternalServices from "./ExternalServices.mjs";

const externalServices = new ExternalServices();

async function fetchTopMovies() {
  try {
    const topMovies = await externalServices.getTopMovies();
    console.log("Top Movies:", topMovies);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchTopMovies();
