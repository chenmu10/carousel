const BASE_URL = "https://jsonplaceholder.typicode.com";
let photos;
let currentImageIndex = 0;

const carouselContainer = document.querySelector("#carousel-container");

async function getPhotos() {
  try {
    let response = await fetch(BASE_URL + "/photos");

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }

    photos = await response.json();
    render(photos[currentImageIndex]);
  } catch (e) {
    console.log(e);
  }
}

getPhotos();

function render(photo) {
  const itemHtml = `
     <button class="button prev-button"><</button>
      <div id="item-container" class="flex">
       <img src="${photo.thumbnailUrl}"/>
        <div class="title">${photo.title}</div>
        <div>Album:${photo.albumId} Photo #${photo.id}</div>
         </div>

      <button class="button next-button">></button>
    `;
  carouselContainer.innerHTML = itemHtml;

  const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    console.log(currentImageIndex);
  if (currentImageIndex === 0) {
    prevButton.disabled = true;
  }
  prevButton.addEventListener("click", () => {
    render(photos[currentImageIndex--]);
  });
  nextButton.addEventListener("click", () => {
    render(photos[currentImageIndex++]);
  });
}
