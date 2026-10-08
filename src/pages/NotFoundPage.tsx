import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main>
      <div className="message">
        <b>404 — страница не найдена</b>
        <Link to="/">Перейти к поиску</Link>
      </div>
    </main>
  );
}
