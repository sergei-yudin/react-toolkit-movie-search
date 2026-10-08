export function LoadingGrid() {
  return (
    <div className="movie-grid" aria-label="Загрузка фильмов">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="skeleton" key={index}>
          <div />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}
