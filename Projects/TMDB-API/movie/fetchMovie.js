import { fetchData, getQueryParam } from "../src/API/fetch.js";
import { createMovieBox } from "../src/CreateMovieContainer/CreateMovieContainer.js";
import { LoadYear } from "../src/load_year.js";

async function fetchMovie() {
  const getMovieId = getQueryParam("movie");

  const data = await fetchData(`movie/${getMovieId}?language=en-US`);

  const movie_img_container = document.getElementById("backdroup-img");
  movie_img_container.src = (data.backdrop_path) ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}` : "https://picsum.photos/1280/600";

  const watch_movie_a = document.getElementById("watch-now");
  watch_movie_a.href = (data.homepage) ? data.homepage : "unavailable";

  (watch_movie_a.href.includes("unavailable")) && watch_movie_a.classList.add("opacity-50", "disabled");

  const movie_title_container = document.getElementById("movie-title");
  movie_title_container.textContent = (data.title) ? data.title : "Undefined";

  document.addEventListener('DOMContentLoaded', function () {
    document.title = `Movie Application - Movie ${(data.title) ? data.title : "Undefined"}`;
  });

  const movie_vote_container = document.getElementById("imbd-vote");
  movie_vote_container.textContent = (data.vote_average) ? data.vote_average.toFixed(1) : "0";

  const movie_description_container = document.getElementById("description");
  movie_description_container.textContent = (data.overview) ? data.overview : "Unknown";

  const movie_release_container = document.getElementById("release-date");
  movie_release_container.textContent = (data.release_date) ? data.release_date : "00-00-0000";

  const movie_genres = (data.genres) ? data.genres.map(genre => genre.name) : ["none"];
  const movie_genres_container = document.getElementById("genre");
  movie_genres_container.textContent = movie_genres.join(', ');


  const movie_runTime_container = document.getElementById("duration");
  movie_runTime_container.textContent = (data.runtime) ? data.runtime : "0";

  const movie_country = (data.production_companies) ? data.production_countries.map(country => country.name) : ["none"];
  const movie_country_container = document.getElementById("country");
  movie_country_container.textContent = movie_country.join(", ");

  const movie_company = (data.production_companies) ? data.production_companies.map(company => company.name) : ["none"];
  const movie_company_container = document.getElementById("companies");
  movie_company_container.textContent = movie_company.join(", ");

  const movie_genre_id = (data.genres) ? data.genres.map(genre => genre.id) : [1];

  const moviesMayLike = await fetchMoviesForGenres(movie_genre_id);

  createMovieBox(moviesMayLike, "#movie-container");
}


async function fetchMoviesByGenre(genreID, page) {
  const data = await fetchData(`discover/movie?include_genre=${genreID}&page=${page}`);
  const slicedData = data.results.slice(0, 4);
  console.log(slicedData);
  return slicedData;
}

async function fetchMoviesForGenres(genreIDs) {
  let moviesMayLike = [];

  for (let index = 0; index < genreIDs.length; index++) {
    const id = genreIDs[index];
    const page = index + 2;
    const moviesForGenre = await fetchMoviesByGenre(id, page);
    moviesMayLike = [...moviesMayLike, ...moviesForGenre];
  }

  return moviesMayLike;
}


document.addEventListener('DOMContentLoaded', async function () {
  const getMovieId = getQueryParam("movie");
  const data = await fetchData(`movie/${getMovieId}?language=en-US`);
  document.title = `Movie Application - ${(data.title) ? data.title : "Undefined"}`;
});

fetchMovie();
LoadYear();