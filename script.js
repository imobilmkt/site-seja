/* ==========================================================================
   SEJA CONSTRUTORA — LANDING PAGE
   JavaScript puro, sem dependências.
   ========================================================================== */

const WHATSAPP_NUMBER = "5561999719185";
const WHATSAPP_MESSAGE = "Olá! Vim pelo site da Seja e quero conversar sobre uma obra.";

function buildWhatsAppLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Gera todos os links de WhatsApp a partir da constante única ---------- */
  const whatsappLink = buildWhatsAppLink();
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.setAttribute("href", whatsappLink);
  });

  /* ---------- Menu mobile ---------- */
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("main-nav");
  const navBackdrop = document.getElementById("nav-backdrop");
  const navLinks = mainNav.querySelectorAll(".nav-link");

  function openMenu() {
    mainNav.classList.add("is-open");
    navBackdrop.classList.add("is-open");
    hamburger.classList.add("is-active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mainNav.classList.remove("is-open");
    navBackdrop.classList.remove("is-open");
    hamburger.classList.remove("is-active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    mainNav.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  navBackdrop.addEventListener("click", closeMenu);
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  /* ---------- Header: leve sombra ao rolar ---------- */
  const header = document.getElementById("site-header");
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 12 ? "0 2px 16px rgba(17,17,17,0.08)" : "none";
  });

  /* ---------- Fade-in ao rolar (Intersection Observer) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Carrossel de depoimentos ---------- */
  const track = document.getElementById("testimonial-track");
  const slides = Array.from(track.querySelectorAll(".testimonial-slide"));
  const dotsContainer = document.getElementById("testimonial-dots");
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  let currentSlide = 0;
  let autoplayTimer = null;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("testimonial-dot");
    dot.setAttribute("aria-label", `Ir para depoimento ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.querySelectorAll(".testimonial-dot"));

  function goToSlide(index) {
    slides[currentSlide].classList.remove("is-active");
    dots[currentSlide].classList.remove("is-active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("is-active");
    dots[currentSlide].classList.add("is-active");
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  prevBtn.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
    stopAutoplay();
    startAutoplay();
  });
  nextBtn.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
    stopAutoplay();
    startAutoplay();
  });

  const carousel = document.getElementById("testimonial-carousel");
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  goToSlide(0);
  startAutoplay();

  /* ---------- Ano no rodapé ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
