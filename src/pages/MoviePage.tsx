import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectDetails, selectFavoriteIds } from "../app/selectors";
import { ErrorMessage } from "../components/ErrorMessage";
import { loadMovieDetails } from "../features/details/detailsSlice";
import { toggleFavorite } from "../features/favorites/favoritesSlice";

export function MoviePage() {
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectDetails);
  const isFavorite = useAppSelector(selectFavoriteIds).has(id);
  useEffect(() => {
    const request = dispatch(loadMovieDetails(id));
    return () => request.abort();
  }, [dispatch, id]);
  if (details.status === "loading" || details.requestedId !== id)
    return (
      <main>
        <div className="details-loader">
          <span />
          <p>Загружаем информацию о фильме…</p>
        </div>
      </main>
    );
  if (details.status === "failed")
    return (
      <main>
        <ErrorMessage message={details.error ?? "Фильм не найден"} />
      </main>
    );
  if (!details.movie) return null;
  const movie = details.movie;
  const hasPoster = movie.Poster && movie.Poster !== "N/A";
  return (
    <main>
      <Link className="back" to="/">
        ← Вернуться к поиску
      </Link>
      <article className="movie-details">
        <div className="details-poster">
          {hasPoster ? (
            <img src={movie.Poster} alt={`Постер фильма «${movie.Title}»`} />
          ) : (
            <div className="poster-missing">Нет постера</div>
          )}
        </div>
        <div className="details-content">
          <p className="kicker">
            {movie.Type} · {movie.Year}
          </p>
          <h1>{movie.Title}</h1>
          <div className="meta">
            <b>IMDb {movie.imdbRating}</b>
            <span>{movie.Runtime}</span>
            <span>{movie.Genre}</span>
          </div>
          <p className="plot">{movie.Plot}</p>
          <dl>
            <div>
              <dt>Режиссёр</dt>
              <dd>{movie.Director}</dd>
            </div>
            <div>
              <dt>В ролях</dt>
              <dd>{movie.Actors}</dd>
            </div>
            <div>
              <dt>Награды</dt>
              <dd>{movie.Awards}</dd>
            </div>
            <div>
              <dt>Премьера</dt>
              <dd>{movie.Released}</dd>
            </div>
          </dl>
          <button
            className={
              isFavorite ? "details-favorite active" : "details-favorite"
            }
            onClick={() => dispatch(toggleFavorite(movie))}
          >
            {isFavorite ? "★ Удалить из избранного" : "☆ Добавить в избранное"}
          </button>
        </div>
      </article>
    </main>
  );
}
