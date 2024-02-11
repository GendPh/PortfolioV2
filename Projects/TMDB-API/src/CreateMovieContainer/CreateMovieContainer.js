const standLoader = `
<div class="card opacity-75 h-100">
  <div class="h-100 d-grid align-content-center">
    <span class="loader"></span>
  </div>
  <div class="card-body">
    <p class="card-text text-center">Loading</p>
  </div>
</div>

<div class="card opacity-75 h-100">
  <div class="h-100 d-grid align-content-center">
    <span class="loader"></span>
  </div>
  <div class="card-body">
    <p class="card-text text-center">Loading</p>
  </div>
</div>

<div class="card opacity-75 h-100">
  <div class="h-100 d-grid align-content-center">
    <span class="loader"></span>
  </div>
  <div class="card-body">
    <p class="card-text text-center">Loading</p>
  </div>
</div>

<div class="card opacity-75 h-100">
  <div class="h-100 d-grid align-content-center">
    <span class="loader"></span>
  </div>
  <div class="card-body">
    <p class="card-text text-center">Loading</p>
  </div>
</div>

<div class="card opacity-75 h-100">
  <div class="h-100 d-grid align-content-center">
    <span class="loader"></span>
  </div>
  <div class="card-body">
    <p class="card-text text-center">Loading</p>
  </div>
</div>

<div class="card opacity-75 h-100">
  <div class="h-100 d-grid align-content-center">
    <span class="loader"></span>
  </div>
  <div class="card-body">
    <p class="card-text text-center">Loading</p>
  </div>
</div>

<div class="card opacity-75 h-100">
  <div class="h-100 d-grid align-content-center">
    <span class="loader"></span>
  </div>
  <div class="card-body">
    <p class="card-text text-center">Loading</p>
  </div>
</div>

<div class="card opacity-75 h-100">
  <div class="h-100 d-grid align-content-center">
    <span class="loader"></span>
  </div>
  <div class="card-body">
    <p class="card-text text-center">Loading</p>
  </div>
</div>
`;

export function createMovieBox(data, container) {
  const movieContainer = document.querySelector(`${container}`);
  // Clear existing content
  movieContainer.innerHTML = standLoader;

  setTimeout(() => {
    if (data.length != 0) {
      movieContainer.innerHTML = "";
      data.forEach(box => {
        const newMovieBox = movieBox(box);
        // Convert the HTML string to a DOM element before appending
        const parser = new DOMParser();
        const doc = parser.parseFromString(newMovieBox, 'text/html');
        const movieBoxElement = doc.body.firstChild;
        movieContainer.appendChild(movieBoxElement);
      });
    } else {
      movieContainer.classList.add("fail");
      movieContainer.innerHTML = `
      <h1>Error: Failed to load API data</h1>
      <p>We're sorry, but there was an issue loading the data from the API. Please try again later. If the problem persists, contact support for assistance.</p>
      <p>Error Details:</p>
      <ul>
      <li><strong>Message:</strong> Unable to connect to the API server.</li>
      <li><a href="../index.html" alt="back to main page">Go back to main page</a></li>
      </ul>`;

      const btnContainer = document.getElementById('btn-container');
      btnContainer.style.display = 'none';
    }
  }, 1000);

}

export function movieBox(info) {
  const postarSizes = "w440_and_h660_face";
  const poster = (info.poster_path) ? `https://image.tmdb.org/t/p/${postarSizes}${info.poster_path}` : "https://picsum.photos/440/660";

  const releaseDate = (info.release_date) ? info.release_date : "00-00-0000";

  return `
    <div class="card">
      <img src="${poster}" class="card-img-top h-100" alt="movie poster">
      <div class="card-body ">
        <p class="card-text fw-bold mb-0 truncate"><a href="../movie/movie.html?movie=${info.id}">${info.title}</a></p>
        <p class="card-text mb-0 opacity-50">${releaseDate}</p>
        <p class="float-end mb-0 fw-bold average">${(info.vote_average * 10).toFixed(0)}%</p>
      </div>
    </div>
  `;
}