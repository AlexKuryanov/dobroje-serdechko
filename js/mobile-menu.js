const burgerOpenBtn = document.querySelector(".burger-open");
const burgerCloseBtn = document.querySelector(".burger-close");
const headerTop = document.querySelector(".header-top");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
const body = document.querySelector(".page-body");
const header = document.querySelector(".page-header");

burgerOpenBtn.addEventListener("click", menuOpen);
burgerCloseBtn.addEventListener("click", menuClose);

function menuOpen() {
  mobileMenu.classList.add("opened");
  burgerCloseBtn.classList.add("showed");
  body.classList.add("no-scroll");
}

function menuClose() {
  mobileMenu.classList.remove("opened");
  burgerCloseBtn.classList.remove("showed");
  body.classList.remove("no-scroll");
}

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", menuClose);
});
