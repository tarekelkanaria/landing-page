/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/* make array of all sections on the page using spread operator and stored in varaible */
const allSections = [...document.querySelectorAll("section")];
/* select empty "ul" element and stored in variable */
const unOrderedList = document.querySelector("ul");
/* create document fragment for performance and stored in variable */
const container = document.createDocumentFragment();
/* create function to loop over all sections to create "li" elements and "a" elements
to make the navbar list */
const createNavList = (() => {
  allSections.forEach((section) => {
    const sectionElemnent = document.createElement("li");
    const linkElement = document.createElement("a");
    const sectionAddress = section.getAttribute("data-nav");
    const linkElementA = section.getAttribute("id");
    linkElement.href = `#${linkElementA}`;
    /* i added class from style.css file to "a" elements to add style to links in
    the navbar */
    linkElement.classList.add("menu__link");
    linkElement.textContent = sectionAddress;
    /* note: i use addEventListner below to scroll smoothly to appropriate
    section instead of href */
    linkElement.addEventListener("click", (evt) => {
        section.scrollIntoView({
          behavior: "smooth",
        });
        /* i use prevent default to stop href role by default */
        evt.preventDefault();
      },
      false
    );
    sectionElemnent.appendChild(linkElement);
    container.appendChild(sectionElemnent);
  });
})();
/* this document fragment for performance */
unOrderedList.appendChild(container);
/* select all "a" elements and stored in variable, add event scroll 
to know when the section in viewport then overloop allSections by using 
getBoundingClientRect to set the position of section relative to viewport,
then apply active class to sections and another for ...of loop to links */
const links = document.querySelectorAll("a");
window.addEventListener("scroll", (event) => {
  for (const section of allSections) {
    let sectionInView = section.getBoundingClientRect().top;
    if (sectionInView >= 0 && sectionInView <= 350) {
      section.classList.add("your-active-class");
      for (let link of links) {
        link.classList.remove("your-active-class");
        if (link.textContent === section.dataset.nav) {
          link.classList.add("your-active-class");
        } else {
          link.classList.remove("your-active-class");
        }
      }
    } else {
      section.classList.remove("your-active-class");
    }
  }
});

/* Toggle between adding and removing the "responsive" class to navbar when the user clicks on the icon */
function hamburger() {
  const hambMenu = document.getElementById("navbar__list");
  hambMenu.classList.add("navlist");
  if (hambMenu.className === "navlist") {
    hambMenu.className += " responsive";
  } else {
    hambMenu.className = "navlist";
  }
}

/* add to top button to scroll to top of the page */
function toTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
