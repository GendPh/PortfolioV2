const hamburgers = document.querySelectorAll(".hamburger");
const header_container = document.getElementById("main-header");
const navbar_container = document.getElementById("main-navbar");


if (hamburgers.length > 0) {
  hamburgers.forEach(hamb => {
    hamb.addEventListener("click", () => {
      hamb.classList.toggle("is-active");
      navbar_container.classList.toggle("is-open")
    })
  });
}
