const baseURL = import.meta.env.VITE_IMDB_API_URL; // environment variables

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
    this.url = baseURL; // API endpoint
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
  async getMovieById(id) {
    const cacheKey = `movieData_${id}`;
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
    const movieURL = `${this.url}` + `${id}`; // enpoint for specific movie
    const response = await fetch(movieURL, options);
    const data = await convertToJson(response);

    // Cache the result for future use
    localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID: ${id}`, error);
    throw error;
  }
  }
  async getSerieById(id) {
    const cacheKey = `serieData_${id}`;
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
      const serieURL = `${this.url}series/${id}`; // endpoint for specific series
      const response = await fetch(serieURL, options);
      const data = await convertToJson(response);
  
      // Cache the result for future use
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error(`Error fetching series details for ID: ${id}`, error);
      throw error;
    }
  }

  // method to get the full movie list (without slicing)
  async getFullMovieList() {
    const cacheKey = "fullMovieListData";
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
      console.error("Error fetching full movie list from IMDB:", error);
      throw error;
    }
  }

  // method to get the full series list (without slicing)
  async getFullSeriesList() {
    const cacheKey = "fullSeriesListData";
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
      const seriesURL = this.url + "series/";
      const response = await fetch(seriesURL, options);
      const data = await convertToJson(response);

      // Cache the result for future use
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching full series list from IMDB:", error);
      throw error;
    }
  }
}


