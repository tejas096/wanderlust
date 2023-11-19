(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
let listings = document.querySelectorAll(".listing-link");
let search = document.querySelector("#search");
if (window.location.href != "https://wanderlust-yby2.onrender.com/listings") {
  search.classList.add("display-none");
} else {
  search.classList.remove("display-none");
}
search.addEventListener("input", (e) => {
  for (let listing of listings) {
    if (
      listing.children[0].children[1].children[0].children[0].innerText
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    ) {
      listing.classList.remove("display-none");
    } else {
      listing.classList.add("display-none");
    }
  }
});
let buttons = document.querySelectorAll(".filter");
for (let button of buttons) {
  button.addEventListener("click", (e) => {
    for (let listing of listings) {
      if (
        button.children[1].innerHTML ==
        listing.children[0].children[1].children[0].children[5].innerText
      ) {
        listing.classList.remove("display-none");
        listing.children[0].children[1].children[0].children[5].classList.remove(
          "display-none"
        );
      } else {
        listing.classList.add("display-none");
        listing.children[0].children[1].children[0].children[5].classList.add(
          "display-none"
        );
      }
    }
  });
}
let navbar = document.querySelector(".navbar-toggler");
navbar.addEventListener("click", (e) => {
  navbar.parentElement.parentElement.classList.toggle("height-increaser");
  if (window.location.href == "https://wanderlust-yby2.onrender.com/listings") {
    search.classList.toggle("display-none");
  }
});
let i = 0;
let swi = document.querySelector(".form-check-input");
swi.addEventListener("click", (e) => {
  for (let listing of listings) {
    if (i == 0) {
      let newNumber =
        Number(
          listing.children[0].children[1].children[0].children[2].innerText
        ) +
        Number(
          listing.children[0].children[1].children[0].children[2].innerText
        ) *
          0.18;
      listing.children[0].children[1].children[0].children[2].innerText =
        newNumber.toLocaleString("en-IN");
    }
    listing.children[0].children[1].children[0].children[2].classList.toggle(
      "display-none"
    );
    listing.children[0].children[1].children[0].children[3].classList.toggle(
      "display-none"
    );
  }
  i = 1;
});
