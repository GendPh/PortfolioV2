import { fetchData, getQueryParam } from "./API/fetch.js";
import { createMovieBox } from "./CreateMovieContainer/CreateMovieContainer.js";
import { createBtn, btnEvents } from "./CreateBtn/PopularBtn.js";
import { LoadYear } from "./load_year.js";

async function loadData() {
  const page = (getQueryParam("page") < 1) ? 1 : getQueryParam("page");
  const search = getQueryParam("search");

  const data = await fetchData(`movie/${search}?language=en-US&page=${page}`);

  if (data.length != 0) {
    createMovieBox(data.results, "#movie-container");
    createBtn(data);
    btnEvents(page, `${search}.html?search=${encodeURIComponent(search)}`);
  } else {
    createMovieBox([], "#movie-container");
  }
}

loadData();
LoadYear();