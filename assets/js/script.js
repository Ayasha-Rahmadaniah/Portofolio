// =============================================
// PRELOADER
// =============================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
});

// =============================================
// AOS INITIALIZATION
// =============================================
AOS.init({
    duration: 1000,
    once: true
});

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =============================================
// ACTIVE NAVIGATION LINK
// =============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// =============================================
// TYPING EFFECT
// =============================================
const typingText = document.getElementById('typing-text');

if (typingText) {
    const texts = ['Calon Web Developer', 'Calon Mobile Developer', 'Penggemar Teknologi'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 100 : 150);
        }
    }

    type();
}

// =============================================
// SCROLL PROGRESS BAR
// =============================================
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// =============================================
// BACK TO TOP BUTTON
// =============================================
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =============================================
// DARK MODE TOGGLE
// =============================================
const darkModeToggle = document.getElementById('dark-mode-toggle');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function applyDarkMode() {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        darkModeToggle.title = 'Ganti ke Mode Terang';
    } else {
        document.documentElement.removeAttribute('data-theme');
        darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        darkModeToggle.title = 'Ganti ke Mode Gelap';
    }
}

// Apply on load
applyDarkMode();

darkModeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    applyDarkMode();
});

// =============================================
// CONTACT FORM VALIDATION
// =============================================
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        e.preventDefault();
        alert('Mohon isi semua kolom!');
    }
    // Jika valid, form submit langsung ke Formspree
});

// =============================================
// RIPPLE EFFECT ON BUTTONS
// =============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
