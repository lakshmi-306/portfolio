// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const pdfFileInput = document.getElementById('pdfFileInput');
const pdfModal = document.getElementById('pdfModal');
const pdfUploadArea = document.getElementById('pdfUploadArea');
const pdfViewer = document.getElementById('pdfViewer');
const pdfFrame = document.getElementById('pdfFrame');
const pdfModalTitle = document.getElementById('pdfModalTitle');
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

// Store current project info
let currentProjectPDF = null;
let currentProjectTitle = null;

// Theme Management
function initializeTheme() {
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcons(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function updateThemeIcons(theme) {
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    const themeTexts = document.querySelectorAll('.theme-text');
    
    if (theme === 'light') {
        // Show moon icon (to switch to dark)
        sunIcons.forEach(icon => icon.style.display = 'none');
        moonIcons.forEach(icon => icon.style.display = 'block');
        themeTexts.forEach(text => text.textContent = 'Dark Mode');
    } else {
        // Show sun icon (to switch to light)
        sunIcons.forEach(icon => icon.style.display = 'block');
        moonIcons.forEach(icon => icon.style.display = 'none');
        themeTexts.forEach(text => text.textContent = 'Light Mode');
    }
}

// Update copyright year automatically
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Navigation scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const isActive = mobileMenu.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate mobile nav links
    mobileNavLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.style.opacity = '0';
        link.style.animation = 'slideInLeft 0.3s ease forwards';
    });
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scroll for navigation links
function smoothScrollToSection(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    
    if (targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    }
}

