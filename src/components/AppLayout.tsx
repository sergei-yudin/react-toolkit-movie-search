import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectFavorites } from "../app/selectors";

export function AppLayout() {
  const favoriteCount = useAppSelector(selectFavorites).length;
  return (
    <>
      <header className="topbar">
        <NavLink className="brand" to="/">
          КИНОПОИСКОВИК
        </NavLink>
        <nav>
          <NavLink to="/" end>
            Поиск
          </NavLink>
          <NavLink to="/favorites">
            Избранное <span>{favoriteCount}</span>
          </NavLink>
        </nav>
      </header>
      <Outlet />
      <footer>Данные предоставлены OMDb API</footer>
    </>
  );
}
