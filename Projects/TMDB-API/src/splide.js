export function loadSlide(slide) {
  var splide = new Splide(`${slide}`, {
    type: 'loop',
    perPage: 4,
    perMove: 1,
    focus: "center",
    // padding: { left: "1rem" },
    gap: "0.5rem",
    pagination: false,
    breakpoints: {
      600: {
        perPage: 2,
      },
      1000: {
        perPage: 3,
      },
    },
  });
  splide.mount();
}

export function slideBox(data) {
  return `
  <a href="./movie/movie.html?movie=${data.id}" class="splide__slide">
    <img data-splide-lazy src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="img" class="w-100 rounded-4">
  </a>
  `;
}