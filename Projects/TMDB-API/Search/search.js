import { fetchData, getQueryParam } from "../src/API/fetch.js";
import { createMovieBox } from "../src/CreateMovieContainer/CreateMovieContainer.js";
import { createBtn, btnEvents } from "../src/CreateBtn/PopularBtn.js";
import { LoadYear } from "../src/load_year.js";

async function loadPage() {
  var searchKey = getQueryParam('search');
  var page = getQueryParam('page');

  const data = await fetchData(`search/movie?query=${searchKey}&page=${page}`);
  
  if (data.results.length > 0) {
    createMovieBox(data.results, "#movie-container");
    createBtn(data);
    btnEvents(page, `search.html?search=${encodeURIComponent(searchKey)}`);
  } else {
    window.location.href = 'fail_search.html';
  }

}

loadPage();
LoadYear();