const radios = document.querySelectorAll("input[type=radio]");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const dots = document.querySelectorAll(".labels label");
let checkedIndex = 0;
let hovered = false;
function updateCheckedIndex() {
  checkedIndex = [...radios].findIndex((radio) => radio.checked);
  console.log(checkedIndex);
}
function prevSlide() {
  dots[checkedIndex].classList.remove("checked");
  if (checkedIndex > 0) {
    checkedIndex--;
  } else {
    checkedIndex = radios.length - 1;
  }
  dots[checkedIndex].classList.add("checked");
  radios[checkedIndex].checked = true;
}
function nextSlide() {
  dots[checkedIndex].classList.remove("checked");
  if (checkedIndex < radios.length - 1) {
    checkedIndex++;
  } else {
    checkedIndex = 0;
  }
  dots[checkedIndex].classList.add("checked");
  radios[checkedIndex].checked = true;
}

const slides = document.querySelector(".slider");
let startX = null;
function handleTouchStart(e) {
  startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
  let endX = e.changedTouches[0].clientX;
  let diffX = endX - startX;
  if (diffX > 0) {
    prevSlide();
  } else if (diffX < 0) {
    nextSlide();
  }
}
slides.addEventListener("touchstart", handleTouchStart);
slides.addEventListener("touchend", handleTouchEnd);
dots.forEach((el) => {
  el.addEventListener("click", (e) => {
    document.querySelector(".labels label.checked").classList.remove("checked");
    e.target.classList.add("checked");
    setTimeout(updateCheckedIndex, 10);
  });
});
slides.addEventListener("mouseover", () => {
  hovered = true;
});
slides.addEventListener("mouseout", () => {
  hovered = false;
});
setInterval(() => {
  nextSlide();
}, 10000);
