//waiting for DOM to charge
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger"); //hamburger menu
    const navMenu = document.querySelector(".nav-menu"); // navigation menu
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");//sublist of projects
    const container = document.getElementById('book-bars');//container where we put bars
    const legendHTML = `
        <div class="book-legend">
            <span><span class="legend-color dystopie"></span> Dystopia</span>
            <span><span class="legend-color horror"></span> Horror</span>
            <span><span class="legend-color thriller"></span> Thriller</span>
        </div>
    `;
    const books = [
        { title: "1984", author: "George Orwell", height: 220, description: "A dystopian novel on surveillance and control.", link: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four", genre: "dystopie" },
        { title: "The Exorcist", author: "William Peter Blatty", height: 180, description: "A frightening tale of demonic possession.", link: "https://en.wikipedia.org/wiki/The_Exorcist_(novel)", genre: "horror" },
        { title: "Thérèse Raquin", author: "Émile Zola", height: 140, description: "A dark psychological drama of guilt and passion.", link: "https://en.wikipedia.org/wiki/Thérèse_Raquin", genre: "thriller" },
        { title: "Da Vinci Code", author: "Dan Brown", height: 100, description: "A thrilling puzzle about symbols across Europe.", link: "https://en.wikipedia.org/wiki/The_Da_Vinci_Code", genre: "thriller" },
        { title: "Métro 2033", author: "Dmitry Glukhovsky", height: 80, description: "Post-apocalyptic survival in Moscow's metro.", link: "https://en.wikipedia.org/wiki/Metro_2033_(novel)", genre: "dystopie" }
    ];//table of books
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
    books.forEach((book, index) => {
        const barWrapper = document.createElement('div');//create container
        barWrapper.className = 'bar-container';
        barWrapper.innerHTML = `
            <div class="bar" style="height: ${book.height}px;"></div>
            <div class="book-info">
                <span class="book-rank" aria-label="Rank">#${index + 1}</span>
                <div class="title-with-icon">
                    <span class="book-icon ${book.genre}">
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </span>
                    <h3 class="book-title">${book.title}</h3>
                </div>
                <span class="book-author">by ${book.author}</span>
                <p class="book-description">${book.description}</p>
                <a href="${book.link}" class="book-link" target="_blank">More info</a>
            </div>
        `;//injecting HTML with the bar and books infos
        container.appendChild(barWrapper);
    });
    if (!document.querySelector('.book-legend')) {
        container.insertAdjacentHTML('afterend', legendHTML);
    }//create legend for genre if it does not exist
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('grow-in');
                observer.unobserve(entry.target);
            }
        });
    }, 
    { threshold: 0.5 });//add grow in class when bar is visible at least 50%
    const bars = document.querySelectorAll(".bar");
    bars.forEach(bar => observer.observe(bar));//stop the observing
    
    });
