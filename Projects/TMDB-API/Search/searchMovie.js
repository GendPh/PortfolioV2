import { LoadYear } from "../src/load_year.js";
// // Redirect to search.html with the search key as a query parameter

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents the default form submission behavior

  const searchValue = document.getElementById("searchFilm").value;
  const urlDestination = this.getAttribute("data-url-destination");

  if (searchValue.length != 0) {
    window.location.href = `${urlDestination}?search=` + encodeURIComponent(searchValue) + '&page=1';

  } else {
    const modal = document.getElementById("searchError");
    modal.classList.add("show");
    modal.style.display = "block";

    const modalClose = document.querySelectorAll(".closeModal");
    modalClose.forEach(btn => {
      btn.addEventListener("click", () => {
        if (modal.classList.contains("show")) {
          modal.classList.remove("show");
          modal.style.display = "none";
        }
      })
    });
  }
});


LoadYear();