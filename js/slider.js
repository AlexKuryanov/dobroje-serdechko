function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkHoverStatus(carousel) {
    return carousel.matches(":focus") || carousel.matches(":hover");
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

function manuallyScroll(carousel, numberOfTheSlide, width) {
    carousel.scrollLeft = numberOfTheSlide*width;
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
        const isLast = i === list.length -1 ? true : false;
        scrollToNextSlide(carousel, list[i], isLast);
        const nextButton = isLast ? radioArray[0] : radioArray[i+1];
        nextButton.checked = true;
        updateNavigation(navArray, radioArray);
        if (isLast) {
            i = -1;
        }
        yield i; 
    }
}

async function slider(viewport, slidesIterator) {
  while(true) {
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
const slidesIterator = loopSlides(carousel, slidesArray, navArray, radioArray);
const viewport = document.getElementById("viewport-wrap");

for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].addEventListener("click", (e) => {
        updateNavigation(navArray, radioArray);
        manuallyScroll(carousel, i, slidesArray[0].offsetWidth);
    });
}

slider(viewport, slidesIterator);