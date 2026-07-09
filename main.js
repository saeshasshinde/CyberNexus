document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initLoader();
  initCustomCursor();
  initCanvasParticles();
  initStickyHeader();
  initMobileMenu();
  initScrollReveal();
  initStatsCounters();
  initTimelineScroll();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================
   1. LOADING SCREEN TIMEOUT
   ========================================== */
function initLoader() {
  const loader = document.querySelector('.loader-wrapper');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 2000); // Gives time to complete load animation
    });

    // Fallback: load anyway if window load takes too long
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 4000);
  }
}

/* ==========================================
   2. CUSTOM GLOW CURSOR LOGIC
   ========================================== */
function initCustomCursor() {
  const cursorDot = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (!cursorDot || !cursorFollower) return;

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Smooth lerp animation for the follower ring
  function animateFollower() {
    const ease = 0.15;
    followerX += (mouseX - followerX) * ease;
    followerY += (mouseY - followerY) * ease;

    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;

    requestAnimationFrame(animateFollower);
  }
  requestAnimationFrame(animateFollower);

  // Hover states
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .accordion-header, .timeline-item, .timeline-nav-btn');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovered');
    });
  });
}

/* ==========================================
   3. BACKGROUND INTERACTIVE CANVAS PARTICLES
   ========================================== */
function initCanvasParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const mouse = {
    x: null,
    y: null,
    radius: 120
  };

  // Track window resizing
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  // Track mouse coordinates for hover connections
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Class
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow blur
    }

    update() {
      // Bounce off borders
      if (this.x > width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // Check mouse collision/push effect
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
          // Push particles gently away
          const force = (mouse.radius - distance) / mouse.radius;
          const forceX = (dx / distance) * force * 3;
          const forceY = (dy / distance) * force * 3;

          this.x -= forceX;
          this.y -= forceY;
        }
      }

      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  // Populate particles array
  function initParticles() {
    particlesArray = [];
    // Number of particles relative to screen size
    const numberOfParticles = Math.floor((width * height) / 14000);
    const particleColors = ['rgba(0, 240, 255, 0.45)', 'rgba(188, 0, 221, 0.35)', 'rgba(0, 114, 255, 0.4)'];

    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 2 + 1;
      let x = Math.random() * (width - size * 2) + size;
      let y = Math.random() * (height - size * 2) + size;
      let directionX = (Math.random() * 0.4) - 0.2;
      let directionY = (Math.random() * 0.4) - 0.2;
      let color = particleColors[Math.floor(Math.random() * particleColors.length)];

      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  // Connect particles close to each other
  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 90) {
          opacityValue = 1 - (distance / 90);
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue * 0.15})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}

/* ==========================================
   4. STICKY HEADER SCROLL TRANSITION
   ========================================== */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/* ==========================================
   5. MOBILE SLIDEOUT NAVIGATION MENU
   ========================================== */
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navbar.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navbar.classList.remove('active');
      });
    });
  }
}

/* ==========================================
   6. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Unobserve once revealed to keep layout performing fast
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
}

/* ==========================================
   7. STATS DYNAMIC COUNTER ANIMATION
   ========================================== */
function initStatsCounters() {
  const statsSection = document.getElementById('stats');
  const counters = document.querySelectorAll('.counter');
  
  if (!statsSection || counters.length === 0) return;

  let started = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const isFloat = counter.getAttribute('data-float') === 'true';
      let count = 0;
      
      // Calculate step dynamically based on target value
      const duration = 2000; // 2 seconds
      const frameRate = 1000 / 60; // 60fps
      const totalFrames = duration / frameRate;
      const step = target / totalFrames;

      const updateCount = () => {
        count += step;
        if (count < target) {
          if (isFloat) {
            counter.innerText = count.toFixed(2) + suffix;
          } else {
            counter.innerText = Math.floor(count) + suffix;
          }
          requestAnimationFrame(updateCount);
        } else {
          // Final exact print
          if (isFloat) {
            counter.innerText = count.toFixed(2) + suffix; // Fallback
            counter.innerText = target.toFixed(2) + suffix;
          } else {
            counter.innerText = target + suffix;
          }
        }
      };

      updateCount();
    });
  };

  // Trigger when scrolled into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        runCounters();
        started = true;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

/* ==========================================
   8. HORIZONTAL TIMELINE NAV BUTTONS
   ========================================== */
function initTimelineScroll() {
  const track = document.querySelector('.timeline-track');
  const prevBtn = document.getElementById('timeline-prev');
  const nextBtn = document.getElementById('timeline-next');

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 320; // Approx width of one item + gap

  nextBtn.addEventListener('click', () => {
    track.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });
}

/* ==========================================
   9. FAQ ACCORDION COLLAPSE/EXPAND
   ========================================== */
function initFaqAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const currentBody = currentItem.querySelector('.accordion-body');
      const isActive = currentItem.classList.contains('active');

      // Close all other accordion items first
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-body').style.maxHeight = null;
      });

      if (!isActive) {
        currentItem.classList.add('active');
        // Set dynamic max height using scroll height
        currentBody.style.maxHeight = `${currentBody.scrollHeight}px`;
      }
    });
  });
}

/* ==========================================
   10. CONTACT FORM MOCK SUBMISSION & VALIDATION
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const company = document.getElementById('contact-company').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Standard email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset styles
    statusMsg.className = 'form-status';
    statusMsg.style.display = 'none';

    if (!name || !email || !message) {
      statusMsg.innerText = 'Error: Please fill in all required fields.';
      statusMsg.classList.add('error');
      return;
    }

    if (!emailRegex.test(email)) {
      statusMsg.innerText = 'Error: Invalid cyber-neural node address (Email).';
      statusMsg.classList.add('error');
      return;
    }

    // Success Mock simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Connecting Neural Network... <span class="btn-icon">⚡</span>';

    setTimeout(() => {
      statusMsg.innerText = 'Transmission Successful: Neural Link Established.';
      statusMsg.classList.add('success');
      
      // Reset form
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }, 1800);
  });
}
