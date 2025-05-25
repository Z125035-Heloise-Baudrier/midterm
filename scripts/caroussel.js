document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger"); //hamburger menu
    const navMenu = document.querySelector(".nav-menu"); // navigation menu
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");//sublist of projects
    // Hamburger toggle handling click
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");//change the active class
        });
    }
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();//avoid the link to go to projects section
            const dropdown = toggle.closest('.dropdown');//find the parent dropdown
            document.querySelectorAll(".dropdown.active").forEach(d => {
                if (d !== dropdown) d.classList.remove("active");
            });//close all dropdown expect the one chosen,
            dropdown.classList.toggle("active"); // close or open the chosen dropdown
        });
    });
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown") && !e.target.closest(".hamburger")) {
            document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
        }
    });//automatic closure of dropdown when clicking other place than a dropdown
    const carousel = document.querySelector('.carousel');//carousel
    const figures = document.querySelectorAll('.carousel figure');//carousel images
    //carousel arrows
    const prevBtn = document.querySelector('.carousel-arrow.left');
    const nextBtn = document.querySelector('.carousel-arrow.right');
    let index = 0;
    //updating images
    function updateCarousel() {
        const figure = figures[index];
        if (figure) {
            carousel.scrollTo({
                left: figure.offsetLeft,
                behavior: 'smooth'
            });
        }
    }
    //behavior of right arrow
    nextBtn.addEventListener('click', () => {
        if (index < figures.length - 1) {
            index++;
        } 
        else {
            index = 0;
        }
        updateCarousel();
    });
    //behavior of left arrow
    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
        } 
        else {
            index = figures.length - 1;
        }
        updateCarousel();
    });
});
