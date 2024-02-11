function btn(index) {
  return `<button type="button" class="btn btn-light btn-page">${index}</button>`;
}

function movePageOne(direction, icon, maxPage) {
  return `<button type="button" class="btn btn-light" data-max-page="${maxPage}" id="${direction}">${icon}</button>`;
}

export function createBtn(data) {
  const btnContainer = document.querySelector(`#btn-container`);
  const btnMax = Number(btnContainer.getAttribute("data-max-btn"));

  const totalPages = (btnMax == 0) ? data.total_pages : btnMax;

  for (let i = 0; i <= totalPages + 1; i++) {
    let newBtn;
    if (i == 0) {
      newBtn = movePageOne("left", "<<", totalPages);
    } else if (i == 1) {
      newBtn = movePageOne("right", ">>", totalPages);
    } else {
      newBtn = btn(i - 1);
    }

    // Convert the HTML string to a DOM element before appending
    const parser = new DOMParser();
    const doc = parser.parseFromString(newBtn, 'text/html');
    const BtnElement = doc.body.firstChild;
    btnContainer.appendChild(BtnElement);
  }
}

export function btnEvents(page, url) {
  const allBtnChangeInnerPages = document.querySelectorAll("#btn-container .btn-page");
  const btnOnePageLeft = document.querySelector("#btn-container #left");
  const btnOnePageRight = document.querySelector("#btn-container #right");

  allBtnChangeInnerPages[page - 1].classList.add("opacity-50", "disabled");

  (page == 1) && btnOnePageLeft.classList.add("opacity-50", "disabled");

  const maxPage = btnOnePageRight.getAttribute("data-max-page");
  (page == maxPage) && btnOnePageRight.classList.add("opacity-50", "disabled");

  btnOnePageLeft.addEventListener("click", () => {
    const pageBefore = Number(page) - 1;
    console.log("clicked");
    if (page != 1) {
      window.location.href = `./${url}&page=${pageBefore}`;
    }
  })

  btnOnePageRight.addEventListener("click", () => {
    const pageNext = Number(page) + 1;
    if (page != maxPage) {
      window.location.href = `./${url}&page=${pageNext}`;
    }
  })

  allBtnChangeInnerPages.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      window.location.href = `./${url}&page=${index + 1}`;
    })
  });
}