let hamburgers = document.querySelectorAll(".hamburger");

if (hamburgers.length > 0) {
  hamburgers.forEach(hamb => {
    hamb.addEventListener("click", () => {
      hamb.classList.toggle("is-active");
    })
  });
}
