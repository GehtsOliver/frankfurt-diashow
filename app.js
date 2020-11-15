// 
const imageContainer = document.body.querySelector(".image-container");
const imageInfo = document.body.querySelector(".image-info");
const nextImgBtn = document.body.querySelector("#arrow-right");
const prevImgBtn = document.body.querySelector("#arrow-left");

// Image overlay
const overlay =
  "linear-gradient(rgba(0,0,0,0.1),rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.9))";

let count = 0;


// array to store images in
const resources = [];

// Function to fetch images from unsplash API
const unsplashAccessKey = "qIb-85Fnxs78S-_1WTcgv7DDhVx2APZGun-5dfYr3m0";

async function fetchImages() {
  const response = await fetch(
    "https://api.unsplash.com/search/photos?query=frankfurt&client_id=" +
      unsplashAccessKey
  );
  const images = await response.json();
  return images;
}

// Interval function, how frequently image is supposed to change  
let intervalId = null;

function transitionTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        transition();
        setTimeout(() => nextImage(), 2000);
        setTimeout(() => transition(), 2000);
      }, 15000);
  } else {
    intervalId = setInterval(() => {
      transition();
      setTimeout(() => nextImage(), 2000);
      setTimeout(() => transition(), 2000);
    }, 15000);
  }
}

// Kick-start image change when page loaded;
transitionTimer();

// Exec image-fetch function and then push images(links) to storage
fetchImages()
  .then(function (images) {
    images.results.forEach((result) => resources.push(result));
  })
  .then(() => showImage());




// Function to update the image
function showImage() {
  imageContainer.style.backgroundImage = `${overlay}, url(${resources[count].urls.full})`;
  const description = resources[count].description
    ? resources[count].description
    : "No description";

  imageInfo.innerHTML =
    description +
    "<br> Captured by " +
    resources[count].user.name +
    "<br>" +
    `Find author <a href="${resources[count].user.links.html}">here</a>`;
}
// next button event listener
nextImgBtn.addEventListener("click", () => {
  transition();
   setTimeout(() => nextImage(), 2000);
  setTimeout(() => transition(), 2000);
    transitionTimer();
  }
  )
// prev button event listener
prevImgBtn.addEventListener("click", () => {
  transition();
  setTimeout(() => prevImage(), 2000);
  setTimeout(() => transition(), 2000);
  transitionTimer();
});

// function to load new image
function nextImage() {
  if (count >= resources.length - 1) {
    count = 0;
    showImage();
  } else {
    count++;
    showImage();
  }
}


// function to load previous image and then reset timer
function prevImage() {
  if (count === 0) {
    count = resources.length-1;
    showImage();
   
} else {
    count--;
    showImage();
  }
}

// add active class to slider in order to make it show
function transition() {
  const transition = document.body.querySelector(".transition");
  transition.classList.toggle("active");
}
