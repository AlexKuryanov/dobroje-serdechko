const currentPage = window.location.pathname;
import "./mobile-menu.js";
import "./scroll-up.js";
if (currentPage === "/index.html") {
  import("./slider.js");
  import("./swiper.js");
}
