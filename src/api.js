import axios from "axios";

export const getMovieList = async () => {
    try {
      const apiKey = import.meta.env.VITE_REACT_APP_APIKEY;
      const baseUrl = import.meta.env.VITE_REACT_APP_BASEURL;
  
      const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
      console.log('Movie API Response:', response.data.results);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movie list:", error.response.status, error.response.data);
      return [];
    }
  };
  
  export const searchMovie = async (q) => {
  try {
    const apiKey = import.meta.env.VITE_REACT_APP_APIKEY;
    const baseUrl = import.meta.env.VITE_REACT_APP_BASEURL;

    const search = await axios.get(`${baseUrl}/search/movie?query=${q}&api_key=${apiKey}`);
    return search.data;
  } catch (error) {
    console.error("Error searching movie:", error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
};