// Intersection Observer for animations
function createIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .skill-card, .expertise-card, .project-card, .contact-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Parallax effect for background circles
function handleParallax() {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.bg-circle');
    
    circles.forEach((circle, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        circle.style.transform = `translateY(${yPos}px)`;
    });
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add active state to navigation links based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add CSS for active nav links
function addActiveNavStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active,
        .mobile-nav-link.active {
            color: var(--primary) !important;
        }
    `;
    document.head.appendChild(style);
}

// Typing animation for hero title
function createTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const nameElement = heroTitle.querySelector('.hero-name');
    const gradientElement = heroTitle.querySelector('.hero-name-gradient');
    
    if (nameElement && gradientElement) {
        const name1 = nameElement.textContent;
        const name2 = gradientElement.textContent;
        
        // Clear initial content
        nameElement.textContent = '';
        gradientElement.textContent = '';
        
        // Type first name
        let i = 0;
        const typeFirstName = setInterval(() => {
            nameElement.textContent += name1[i];
            i++;
            if (i >= name1.length) {
                clearInterval(typeFirstName);
                // Start typing second name after a delay
                setTimeout(() => {
                    let j = 0;
                    const typeSecondName = setInterval(() => {
                        gradientElement.textContent += name2[j];
                        j++;
                        if (j >= name2.length) {
                            clearInterval(typeSecondName);
                        }
                    }, 100);
                }, 300);
            }
        }, 100);
    }
}

// Add hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.about-card, .skill-card, .expertise-card, .project-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Add active nav styles
    addActiveNavStyles();
    
    // Theme toggle event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Event listeners
    window.addEventListener('scroll', throttle(() => {
        handleNavbarScroll();
        handleParallax();
        updateActiveNavLink();
    }, 16));
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Add smooth scroll to all navigation links
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    allNavLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', smoothScrollToSection);
        }
    });
    
    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Initialize animations
    createIntersectionObserver();
    addCardHoverEffects();
    setupDragAndDrop();
    
    // Add typing animation with delay
    setTimeout(createTypingAnimation, 800);
    
    // Initial calls
    handleNavbarScroll();
    updateActiveNavLink();
    updateCopyrightYear();
});

// Add event listener for file input
if (pdfFileInput) {
    pdfFileInput.addEventListener('change', handlePDFUpload);
}

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded) .hero-content {
            opacity: 0;
            transform: translateY(50px);
        }
        
        body.loaded .hero-content {
            animation: fadeInUp 1s ease-out forwards;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 16));
}

// Initialize scroll progress
createScrollProgress();

// Add custom cursor effect (optional enhancement)
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize custom cursor on desktop only
if (window.innerWidth > 768) {
    createCustomCursor();
}

// Project Viewing Functionality
function viewProject(buttonElement) {
    // Check if modal elements exist
    if (!pdfModal || !pdfModalTitle) {
        console.error('PDF modal elements not found');
        return;
    }
    
    // Get the project card (parent of the button)
    const projectCard = buttonElement.closest('.project-card');
    
    if (!projectCard) {
        console.error('Project card not found');
        return;
    }
    
    // Read PDF path and title from HTML data attributes
    const pdfPath = projectCard.getAttribute('data-pdf');
    const projectTitle = projectCard.getAttribute('data-title');
    
    // Store current project info
    currentProjectPDF = pdfPath;
    currentProjectTitle = projectTitle;
    
    // Set modal title
    pdfModalTitle.textContent = projectTitle || 'Project Details';
    
    if (pdfPath) {
        // Try to load the PDF
        showPDFViewer(pdfPath);
    } else {
        // Show upload area if no PDF is set
        showUploadArea();
    }
    
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePDFModal() {
    pdfModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset modal state
    pdfUploadArea.style.display = 'block';
    pdfViewer.style.display = 'none';
    pdfFrame.src = '';
    
    // Hide the "Open in New Tab" button
    const openInNewTabBtn = document.getElementById('openInNewTab');
    if (openInNewTabBtn) {
        openInNewTabBtn.style.display = 'none';
    }
}

function showUploadArea() {
    pdfUploadArea.style.display = 'block';
    pdfViewer.style.display = 'none';
    
    // Hide the "Open in New Tab" button
    const openInNewTabBtn = document.getElementById('openInNewTab');
    if (openInNewTabBtn) {
        openInNewTabBtn.style.display = 'none';
    }
}

function showPDFViewer(pdfURL) {
    pdfUploadArea.style.display = 'none';
    pdfViewer.style.display = 'block';
    
    // Add error handling for PDF loading
    pdfFrame.onload = function() {
        // PDF loaded successfully
        const openInNewTabBtn = document.getElementById('openInNewTab');
        if (openInNewTabBtn) {
            openInNewTabBtn.style.display = 'inline-flex';
        }
    };
    
    pdfFrame.onerror = function() {
        // PDF failed to load, show upload area instead
        showUploadArea();
        showNotification('PDF file not found. Please upload your project PDF.', 'error');
    };
    
    pdfFrame.src = pdfURL;
}

function openPDFInNewTab() {
    if (currentProjectPDF) {
        window.open(currentProjectPDF, '_blank');
    }
}

function handlePDFUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
        showNotification('Please select a PDF file.', 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showNotification('File size should be less than 10MB.', 'error');
        return;
    }
    
    // Create object URL for the PDF
    const pdfURL = URL.createObjectURL(file);
    
    // Store the PDF data in HTML and current variables
    currentProjectPDF = pdfURL;
    const projectCard = document.querySelector('.project-card[data-title="' + currentProjectTitle + '"]');
    if (projectCard) {
        projectCard.setAttribute('data-pdf', pdfURL);
    }
    
    // Show PDF viewer
    showPDFViewer(pdfURL);
    
    // Show success message
    showNotification(`PDF "${file.name}" uploaded successfully!`, 'success');
    
    // Clear file input
    event.target.value = '';
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card);
        color: var(--foreground);
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid ${type === 'error' ? 'var(--destructive)' : 'var(--border)'};
        box-shadow: var(--shadow-card);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        ${type === 'error' ? 'border-left: 4px solid var(--destructive);' : 'border-left: 4px solid var(--primary);'}
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Drag and drop functionality
function setupDragAndDrop() {
    if (!pdfUploadArea) return;
    
    pdfUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        pdfUploadArea.classList.add('dragover');
    });
    
    pdfUploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        pdfUploadArea.classList.remove('dragover');
    });
    
    pdfUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        pdfUploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type === 'application/pdf') {
                // Simulate file input change
                const event = { target: { files: [file], value: '' } };
                handlePDFUpload(event);
            } else {
                showNotification('Please drop a PDF file.', 'error');
            }
        }
    });
    
    // Click to upload
    pdfUploadArea.addEventListener('click', () => {
        pdfFileInput.click();
    });
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
        closePDFModal();
    }
});

// Email functionality
function openHireEmail() {
    const subject = encodeURIComponent("Hiring Inquiry - UI/UX Design Project");
    const body = encodeURIComponent(`Hello Lakshmi,

I am interested in hiring you for a UI/UX design project.

Project Details:
- Project Type: 
- Timeline: 
- Budget Range: 
- Project Description: 

Please let me know your availability and we can discuss further details.

Best regards,
[Your Name]
[Your Company]
[Your Contact Information]`);
    
    const mailtoLink = `mailto:tanyapanwar236@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}

function openContactEmail() {
    const subject = encodeURIComponent("Project Inquiry - Let's Work Together");
    const body = encodeURIComponent(`Hello Lakshmi,

I came across your portfolio and I'm impressed with your work! I would like to discuss a potential project collaboration.

Project Information:
- Project Type: [UI/UX Design / Graphic Design / Brand Identity]
- Project Scope: 
- Timeline: 
- Budget: 

Project Description:
[Please describe your project requirements]

I look forward to hearing from you and discussing how we can work together.

Best regards,
[Your Name]
[Your Company]
[Your Phone Number]`);
    
    const mailtoLink = `mailto:tanyapanwar236@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}

// Add click tracking for email buttons
function trackEmailClick(buttonType) {
    console.log(`Email button clicked: ${buttonType}`);
    // You can add analytics tracking here if needed
}

// Close modal on backdrop click
pdfModal.addEventListener('click', (e) => {
    if (e.target === pdfModal) {
        closePDFModal();
    }
});

// Add event listener for file input
if (pdfFileInput) {
    pdfFileInput.addEventListener('change', handlePDFUpload);
}