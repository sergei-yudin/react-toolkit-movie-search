import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchMovies } from "../../api/omdbApi";
import type { MovieSummary } from "../../types/movie";

type SearchState = {
  items: MovieSummary[];
  query: string;
  totalResults: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: SearchState = {
  items: [],
  query: "",
  totalResults: 0,
  status: "idle",
  error: null,
};

export const loadMovies = createAsyncThunk(
  "search/loadMovies",
  async (query: string, { signal, rejectWithValue }) => {
    try {
      const response = await searchMovies(query, signal);
      return {
        items: response.Search ?? [],
        totalResults: Number(response.totalResults ?? 0),
        query,
      };
    } catch (error) {
      const message = (error as Error).message;
      if (message.toLowerCase().includes("movie not found")) {
        return { items: [], totalResults: 0, query };
      }
      return rejectWithValue(message);
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.query = action.meta.arg;
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(loadMovies.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = "failed";
        state.items = [];
        state.error = String(action.payload ?? "Не удалось выполнить поиск");
      });
  },
});

export default searchSlice.reducer;
