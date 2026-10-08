import { useAppSelector } from "../app/hooks";
import { selectFavorites } from "../app/selectors";
import { MovieGrid } from "../components/MovieGrid";

export function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites);
  return (
    <main>
      <div className="page-title">
        <p>ВАША КОЛЛЕКЦИЯ</p>
        <h1>Избранные фильмы</h1>
      </div>
      {favorites.length ? (
        <MovieGrid movies={favorites} />
      ) : (
        <div className="message">
          <b>Здесь пока пусто</b>
          <p>Добавляйте фильмы в избранное из поиска или со страницы фильма.</p>
        </div>
      )}
    </main>
  );
}
