console.log("Slider Loaded!");

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

function unsetNavItemChecked(navItem) {
    navItem.classList.remove("checked");
}

function setNavItemChecked(navItem) {
    navItem.classList.add("checked");
}

function updateNavigation(navArray, radioArray) {
    for (let i = 0; i < radioArray.length; i++) {
        if (radioArray[i].checked) {
            setNavItemChecked(navArray[i]);
        } else {
            unsetNavItemChecked(navArray[i]);
        }
    }
}

function manuallyScroll(carousel, numberOfTheSlide, width) {
    carousel.scrollLeft = numberOfTheSlide*width;
}

async function loopSlides(viewport, carousel, list, navArray, radioArray) {
    for (let i = 0; i < list.length; i++) {
        await sleep(4000);
        //console.log(list[i]);
        const isLast = i === list.length -1 ? true : false;
        const hovered = checkHoverStatus(viewport);
        if (!hovered) {
            scrollToNextSlide(carousel, list[i], isLast);
            const nextButton = isLast ? radioArray[0] : radioArray[i+1];
            nextButton.checked = true;
            updateNavigation(navArray, radioArray);
        }
        if (isLast) {
            i = -1; // i++ makes it 0 at the end of the loop
        }    
    }
}

const slidesArray = document.getElementsByClassName("slide");
const navArray = document.getElementsByClassName("slider-nav-item");
const radioArray = document.getElementsByClassName("slider-nav-button");
const carousel = document.getElementById("slider");
const viewport = document.getElementById("viewport-wrap");

for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].addEventListener("click", (e) => {
        updateNavigation(navArray, radioArray);
        manuallyScroll(carousel, i, slidesArray[0].offsetWidth);
    });
}

console.log(carousel);
console.log(slidesArray);

/*while(true) {
    await sleep(4000);
    const hovered = checkHoverStatus(viewport);
    if (!hovered) {
        console.log(loopSlides.next().value);
    }
}*/

loopSlides(viewport, carousel, slidesArray, navArray, radioArray);
