// Create particle system
function createParticleSystem() {
  const particleSystem = document.getElementById("particleSystem")

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 20 + "s"
    particle.style.animationDuration = 15 + Math.random() * 10 + "s"
    particleSystem.appendChild(particle)
  }
}

// Enhanced scroll animations with different effects
function initializeEnhancedAnimations() {
  const elements = document.querySelectorAll(".scroll-animation")

  elements.forEach((el, index) => {
    // Add different animation types based on index
    if (index % 4 === 0) el.classList.add("slide-left")
    else if (index % 4 === 1) el.classList.add("slide-right")
    else if (index % 4 === 2) el.classList.add("zoom-in")
    // Default is slide up
  })
}

// Magnetic button effect
function addMagneticEffect() {
  const magneticElements = document.querySelectorAll(".magnetic-btn")

  magneticElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`
    })

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0px, 0px) scale(1)"
    })
  })
}

// SIMPLIFIED PORTFOLIO FILTERING
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

// SIMPLIFIED VIDEO FUNCTIONALITY
function initializeVideos() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach((item) => {
    const video = item.querySelector('.portfolio-video');
    const playBtn = item.querySelector('.play-btn');
    
    if (video && playBtn) {
      // Set up video
      video.muted = true;
      video.loop = true;
      
      // Try to autoplay
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Auto-play was prevented:', error);
        });
      }
      
      // Play button click handler
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play();
          playBtn.innerHTML = '⏸';
        } else {
          video.pause();
          playBtn.innerHTML = '▶';
        }
      });
      
      // Update play button based on video state
      video.addEventListener('play', () => {
        playBtn.innerHTML = '⏸';
      });
      
      video.addEventListener('pause', () => {
        playBtn.innerHTML = '▶';
      });
      
      // Handle intersection observer for autoplay
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.5 });
      
      videoObserver.observe(item);
    }
  });
}

// Interactive showcase functionality
function initializeShowcase() {
  const showcaseItems = document.querySelectorAll(".showcase-item")

  showcaseItems.forEach((item) => {
    item.addEventListener("click", () => {
      showcaseItems.forEach((i) => i.classList.remove("active"))
      item.classList.add("active")
    })
  })
}

// Footer functionality
function scheduleConsultation() {
  alert(
    "Schedule Consultation\n\nThis would open a booking form or calendar widget where clients can:\n• Select preferred date/time\n• Choose consultation type\n• Provide project details\n• Book a free 30-minute consultation",
  )
}

function subscribeNewsletter(event) {
  event.preventDefault()
  const email = document.getElementById("newsletterEmail").value
  const messageDiv = document.getElementById("newsletter-message")

  if (email) {
    messageDiv.textContent = "Thank you for subscribing! You'll receive our latest insights and updates."
    messageDiv.className = "newsletter-message success"
    messageDiv.style.display = "block"
    document.getElementById("newsletterEmail").value = ""

    setTimeout(() => {
      messageDiv.style.display = "none"
    }, 3000)
  } else {
    messageDiv.textContent = "Please enter a valid email address."
    messageDiv.className = "newsletter-message error"
    messageDiv.style.display = "block"
  }
}

function showIndustryInfo(industry) {
  const industryData = {
    automotive: "Automotive industry campaigns including car launches, dealer activations, and auto show exhibitions.",
    fmcg: "Fast-moving consumer goods marketing including product launches, sampling campaigns, and retail activations.",
    tech: "Technology sector marketing including product demonstrations, conference exhibitions, and digital campaigns.",
    banking:
      "Financial services marketing including branch openings, product launches, and customer engagement events.",
    pharma:
      "Pharmaceutical marketing including medical conferences, product education, and healthcare professional events.",
    "real-estate": "Real estate marketing including property launches, sales centers, and investor presentations.",
  }

  alert(
    `${industry.toUpperCase()} INDUSTRY\n\n${industryData[industry] || "Specialized marketing solutions for this industry sector."}\n\nContact us to learn more about our industry-specific expertise and successful case studies.`,
  )
}

function showPortfolio() {
  document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" })
}

function showCaseStudies() {
  alert(
    "Case Studies\n\nDetailed case studies showcasing:\n• Campaign objectives and strategy\n• Execution and implementation\n• Results and ROI analysis\n• Client testimonials\n• Lessons learned",
  )
}

function showCareers() {
  alert(
    "Careers at TouchMedia\n\nJoin our growing team!\n\nCurrent opportunities:\n• Creative Designers\n• Event Managers\n• Production Specialists\n• Marketing Coordinators\n• Sales Representatives\n\nSend your CV to: careers@touchmediaint.net",
  )
}

function showPrivacyPolicy() {
  alert(
    "Privacy Policy\n\nTouchMedia is committed to protecting your privacy. We collect and use personal information only as necessary to provide our services and improve your experience.\n\nFor full privacy policy details, please contact us.",
  )
}

function showTerms() {
  alert(
    "Terms of Service\n\nBy using TouchMedia services, you agree to our terms and conditions. These terms govern the use of our website and services.\n\nFor complete terms, please contact our legal department.",
  )
}

// Mobile navigation functionality
const mobileNavToggle = document.getElementById("mobileNavToggle")
const navLinks = document.querySelector(".nav-links")
if (mobileNavToggle && navLinks) {
  mobileNavToggle.addEventListener("click", () => {
    mobileNavToggle.classList.toggle("active")
    navLinks.classList.toggle("mobile-open")
  })

  // Close mobile nav when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNavToggle.classList.remove("active")
      navLinks.classList.remove("mobile-open")
    })
  })

  // Close mobile nav when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav")) {
      mobileNavToggle.classList.remove("active")
      navLinks.classList.remove("mobile-open")
    }
  })
}

// Preloader functionality
window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader")
    const mainSite = document.getElementById("mainSite")

    if (preloader) preloader.classList.add("hide")

    setTimeout(() => {
      if (preloader) preloader.style.display = "none"
      if (mainSite) mainSite.classList.add("show")
    }, 500)
  }, 2300)
})

// Simple smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Simplified scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

// Track scroll for header only
window.addEventListener("scroll", () => {
  // Header background on scroll
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(1, 0, 102, 0.98)"
      header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.3)"
    } else {
      header.style.background = "rgba(1, 0, 102, 0.95)"
      header.style.boxShadow = "none"
    }
  }
})

// Simple observer for scroll animations only
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("animate")
        entry.target.classList.add("section-visible")
      }, index * 100) // Stagger by 100ms
    }
  })
}, observerOptions)

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  createParticleSystem()
  initializeEnhancedAnimations()
  addMagneticEffect()
  initializeVideos() // New simplified video function
  initializeShowcase()

  // Portfolio category buttons
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.target.dataset.category
      filterPortfolio(category)
    })
  })

  // Apply simple observer to scroll animations only
  document.querySelectorAll(".scroll-animation").forEach((el) => {
    observer.observe(el)
  })

  // Make sure all sections are visible by default
  document.querySelectorAll(".page-transition").forEach((section) => {
    section.style.opacity = "1"
    section.style.transform = "translateY(0)"
  })

  // Optimize animations for better performance
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  if (reducedMotion.matches) {
    document.body.style.setProperty("--animation-duration", "0.01s")
  }
})