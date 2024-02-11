import { fetchData } from "./API/fetch.js";
import { loadSlide, slideBox } from "./splide.js";
import { LoadYear } from "./load_year.js";

async function loadSections(ApiData, slideDest, slide) {
  const data = await fetchData(ApiData);
  const slicedData = data.results.slice(0, 12);
  const slideContainer = document.querySelector(slideDest);

  slicedData.forEach(poster => {
    const newMovieBox = slideBox(poster);
    // Convert the HTML string to a DOM element before appending
    const parser = new DOMParser();
    const doc = parser.parseFromString(newMovieBox, 'text/html');
    const movieBoxElement = doc.body.firstChild;
    slideContainer.appendChild(movieBoxElement);
  });

  loadSlide(slide);
}

function StartPage() {
  if (window.location.pathname.endsWith("index.html")) {
    window.location.replace(window.location.pathname.replace("index.html", ""));
  }
  
  loadSections("movie/popular?language=en-US&page=1", "#popular-slide-list", "#popular .splide");
  loadSections("movie/top_rated?language=en-US&page=1", "#top-rated-slide-list", "#top-rated .splide");
  loadSections("movie/now_playing?language=en-US&page=1", "#playing-slide-list", "#playing .splide");
  loadSections("movie/upcoming?language=en-US&page=1", "#upcoming-slide-list", "#upcoming .splide");
}

StartPage();
LoadYear();