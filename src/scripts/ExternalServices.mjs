const baseURL = import.meta.env.VITE_IMDB_API_URL; // The base URL will be set in your environment variables

async function convertToJson(res) {
  // Convert response to JSON before checking if it"s ok
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {
    this.url = baseURL; // This will be the IMDB API endpoint
  }

  async getTopMovies() {
    const cacheKey = "topMoviesData";
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData); // Return cached data if available
    }

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY, 
        "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
      },
    };

    try {
        const response = await fetch(this.url, options);
        const data = await convertToJson(response);
  
        // Cache the result for future use
        localStorage.setItem(cacheKey, JSON.stringify(data));
        return data;
      } catch (error) {
        console.error("Error fetching data from IMDB:", error);
        throw error;
      }
  }
  async getTopSeries() {
    const cacheKey = "topSeriesData";
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData); // Return cached data if available
    }

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY, 
        "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
      },
    };

    try {
        const seriesURL = this.url + "series/"  
        const response = await fetch(seriesURL, options);
        const data = await convertToJson(response);
  
        // Cache the result for future use
        localStorage.setItem(cacheKey, JSON.stringify(data));
        return data;
      } catch (error) {
        console.error("Error fetching data from IMDB:", error);
        throw error;
      }
  }
}
