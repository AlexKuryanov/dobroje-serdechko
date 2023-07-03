const tohelpBtn = document.querySelector(".tohelp-btn-all");
const donationPopup = document.querySelector(".modal-donation");
const closeBtn = document.querySelector(".modal-close");
const userEmail = document.querySelector(".input-user-email");
const userName = document.querySelector(".input-user-name");
const donationForm = document.querySelector(".donation-form");

let isStorageSupport = true;
let storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

// tohelpBtns.forEach((tohelpBtn) => {
tohelpBtn.addEventListener("click", function (e) {
  e.preventDefault();
  donationPopup.classList.add("modal-show");

  if (storage) {
    loginLogin.value = storage;
  }
});
// });

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  donationPopup.classList.remove("modal-show");
});

donationForm.addEventListener("submit", function (e) {
  if (!userEmail.value || !userName.value) {
    e.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem("user-email", userEmail.value);
    }
  }
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (donationPopup.classList.contains("modal-show")) {
      e.preventDefault();
      donationPopup.classList.remove("modal-show");
    }
  }
});
