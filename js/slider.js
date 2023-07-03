function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function checkHoverStatus(carousel) {
  return carousel.matches(":focus") || carousel.matches(":hover") || scrolling;
}

function scrollToNextSlide(carousel, element, isLast) {
  if (isLast) {
    carousel.scrollLeft = 0;
  } else {
    carousel.scrollLeft += element.offsetWidth;
  }
}

function updateNavigation(navArray, radioArray) {
  for (let i = 0; i < radioArray.length; i++) {
    if (radioArray[i].checked) {
      navArray[i].classList.add("checked");
    } else {
      navArray[i].classList.remove("checked");
    }
  }
}

function manuallyScroll(carousel, scrollLength) {
  carousel.scrollLeft = scrollLength;
}

function updateScroll(carousel, slidesArray, slideWrap, navArray, radioArray) {
  const margin = parseInt(window.getComputedStyle(slideWrap[0], null).margin);
  const i = Math.round(
    carousel.scrollLeft / (slidesArray[0].offsetWidth + 2 * margin)
  );
  radioArray[i].checked = true;
  updateNavigation(navArray, radioArray);
}

function checkNavigationState(radioArray) {
  for (let i = 0; i < radioArray.length; i++) {
    if (radioArray[i].checked) {
      return i;
    }
  }
}

function* loopSlides(carousel, list, navArray, radioArray) {
  for (let i = 0; i < list.length; i++) {
    i = checkNavigationState(radioArray);
    const isLast = i === list.length - 1 ? true : false;
    scrollToNextSlide(carousel, list[i], isLast);
    const nextButton = isLast ? radioArray[0] : radioArray[i + 1];
    nextButton.checked = true;
    updateNavigation(navArray, radioArray);
    if (isLast) {
      i = -1;
    }
    yield i;
  }
}

async function slider(viewport, slidesIterator) {
  while (true) {
    await sleep(4000);
    const hovered = checkHoverStatus(viewport);
    if (!hovered) {
      slidesIterator.next().value;
    }
  }
}

const slidesArray = document.getElementsByClassName("slide");
const navArray = document.getElementsByClassName("slider-nav-item");
const radioArray = document.getElementsByClassName("slider-nav-button");
const carousel = document.getElementById("slider");
const slideWrap = document.getElementsByClassName("slide-wrap");
const slidesIterator = loopSlides(
  carousel,
  slidesArray,
  navArray,
  radioArray,
  slideWrap
);
const viewport = document.getElementById("viewport-wrap");
let scrolling = false;

for (let i = 0; i < radioArray.length; i++) {
  radioArray[i].addEventListener("click", (e) => {
    const margin = parseInt(window.getComputedStyle(slideWrap[0], null).margin);
    const scrollLength = i * (slidesArray[i].offsetWidth + 2 * margin);
    manuallyScroll(carousel, scrollLength);
    updateNavigation(navArray, radioArray);
  });
}

carousel.addEventListener("scroll", (e) => {
  scrolling = true;
});

carousel.addEventListener("scrollend", (e) => {
  updateScroll(carousel, slidesArray, slideWrap, navArray, radioArray);
  scrolling = false;
});

slider(viewport, slidesIterator);
