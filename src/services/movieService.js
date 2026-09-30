import axios from "axios";

const API_URL = "https://api.tvmaze.com";

export const searchMovies = (search, type) => {
  return axios.get(`${API_URL}/search/shows?q=${search}`);
};

export const getMovieDetails = (id) => {
  return axios.get(`${API_URL}/shows/${id}`);
};