// =============================
// Portfolio JavaScript — Neeraj Kumar
// =============================

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {

  // === Mobile Navigation Toggle ===
  const hamb = document.getElementById("hamb");
  const navlinks = document.querySelector(".navlinks");
  const header = document.querySelector("header");

  if (hamb && navlinks) {
    // Accessibility attributes
    hamb.setAttribute("aria-controls", "primary-nav");
    hamb.setAttribute("aria-expanded", "false");
    navlinks.id = "primary-nav";

    function openMenu() {
      navlinks.classList.add("open");
      hamb.setAttribute("aria-expanded", "true");
      header.classList.add("nav-open");
    }

    function closeMenu() {
      navlinks.classList.remove("open");
      hamb.setAttribute("aria-expanded", "false");
      header.classList.remove("nav-open");
    }

    function toggleMenu() {
      if (navlinks.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Toggle when clicking hamburger
    hamb.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu if clicked outside
    document.addEventListener("click", (e) => {
      if (!navlinks.contains(e.target) && !hamb.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });

    // Reset menu on resize (prevent stuck-open)
    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) {
        closeMenu();
      }
    });
  }

  // === Smooth Scroll with Header Offset ===
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
      // close menu after clicking link on mobile
      navlinks?.classList.remove("open");
      hamb?.setAttribute("aria-expanded", "false");
    });
  });

  // === WhatsApp Form Integration ===
  function sendWhatsApp(e) {
    e.preventDefault();

    const phoneNumber = "917878770940"; // Your WhatsApp number (no + or spaces)
    const name = document.getElementById("wa_name")?.value.trim() || "";
    const email = document.getElementById("wa_email")?.value.trim() || "";
    const subject = document.getElementById("wa_subject")?.value.trim() || "";
    const message = document.getElementById("wa_message")?.value.trim() || "";

    if (!name || !email || !message) {
      alert("Please fill your name, email, and message before sending.");
      return false;
    }

    const lines = [
      `*New message from portfolio contact form*`,
      `Name: ${name}`,
      `Email: ${email}`,
      subject ? `Subject: ${subject}` : null,
      `Message:`,
      message,
    ].filter(Boolean);

    const fullText = lines.join("\n\n");
    const encodedText = encodeURIComponent(fullText);

    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    const fallbackUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

    try {
      const win = window.open(waUrl, "_blank", "noopener,noreferrer");
      if (!win) {
        window.location.href = fallbackUrl;
      }
    } catch (err) {
      window.location.href = fallbackUrl;
    }

    e.target.reset();
    return false;
  }

  // attach WhatsApp handler if form exists
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", sendWhatsApp);
  }

  // === Fade-Up Animation Delay ===
  document.querySelectorAll(".fade-up").forEach((el, i) => {
    el.style.animationDelay = i * 80 + "ms";
  });
});
