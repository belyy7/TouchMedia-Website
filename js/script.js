// Enhanced scroll animations with different effects
function initializeEnhancedAnimations() {
  const elements = document.querySelectorAll(".scroll-animation");

  elements.forEach((el, index) => {
    // Add different animation types based on index
    if (index % 4 === 0) el.classList.add("slide-left");
    else if (index % 4 === 1) el.classList.add("slide-right");
    else if (index % 4 === 2) el.classList.add("zoom-in");
    // Default is slide up
  });
}

// Magnetic button effect
function addMagneticEffect() {
  const magneticElements = document.querySelectorAll(".magnetic-btn");

  magneticElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0px, 0px) scale(1)";
    });
  });
}

// Portfolio filtering
function filterPortfolio(category) {
  const categoryBtns = document.querySelectorAll(".category-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  // Update active button
  categoryBtns.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Filter items with smooth animation
  portfolioItems.forEach((item, index) => {
    if (category === "all" || item.dataset.category === category) {
      setTimeout(() => {
        item.classList.add("show");
      }, index * 100); // Staggered animation
    } else {
      item.classList.remove("show");
    }
  });
}

// Video functionality
function initializeVideos() {
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  portfolioItems.forEach((item) => {
    const video = item.querySelector(".portfolio-video");
    const playBtn = item.querySelector(".play-btn");

    if (video && playBtn) {
      // Set up video
      video.muted = true;
      video.loop = true;

      // Try to autoplay
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Auto-play was prevented:", error);
        });
      }

      // Play button click handler
      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play();
          playBtn.innerHTML = "⏸";
        } else {
          video.pause();
          playBtn.innerHTML = "▶";
        }
      });

      // Update play button based on video state
      video.addEventListener("play", () => {
        playBtn.innerHTML = "⏸";
      });

      video.addEventListener("pause", () => {
        playBtn.innerHTML = "▶";
      });

      // Handle intersection observer for autoplay
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );

      videoObserver.observe(item);
    }
  });
}

// Interactive showcase functionality
function initializeShowcase() {
  const showcaseItems = document.querySelectorAll(".showcase-item");

  showcaseItems.forEach((item) => {
    item.addEventListener("click", () => {
      showcaseItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
}

// Create floating dot
function createFloatingDot(container) {
  const dot = document.createElement("div");
  dot.className = "floating-dot";

  // Random horizontal position
  dot.style.left = Math.random() * 100 + "%";

  // Random animation delay and duration
  dot.style.animationDelay = Math.random() * 15 + "s";
  dot.style.animationDuration = 12 + Math.random() * 6 + "s";

  container.appendChild(dot);

  // Remove dot after animation completes
  setTimeout(() => {
    if (dot.parentNode) {
      dot.parentNode.removeChild(dot);
    }
  }, 20000);
}

// Create animated dot background
function createDotBackground() {
  const dotBackground = document.getElementById("dotBackground");
  if (!dotBackground) return;

  // Create more initial dots for better visibility
  for (let i = 0; i < 50; i++) {
    createFloatingDot(dotBackground);
  }

  // Create some immediate dots with no delay for instant visibility
  for (let i = 0; i < 10; i++) {
    const dot = document.createElement("div");
    dot.className = "floating-dot";
    dot.style.left = Math.random() * 100 + "%";
    dot.style.animationDelay = "0s";
    dot.style.animationDuration = "15s";
    dotBackground.appendChild(dot);
  }

  // Continuously add new dots
  setInterval(() => {
    if (dotBackground.children.length < 60) {
      createFloatingDot(dotBackground);
    }
  }, 1500);
}

// Show dot background after preloader
function showDotBackground() {
  const dotBackground = document.getElementById("dotBackground");
  if (dotBackground) {
    dotBackground.classList.add("show");
    // Start creating dots immediately
    createDotBackground();
  }
}

// Scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("animate");
        entry.target.classList.add("section-visible");
      }, index * 100); // Stagger by 100ms
    }
  });
}, observerOptions);

// Preloader functionality
window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    const mainSite = document.getElementById("mainSite");

    if (preloader) preloader.classList.add("hide");

    setTimeout(() => {
      if (preloader) preloader.style.display = "none";
      if (mainSite) mainSite.classList.add("show");

      // Show dot background after preloader finishes
      setTimeout(() => {
        showDotBackground();
      }, 300);
    }, 500);
  }, 1500);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll for header
window.addEventListener("scroll", () => {
  // Header background on scroll
  const header = document.querySelector(".header");
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(1, 0, 102, 0.98)";
      header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.3)";
    } else {
      header.style.background = "rgba(1, 0, 102, 0.95)";
      header.style.boxShadow = "none";
    }
  }
});

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize core functions
  initializeEnhancedAnimations();
  addMagneticEffect();
  initializeVideos();
  initializeShowcase();

  // Mobile navigation setup
  const mobileNavToggle = document.getElementById("mobileNavToggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener("click", () => {
      mobileNavToggle.classList.toggle("active");
      navLinks.classList.toggle("mobile-open");
    });

    // Close mobile nav when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNavToggle.classList.remove("active");
        navLinks.classList.remove("mobile-open");
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".nav")) {
        mobileNavToggle.classList.remove("active");
        navLinks.classList.remove("mobile-open");
      }
    });
  }

  // Portfolio category buttons
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      filterPortfolio(category);
    });
  });

  // Apply observer to scroll animations
  document.querySelectorAll(".scroll-animation").forEach((el) => {
    observer.observe(el);
  });

  // Make sure all sections are visible by default
  document.querySelectorAll(".page-transition").forEach((section) => {
    section.style.opacity = "1";
    section.style.transform = "translateY(0)";
  });

  // Optimize animations for reduced motion
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) {
    document.body.style.setProperty("--animation-duration", "0.01s");
  }
});
