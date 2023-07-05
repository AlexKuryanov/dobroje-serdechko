const tohelpBtns = document.querySelectorAll(".tohelp-all-btn");
const volunteerBtns = document.querySelectorAll(".volunteer-btn");
const modals = document.querySelectorAll(".modal");
const donationPopup = document.querySelector(".modal-donation");
const volunteerPopup = document.querySelector(".modal-volunteer");
const closeBtns = document.querySelectorAll(".modal-close");
const userEmail = document.querySelector(".input-user-email");
const userName = document.querySelector(".input-user-name");
const donationForm = document.querySelector(".donation-form");

// let isStorageSupport = true;
// let storage = "";

// try {
//   storage = localStorage.getItem("user-email");
// } catch (err) {
//   isStorageSupport = false;
// }
function addClass(target) {
  target.classList.add("modal-show");
}

function removeClass(target) {
  target.classList.remove("modal-show");
}

tohelpBtns.forEach((tohelpBtn) => {
  tohelpBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addClass(donationPopup);

    // if (storage) {
    //   loginLogin.value = storage;
    // }
  });
});

volunteerBtns.forEach((volunteerBtn) => {
  volunteerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addClass(volunteerPopup);
  });
});
closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.target.parentElement.parentElement.classList.remove("modal-show");
  });
});

// donationForm.addEventListener("submit", function (e) {
// if (!userEmail.value || !userName.value) {
//   e.preventDefault();
// }
// else {
// if (isStorageSupport) {
// localStorage.setItem("user-email", userEmail.value);
// }
// }
// });

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    modals.forEach((modal) => {
      if (modal.classList.contains("modal-show")) {
        e.preventDefault();
        modal.classList.remove("modal-show");
      }
    });
  }
});
