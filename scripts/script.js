// Project data
const projects = [
  {
    id: "1",
    title: "E-commerce Website",
    description: "A fully responsive e-commerce platform with shopping cart functionality.",
    longDescription: "This project is a complete e-commerce solution with product listings, user authentication, payment integration, and a dynamic shopping cart.",
    link_To_Demo: "https://your-ecommerce-demo-link.com",
    link_To_code: "https://github.com/yourusername/ecommerce-project",
    image: "https://images.pexels.com/photos/26772101/pexels-photo-26772101/free-photo-of-talons-hauts-hauts-talons-cuir-bottes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "web"
  },
  {
    id: "2",
    title: "Restaurant Website",
    description: "Website for a local restaurant featuring menu, reservations, and delivery options.",
    longDescription: "A modern website designed for a restaurant, including an interactive menu, online reservations, and an ordering system for food delivery.",
    link_To_Demo: "https://your-restaurant-demo-link.com",
    link_To_code: "https://github.com/yourusername/restaurant-website",
    image: "https://images.pexels.com/photos/29021737/pexels-photo-29021737/free-photo-of-chef-servant-une-pizza-aux-champignons-fraichement-cuite.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "web"
  },
  {
    id: "3",
    title: "Blog Platform",
    description: "Custom blog platform with content management system and user authentication.",
    longDescription: "A self-hosted blogging platform where users can write, edit, and publish articles. Includes authentication, categories, and a commenting system.",
    link_To_Demo: "https://your-blog-demo-link.com",
    link_To_code: "https://github.com/yourusername/blog-platform",
    image: "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "app"
  },
  {
    id: "4",
    title: "Portfolio Template",
    description: "Customizable portfolio website template for designers and developers.",
    longDescription: "A fully responsive and customizable portfolio template to showcase projects and personal details, ideal for developers and designers.",
    link_To_Demo: "https://your-portfolio-demo-link.com",
    link_To_code: "https://github.com/yourusername/portfolio-template",
    image: "https://img.freepik.com/vecteurs-libre/conception-modele-portefeuille-design-plat_52683-80880.jpg",
    category: "web"
  },
  {
    id: "6",
    title: "Weather Dashboard",
    description: "Real-time weather application with forecast data and location-based services.",
    longDescription: "A web app that fetches real-time weather data for any city, displaying forecasts, temperature, humidity, and wind speed using an external API.",
    link_To_Demo: "https://your-weather-demo-link.com",
    link_To_code: "https://github.com/yourusername/weather-dashboard",
    image: "https://img.freepik.com/premium-psd/psd-weather-dashboard-templtae_908119-19.jpg",
    category: "app"
  },
];

// DOM element references
const projectsContainer = document.getElementById("projectsContainer");
const filterButtons = document.querySelectorAll('.filter-btn');
const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.mobile');
const skillBars = document.querySelectorAll('.skill-bar');
const revealElements = document.querySelectorAll('.reveal');

// Handle project filtering and rendering
let currentFilter = 'all';

function filterProjects(category) {
  currentFilter = category;
  const filteredProjects = category === 'all' 
    ? projects 
    : projects.filter(project => project.category === category);
  
  renderProjects(filteredProjects);
  
  // Update active filter button
  filterButtons.forEach(button => {
    if (button.getAttribute('data-filter') === category) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function renderProjects(projectsToRender = projects) {
  projectsContainer.innerHTML = "";

  projectsToRender.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.setAttribute('data-aos', 'fade-up');
    projectCard.style.setProperty('--order', index);
    
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <button class="btn view-project" data-id="${project.id}">View Project</button>
      </div>
    `;
    
    projectsContainer.appendChild(projectCard);
  });

  // Add event listeners for project buttons
  document.querySelectorAll(".view-project").forEach((button) => {
    button.addEventListener("click", (e) => {
      const projectId = e.target.getAttribute("data-id");
      const project = projects.find((p) => p.id === projectId);
      showProjectDetails(project);
    });
  });
  
  // Initialize 3D tilt effect
  addTiltEffect();
  
  // Trigger animation
  setTimeout(() => {
    document.querySelectorAll('[data-aos="fade-up"]').forEach(el => {
      el.classList.add('aos-animate');
    });
  }, 100);
}

function showProjectDetails(project) {
  if (!project) return;

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${project.image}" alt="${project.title}">
      <div class="modal-info">
        <h2>${project.title}</h2>
        <p>${project.longDescription}</p>
        <div class="modal-buttons">
          <a href="${project.link_To_Demo}" class="btn btn-primary" target="_blank">Live Demo</a>
          <a href="${project.link_To_code}" class="btn btn-outline" target="_blank">Source Code</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  // Prevent background scrolling when modal is open
  document.body.style.overflow = 'hidden';
  
  // Close modal with button
  modal.querySelector(".close").addEventListener("click", () => {
    closeModal(modal);
  });
  
  // Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
  
  // Close modal with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  });
}

function closeModal(modal) {
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.remove();
    document.body.style.overflow = '';
  }, 300);
}

function addTiltEffect() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;

      const rotateX = (mouseY / (cardRect.height / 2)) * -8;
      const rotateY = (mouseX / (cardRect.width / 2)) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Header and scroll effects
function handleScrollEffects() {
  const scrollY = window.scrollY;
  
  // Sticky header
  if (scrollY > 100) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
  
  // Update progress bar
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollY / maxScroll) * 100;
  document.querySelector('.progress-bar').style.width = `${scrollPercentage}%`;
  
  // Reveal elements on scroll
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
  
  // Animate skill bars
  skillBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (barTop < windowHeight - 50) {
      const level = bar.getAttribute('data-level');
      bar.style.width = level;
    }
  });
}

// Form handling
function setupContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('nameForm').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Form validation is successful, show success message
      // In a real application, you would send this data to your server
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      contactForm.reset();
    });
  }
}

// Mobile menu
function setupMobileMenu() {
  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('activeMenu');
    menuButton.innerHTML = navLinks.classList.contains('activeMenu') ? 
      '<i class="fas fa-times"></i>' : 
      '<i class="fas fa-bars"></i>';
  });

  // Close menu when clicking a link
  document.querySelectorAll('.mobile a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('activeMenu');
      menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && e.target !== menuButton) {
      navLinks.classList.remove('active');
      menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}

// Smooth scrolling
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize everything on document load
document.addEventListener('DOMContentLoaded', () => {
  // Set animation order for elements with staggered animations
  document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.setProperty('--order', index);
  });
  
  document.querySelectorAll('.form-group').forEach((group, index) => {
    group.style.setProperty('--order', index);
  });
  
  // Initialize components
  renderProjects();
  setupMobileMenu();
  setupSmoothScroll();
  setupContactForm();
  
  // Add event listeners for filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-filter');
      filterProjects(category);
    });
  });
  
  // Create scroll progress indicator if it doesn't exist
  if (!document.querySelector('.scroll-progress')) {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    progressBar.innerHTML = '<div class="progress-bar"></div>';
    document.body.appendChild(progressBar);
  }
  
  // Initial scroll effects call
  handleScrollEffects();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScrollEffects);
});