const currentPage = document.URL.split("/").pop().split("#")[0];
import "./mobile-menu.js";
import "./scroll-up.js";
import "./modals.js";
if (currentPage === "" || currentPage === "index.html") {
  import("./slider.js");
  import("./swiper.js");
}
