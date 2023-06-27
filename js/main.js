const currentPage = document.URL.split("/").pop();
import "./mobile-menu.js";
import "./scroll-up.js";
if (currentPage === '' || currentPage === "index.html") {
  import("./slider.js");
  import("./swiper.js");
}
