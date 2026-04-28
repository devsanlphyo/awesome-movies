import type { Movie } from "../interfaces";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const POSTER_PATH = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-movie.png";
  return (
    <div className="movie-card">
      <img src={POSTER_PATH} alt={movie.title} className="text-white" />
      <div className="mt-4">
        <h3>{movie.title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Start Icon" />
            <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{movie.original_language}</p>
          <span>•</span>
          <p className="year">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
