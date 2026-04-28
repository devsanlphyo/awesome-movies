import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Spinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMessage";
import Search from "./components/Search";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

function App() {
  const BASE_URL = "https://api.themoviedb.org/3";
  const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useDebounce(() => setDebouncedSearchQuery(searchQuery), 2000, [searchQuery]);

  const fetchMovies = async () => {
    try {
      const ALL_MOVIES_URL = `${BASE_URL}/discover/movie?page=1&sortby=popularity.desc`;
      const SEARCH_MOVIE_URL = `${BASE_URL}/search/movie?query=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(
        searchQuery ? SEARCH_MOVIE_URL : ALL_MOVIES_URL,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            accept: "application/json",
          },
        },
      );

      if (!response.ok) throw new Error("Error fetching movies");

      const data = await response.json();
      setMoviesList(data.results || []);
      console.log(data);
    } catch (error) {
      setErrorMessage("Error fetching movies");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [debouncedSearchQuery]);

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You’ll Love
            Without the Hassle
          </h1>

          <Search query={searchQuery} setQuery={setSearchQuery} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <ErrorMessage message={errorMessage} />
          ) : (
            moviesList.map((movie) => (
              <div className="text-white" key={movie.id}>
                <span>{movie.title}</span>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
