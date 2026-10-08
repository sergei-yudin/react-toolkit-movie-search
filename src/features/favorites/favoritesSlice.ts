import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MovieSummary } from "../../types/movie";

const storageKey = "movie-search-favorites";

function loadFavorites(): MovieSummary[] {
  try {
    return JSON.parse(
      localStorage.getItem(storageKey) || "[]",
    ) as MovieSummary[];
  } catch {
    return [];
  }
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: loadFavorites() },
  reducers: {
    toggleFavorite(state, action: PayloadAction<MovieSummary>) {
      const index = state.items.findIndex(
        (movie) => movie.imdbID === action.payload.imdbID,
      );
      if (index >= 0) state.items.splice(index, 1);
      else state.items.push(action.payload);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export { storageKey };
export default favoritesSlice.reducer;
