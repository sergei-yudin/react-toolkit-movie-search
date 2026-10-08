import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectSearch } from "../app/selectors";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingGrid } from "../components/LoadingGrid";
import { MovieGrid } from "../components/MovieGrid";
import { loadMovies } from "../features/search/searchSlice";

export function SearchPage() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);
  const [query, setQuery] = useState(search.query);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (query.trim()) void dispatch(loadMovies(query.trim()));
  };
  return (
    <main>
      <section className="hero">
        <p>REDUX TOOLKIT × OMDb</p>
        <h1>
          Найдите фильм
          <br />
          <i>на сегодня.</i>
        </h1>
        <form className="search-form" onSubmit={submit}>
          <input
            aria-label="Название фильма"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Например, The Matrix"
            autoFocus
          />
          <button disabled={!query.trim() || search.status === "loading"}>
            Найти
          </button>
        </form>
      </section>
      {search.status === "loading" && <LoadingGrid />}
      {search.status === "failed" && (
        <ErrorMessage message={search.error ?? "Неизвестная ошибка"} />
      )}
      {search.status === "succeeded" && search.items.length > 0 && (
        <section className="results">
          <div className="section-heading">
            <h2>Результаты для «{search.query}»</h2>
            <span>Найдено: {search.totalResults}</span>
          </div>
          <MovieGrid movies={search.items} />
        </section>
      )}
      {search.status === "succeeded" && search.items.length === 0 && (
        <div className="message">
          <b>Фильмы не найдены</b>
          <p>Попробуйте изменить поисковый запрос.</p>
        </div>
      )}
      {search.status === "idle" && (
        <div className="message intro">
          <b>Начните с названия</b>
          <p>Мы найдём фильмы, сериалы и эпизоды в каталоге OMDb.</p>
        </div>
      )}
    </main>
  );
}
