import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectFavoriteIds } from "../app/selectors";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import type { MovieSummary } from "../types/movie";

export function MovieCard({ movie }: { movie: MovieSummary }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectFavoriteIds).has(movie.imdbID);
  const hasPoster = movie.Poster && movie.Poster !== "N/A";
  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="poster">
          {hasPoster ? (
            <img src={movie.Poster} alt={`Постер фильма «${movie.Title}»`} />
          ) : (
            <div className="poster-missing">Нет постера</div>
          )}
          <span>{movie.Type}</span>
        </div>
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
      </Link>
      <button
        className={isFavorite ? "favorite active" : "favorite"}
        onClick={() => dispatch(toggleFavorite(movie))}
      >
        {isFavorite ? "★ В избранном" : "☆ В избранное"}
      </button>
    </article>
  );
}
