// Portfolio data
const portfolioData = {
  "skills": {
    "technical": [
      {"name": "Decipher", "level": 90, "category": "Frontend"},
      {"name": "Python", "level": 85, "category": "Backend"},
      {"name": "HTML", "level": 95, "category": "Frontend"},
      {"name": "JavaScript", "level": 85, "category": "Frontend"},
      {"name": "CSS", "level": 96, "category": "Frontend"},
      {"name": "jQuery", "level": 70, "category": "Frontend"},

    ],
  
    "soft": [
      {"name": "Problem Solving", "level": 94},
      {"name": "Critical Thinking", "level": 95},
      {"name": "Communication", "level": 95},
      {"name": "Detail Oreinted", "level": 95},
      {"name": "Team Collaboration", "level": 90},
       {"name": "Problem Solving", "level": 90},
      {"name": "Project Management", "level": 95}
    ]
  },
  "experience": [
    {
      "company": "Nielsen",
      "position": "Techcinal Survey Analyst",
      "duration": "July 2024 - Present",
      "description": "Working at Nielsen for over a year, focusing on advanced survey programming and end-to-end project execution.",
      "achievements": [
        "Capable of independently handling diverse study types with end-to-end ownership.",
        "Achieved a 95% reduction in survey errors through process optimization and quality control improvements.",
        "Supporting clients such as LinkedIn, Spotify, and others with a wide range of tailored solutions to meet their unique needs."
      ],
      "technologies": ["Decipher", "Python", "JavaScript", "CSS", "jQuery"]
    },
    {
      "company": "Dynata",
      "position": "Survey Programmer",
      "duration": "Nov 2021 - July 2024",
      "description": "Gained 2.8 years of hands-on experience as a Survey Programmer, delivering customized survey solutions and supporting complex, multi-level studies for global clients.",
      "achievements": [
        "Delivered over 500 surveys for top-tier clients across diverse industries.",
        "Handled a range of longitudinal wave studies with consistent end-to-end support.",
        "Executed 50+ client-specific studies, ensuring all custom requirements were met with precision.",
        "Executed 3+ level studies independently, ensuring accuracy across all layers."
      ],
      "technologies": ["Decipher", "Python", "JavaScript", "CSS", "jQuery"]
    },
    {
      "company": "NS Matrix Services Pvt. Ltd.",
      "position": "Survey Programmer",
      "duration": "June 2021 - Novermber 2021",
      "description": "This marked the beginning of my career as a Survey Programmer.",
      "achievements": [
        // "Learnt Survey programming",
        // "Increased sefl knowledge with ",
        // "Established design system standards"
      ],
     "technologies": ["Decipher", "Python", "JavaScript", "CSS", "jQuery"]
    }
  ],
  
  "goals": {
    "shortTerm": [
      "Master advanced React patterns and state management",
      "Contribute to open-source projects",
      "Obtain AWS Solutions Architect certification",
      "Lead a major product launch"
    ],
    "longTerm": [
      "Become a technical lead or engineering manager",
      "Start my own tech consultancy",
      "Mentor junior developers and designers",
      "Build products that positively impact communities"
    ],
    "mission": "To create technology solutions that solve real-world problems while fostering inclusive and collaborative development environments.",
    "seeking": "I'm looking for opportunities to work with innovative teams on challenging projects that push the boundaries of web technology and user experience. I'm particularly interested in roles that combine technical leadership with creative problem-solving in growth-stage companies or impactful startups."
  },
   
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHeroButtons();
    initializeSkills();
    initializeExperience();
    initializePortfolio();
    initializeGoals();
    initializeTestimonials();
    initializeContactForm();
    initializeScrollEffects();
    initializeModal();
});

