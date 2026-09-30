import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "./services/movieService";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("Friends");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (searchValue) => {
    setLoading(true);
    setError("");

    try {
      const response = await searchMovies(searchValue, type);

      if (response.data.length > 0) {
        setMovies(response.data);
      } else {
        setMovies([]);
        setError("No movies or shows found.");
      }
    } catch (error) {
      setMovies([]);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies("Friends");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a movie or show name.");
      return;
    }

    fetchMovies(search);
  };

  return (
    <div className="movie-container">
      <h1>Movie Explorer</h1>

      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies or shows..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

      <div className="category-buttons">
        <button
          className={type === "all" ? "active-category" : ""}
          onClick={() => setType("all")}
        >
          All
        </button>

        <button
          className={type === "movie" ? "active-category" : ""}
          onClick={() => setType("movie")}
        >
          Movies
        </button>

        <button
          className={type === "series" ? "active-category" : ""}
          onClick={() => setType("series")}
        >
          Series
        </button>
      </div>

      {loading && (
        <div className="loading">
          Loading movies...
        </div>
      )}

      {error && !loading && (
        <div className="error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="movie-grid">
          {movies.map((item) => (
            <div className="movie-card" key={item.show.id}>
              <img
                src={
                  item.show.image
                    ? item.show.image.medium
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={item.show.name}
              />

              <div className="movie-content">
                <h3>{item.show.name}</h3>

                <p>
                  {item.show.premiered
                    ? item.show.premiered.substring(0, 4)
                    : "N/A"}
                </p>

                <p>
                  {item.show.genres &&
                  item.show.genres.length > 0
                    ? item.show.genres.join(", ")
                    : "N/A"}
                </p>

                <Link to={`/movie/${item.show.id}`}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;