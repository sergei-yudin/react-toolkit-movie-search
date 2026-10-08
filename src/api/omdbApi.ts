import type { MovieDetails, SearchResponse } from "../types/movie";

const apiKey = import.meta.env.VITE_OMDB_API_KEY || "64405bd2";
const apiUrl = "https://www.omdbapi.com/";

async function request<T>(parameters: URLSearchParams, signal?: AbortSignal) {
  parameters.set("apikey", apiKey);
  const response = await fetch(`${apiUrl}?${parameters}`, { signal });
  if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);

  const data = (await response.json()) as T & {
    Response?: string;
    Error?: string;
  };
  if (data.Response === "False") {
    throw new Error(data.Error || "OMDb не смог обработать запрос");
  }
  return data;
}

export function searchMovies(query: string, signal?: AbortSignal) {
  return request<SearchResponse>(new URLSearchParams({ s: query }), signal);
}

export function fetchMovieDetails(movieId: string, signal?: AbortSignal) {
  return request<MovieDetails>(
    new URLSearchParams({ i: movieId, plot: "full" }),
    signal,
  );
}
