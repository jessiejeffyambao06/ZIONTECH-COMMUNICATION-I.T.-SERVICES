document.addEventListener("DOMContentLoaded", function () {
    // Elements na may fade-in effect kapag nag-scroll
    const sections = document.querySelectorAll(
        ".hero, .header, .text-content .about-tit1, .text-content .about-p1, " +
        ".text-content .about-tit2, .text-content .about-p2, .company-image img, " +
        ".brandname, .brand-swiper-container, .solutions-container .misvistitle, " +
        ".solutions-content, .mivi-container, .contact-container, .contactinfo, .head, .prime, " +
        ".mivi-container .box .mi-tit, .mivi-container .box .mi-p, .mivi-container .box .mi-pic, " +
        ".mivi-container .box .vi-tit, .mivi-container .box .vi-p, .mivi-container .box .vi-pic, " +
        ".feedback-card1, .feedback-card2, .feedback-section h2, .feedback-text1, .feedback-author1 h4, " +
        ".feedback-text2, .feedback-author2 h4"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Optimize: Stop observing once visible
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(el => observer.observe(el));

    // Contact Form Submission Handling
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const formData = new FormData(this);

            try {
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    document.getElementById("successMessage").style.display = "block";
                    this.reset();
                } else {
                    alert("❌ Failed to send message. Try again later.");
                }
            } catch (error) {
                alert("❌ Error: " + error.message);
            }
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const closeBtn = document.getElementById("close-btn");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => navMenu.classList.add("show"));
        if (closeBtn) closeBtn.addEventListener("click", () => navMenu.classList.remove("show"));
    }

    // Smooth scrolling at auto-close menu kapag nag-click sa nav link
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", function(event) {
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                event.preventDefault();
                
                // Mas mabilis na smooth scrolling
                requestAnimationFrame(() => {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                });

                // Close mobile menu after clicking a link
                navMenu.classList.remove("show");
            }
        });
    });

    // Auto-close menu kapag nag-scroll
    window.addEventListener("scroll", () => navMenu.classList.remove("show"));

    // Auto-close menu kapag nag-click sa labas
    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove("show");
        }
    });

    // Header Fade-In Animation on Load
    const header = document.querySelector(".header");
    if (header) header.classList.add("show");
});

// SwiperJS Initialization (HIWALAY na sa `DOMContentLoaded`)
document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".brand-swiper-container", {
        slidesPerView: "auto",
        spaceBetween: 50,
        loop: true,
        centeredSlides: true,
        speed: 2000, // Pinabilis ang transition speed
        autoplay: { delay: 0, disableOnInteraction: false },
        allowTouchMove: false,
    });
});
