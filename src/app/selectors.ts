import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const selectSearch = (state: RootState) => state.search;
export const selectDetails = (state: RootState) => state.details;
export const selectFavorites = (state: RootState) => state.favorites.items;

export const selectFavoriteIds = createSelector(
  [selectFavorites],
  (movies) => new Set(movies.map((movie) => movie.imdbID)),
);
