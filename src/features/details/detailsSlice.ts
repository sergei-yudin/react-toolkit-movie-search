import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMovieDetails } from "../../api/omdbApi";
import type { MovieDetails } from "../../types/movie";

type DetailsState = {
  movie: MovieDetails | null;
  requestedId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: DetailsState = {
  movie: null,
  requestedId: null,
  status: "idle",
  error: null,
};

export const loadMovieDetails = createAsyncThunk(
  "details/loadMovieDetails",
  async (movieId: string, { signal, rejectWithValue }) => {
    try {
      return await fetchMovieDetails(movieId, signal);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMovieDetails.pending, (state, action) => {
        state.status = "loading";
        state.requestedId = action.meta.arg;
        state.movie = null;
        state.error = null;
      })
      .addCase(loadMovieDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movie = action.payload;
      })
      .addCase(loadMovieDetails.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = "failed";
        state.error = String(action.payload ?? "Не удалось загрузить фильм");
      });
  },
});

export default detailsSlice.reducer;