// Navigation functionality
function initializeNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Hero section buttons
function initializeHeroButtons() {
    // View My Work button
    const viewWorkBtn = document.querySelector('.hero__buttons .btn--primary');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                const offsetTop = portfolioSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Download Resume button - create a dummy PDF download
    const downloadResumeBtn = document.querySelector('.hero__buttons .btn--outline');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate PDF download
            const link = document.createElement('a');
            link.href = 'Resume.pdf';
            link.download = 'Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show feedback
            const originalText = downloadResumeBtn.textContent;
            downloadResumeBtn.textContent = 'Downloaded!';
            setTimeout(() => {
                downloadResumeBtn.textContent = originalText;
            }, 2000);
        });
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Skills section
function initializeSkills() {
    renderSkills('technical-skills', portfolioData.skills.technical);
    renderSkills('design-skills', portfolioData.skills.design);
    renderSkills('soft-skills', portfolioData.skills.soft);

    // Animate skill bars when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function renderSkills(containerId, skills) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = skills.map(skill => `
        <div class="skill-item">
            <h4>
                ${skill.name}
                <span class="skill-level">${skill.level}%</span>
            </h4>
            <div class="skill-bar">
                <div class="skill-progress" data-level="${skill.level}"></div>
            </div>
        </div>
    `).join('');
}

function animateSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, 100);
    });
}

// Experience section
function initializeExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    timeline.innerHTML = portfolioData.experience.map(job => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3 class="job-title">${job.position}</h3>
                <h4 class="company-name">${job.company}</h4>
                <p class="job-duration">${job.duration}</p>
                <p class="job-description">${job.description}</p>
                <ul class="achievements">
                    ${job.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
                <div class="tech-tags">
                    ${job.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Portfolio section
function initializePortfolio() {
    renderPortfolio(portfolioData.projects);
    initializePortfolioFilters();
}

function renderPortfolio(projects) {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    grid.innerHTML = projects.map(project => `
        <div class="project-card" data-category="${project.category}" data-project='${JSON.stringify(project)}'>
            <div class="project-image" style="background-image: url('${project.image}')"></div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" target="_blank" class="project-link" onclick="event.stopPropagation()">Live Demo</a>
                    <a href="${project.githubUrl}" target="_blank" class="project-link" onclick="event.stopPropagation()">GitHub</a>
                </div>
            </div>
        </div>
    `).join('');

    // Add click listeners for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on links
            if (e.target.classList.contains('project-link') || e.target.closest('.project-link')) return;
            
            const projectData = JSON.parse(card.getAttribute('data-project'));
            openProjectModal(projectData);
        });
    });
}

function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filter === 'all' || cardCategory === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <div style="background-image: url('${project.image}'); height: 300px; background-size: cover; background-position: center; border-radius: 8px; margin-bottom: 24px;"></div>
        <h2 style="margin-bottom: 16px; color: var(--color-primary);">${project.title}</h2>
        <p style="margin-bottom: 24px; font-size: 18px; line-height: 1.6;">${project.description}</p>
        
        <h3 style="margin-bottom: 12px; color: var(--color-primary);">Key Features</h3>
        <ul style="margin-bottom: 24px;">
            ${project.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
        </ul>
        
        <h3 style="margin-bottom: 12px; color: var(--color-primary);">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <div style="display: flex; gap: 16px; justify-content: center;">
            <a href="${project.liveUrl}" target="_blank" class="btn btn--primary">View Live Demo</a>
            <a href="${project.githubUrl}" target="_blank" class="btn btn--outline">View Code</a>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Goals section
function initializeGoals() {
    const shortTermList = document.getElementById('short-term-goals');
    const longTermList = document.getElementById('long-term-goals');

    if (shortTermList) {
        shortTermList.innerHTML = portfolioData.goals.shortTerm.map(goal => `<li>${goal}</li>`).join('');
    }

    if (longTermList) {
        longTermList.innerHTML = portfolioData.goals.longTerm.map(goal => `<li>${goal}</li>`).join('');
    }
}

// Certificate data - UPDATE THESE PATHS TO YOUR PDF FILES
var certificates = [
  { 
    title: "Decipher Advanced Programming", 
    org: "Current Organization", 
    year: "2025", 
    pdf: "cert1.pdf"
  },
  { 
    title: "Qualtrics Expert Badge", 
    org: "Previous Organization", 
    year: "2024", 
    pdf: "cert2.pdf"
  },
   { 
    title: "Python for Research", 
    org: "Online Course", 
    year: "2023", 
    pdf: "cert3.pdf"
  },
   { 
    title: "Python for Research", 
    org: "Online Course", 
    year: "2023", 
    pdf: "cert4.pdf"
  }
];

var currentIndex = 0;
var autoplayTimer;
var isMobile = window.innerWidth <= 768;

// Wait for page to load
window.addEventListener('load', function() {
  initCarousel();
});

// Handle window resize
window.addEventListener('resize', function() {
  var wasMobile = isMobile;
  isMobile = window.innerWidth <= 768;
  if (wasMobile !== isMobile) {
    initCarousel(); // Rebuild carousel for mobile/desktop switch
  }
});

function initCarousel() {
  var track = document.getElementById('certTrack');
  var dotsContainer = document.getElementById('certDots');
  
  if (!track || !dotsContainer) {
    console.log('Carousel elements not found');
    return;
  }

  // Build slides with mobile-optimized PDFs
  var slidesHTML = '';
  for (var i = 0; i < certificates.length; i++) {
    var cert = certificates[i];
    
    // Mobile-friendly PDF parameters
    var pdfParams = isMobile ? 
      '#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=page-fit' :
      '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
    
    slidesHTML += '<div class="cert-slide">' +
      '<div class="cert-card">' +
        '<div class="cert-preview">' +
          '<iframe class="cert-iframe" ' +
            'src="' + cert.pdf + pdfParams + '" ' +
            'title="' + cert.title + '" ' +
            'loading="lazy" ' +
            'allow="fullscreen">' +
          '</iframe>' +
          '<div class="cert-overlay" onclick="openPDF(\'' + cert.pdf + '\')">' +
            (isMobile ? '📱 Open' : '🔍 View Full Size') +
          '</div>' +
        '</div>' +
        '<div class="cert-meta">' +
          '<h3 class="cert-title">' + cert.title + '</h3>' +
          '<p class="cert-sub">' + cert.org + ' • ' + cert.year + '</p>' +
        '</div>' +
      '</div>' +
    '</div>';
  }
  track.innerHTML = slidesHTML;

  // Build dots
  var dotsHTML = '';
  for (var i = 0; i < certificates.length; i++) {
    dotsHTML += '<div class="cert-dot" onclick="goToSlide(' + i + ')"></div>';
  }
  dotsContainer.innerHTML = dotsHTML;

  updateCarousel();
  startAutoplay();
}

function updateCarousel() {
  var track = document.getElementById('certTrack');
  var dots = document.querySelectorAll('.cert-dot');
  
  if (track) {
    track.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
  }
  
  // Update dots
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add('active');
  }
}

function nextCert() {
  stopAutoplay();
  currentIndex = (currentIndex + 1) % certificates.length;
  updateCarousel();
  startAutoplay();
}

function prevCert() {
  stopAutoplay();
  currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
  updateCarousel();
  startAutoplay();
}

function goToSlide(index) {
  stopAutoplay();
  currentIndex = index;
  updateCarousel();
  startAutoplay();
}

function openPDF(pdfPath) {
  if (isMobile) {
    // On mobile, try to open in new tab or download
    var link = document.createElement('a');
    link.href = pdfPath;
    link.target = '_blank';
    link.download = pdfPath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(pdfPath, '_blank');
  }
}

function startAutoplay() {
  stopAutoplay();
  var interval = isMobile ? 3000 : 3000; // Slower on mobile
  autoplayTimer = setInterval(function() {
    currentIndex = (currentIndex + 1) % certificates.length;
    updateCarousel();
  }, interval);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
  }
}

// Pause on hover (only on desktop)
var carousel = document.querySelector('.cert-carousel');
if (carousel && !isMobile) {
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
}

// Touch support for mobile
if (isMobile && carousel) {
  var startX = 0;
  var endX = 0;
  
  carousel.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    stopAutoplay();
  });
  
  carousel.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    var diff = startX - endX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextCert();
      } else {
        prevCert();
      }
    } else {
      startAutoplay();
    }
  });
}

