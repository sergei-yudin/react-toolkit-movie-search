import { configureStore, type Middleware } from "@reduxjs/toolkit";
import detailsReducer from "../features/details/detailsSlice";
import favoritesReducer, {
  storageKey,
} from "../features/favorites/favoritesSlice";
import searchReducer from "../features/search/searchSlice";

const persistFavorites: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem(
    storageKey,
    JSON.stringify((storeApi.getState() as RootState).favorites.items),
  );
  return result;
};

export const store = configureStore({
  reducer: {
    search: searchReducer,
    details: detailsReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistFavorites),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
