import { FetchData } from "./Fetch_Data.js";

async function GetBookShelf() {
  try {
    const shelf_container = document.getElementById("book-shelf");

    const BookShelf = await FetchData('./php/get/get_books.php');

    if (BookShelf.hasOwnProperty('error')) {
      setTimeout(() => {
        shelf_container.innerHTML = "";
        shelf_container.classList.add("text-center");
        shelf_container.innerHTML = `
        <h3 class="text-xl">Oops!</h3>
        <h2 class="text-2xl font-bold">Something went wrong while fetching the data.</h2>
        <h3>Please try refreshing the page or contact the administrator for assistance.</h3>`;
      }, 1500);
    } else {
      setTimeout(() => {
        shelf_container.innerHTML = "";
        shelf_container.classList.add("grid-cols-2", "md:grid-cols-3")
        BookShelf.forEach(book => {
          shelf_container.appendChild(CreateBookElement(book));
        });
        const book_article = document.querySelectorAll("#book-shelf article");
        const gsap_duration = 0.5;
        const gsap_stagger = gsap_duration / 2;
        gsap.to(book_article, { opacity: 1, duration: gsap_duration, stagger: gsap_stagger });
      }, 1500);
    }


  } catch (error) {
    console.error('Error fetching bookshelf:', error);
  }
}

// Call the function to get the bookshelf data
GetBookShelf();

function CreateBookElement(data) {
  // Create new article element for the book
  const bookElement = document.createElement('article');
  bookElement.classList.add("opacity-0", "grid", "grid-cols-1", "lg:grid-cols-2", "bg-dark-green", "rounded-md");

  // Create new figure element for the book image
  const figureElement = document.createElement('figure');

  // Create new img element for the book image
  const img = new Image();
  img.src = 'data:image/jpeg;base64,' + data.img; // Assuming the image is JPEG format
  img.alt = `Book ${data.title}`; // Add alt text if needed
  img.classList.add("w-full", "h-full", "object-cover", "rounded-t-md", "lg:rounded-r-none", "lg:rounded-l-md");

  // Append the img element to the figure container
  figureElement.appendChild(img);

  // Append the figure element to the book element
  bookElement.appendChild(figureElement);

  // Create container for book info
  const bookInfoContainer = document.createElement('div');
  bookInfoContainer.classList.add("flex", "flex-col", "gap-2", "items-start", "justify-center", "p-2", "text-sm", "md:text-lg");

  // Add book info to the container
  bookInfoContainer.innerHTML = `
    <p class="font-bold  hide-text">${data.title}</p>
    <p>Book ${data.order}</p>
    <p>${data.author}</p>
    <p>${data.genre}</p>
    <p>Published: ${data.publication}</p>
    <a href="${data.shop}" target="_blank" rel="noopener noreferrer" class="bg-light-dark px-4 py-2 rounded-md mx-auto">Buy</a>
  `;

  // Append the book info container to the book element
  bookElement.appendChild(bookInfoContainer);

  return bookElement;
}
