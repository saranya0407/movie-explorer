import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "./services/movieService";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovieDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMovieDetails(id);

      if (response.data) {
        setMovie(response.data);
      } else {
        setError("Movie details not found.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="details-container">
        <h2>Loading movie details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <p className="error">{error}</p>

        <Link to="/">
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="details-container">
      <Link to="/" className="back-button">
        ← Back to Movies
      </Link>

      <div className="movie-details">
        <img
          src={
            movie.image
              ? movie.image.original
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.name}
        />

        <div className="details-content">
          <h1>{movie.name}</h1>

          <p>
            <strong>Language:</strong>{" "}
            {movie.language || "N/A"}
          </p>

          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres && movie.genres.length > 0
              ? movie.genres.join(", ")
              : "N/A"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {movie.status || "N/A"}
          </p>

          <p>
            <strong>Premiered:</strong>{" "}
            {movie.premiered || "N/A"}
          </p>

          <p>
            <strong>Runtime:</strong>{" "}
            {movie.runtime
              ? `${movie.runtime} minutes`
              : "N/A"}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            {movie.rating && movie.rating.average
              ? movie.rating.average
              : "N/A"}
          </p>

          <p>
            <strong>Summary:</strong>
          </p>

          <p
            dangerouslySetInnerHTML={{
              __html: movie.summary || "No summary available."
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;