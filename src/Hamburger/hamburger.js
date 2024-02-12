const hamburgers = document.querySelectorAll(".hamburger");
const header_container = document.getElementById("main-header");
const navbar_container = document.getElementById("main-navbar");
const navbar_container_links = document.querySelectorAll("#main-navbar li");

if (hamburgers.length > 0) {
  hamburgers.forEach(hamb => {
    hamb.addEventListener("click", () => {
      hamb.classList.toggle("is-active");
      navbar_container.classList.toggle("is-open")
    })
  });
}

document.addEventListener('click', (e) => {
  if (!navbar_container.contains(e.target) && !hamburgers[0].contains(e.target)) {
    navbar_container.classList.remove('is-open');
    hamburgers.forEach(hamb => {
      hamb.classList.remove("is-active");
    });
  }
});

navbar_container_links.forEach(link => {
  link.addEventListener("click", () => {
    navbar_container.classList.remove('is-open');
    hamburgers.forEach(hamb => {
      hamb.classList.remove("is-active");
    });
  })
})