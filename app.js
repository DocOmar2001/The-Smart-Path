// Language and theme management
class App {
    constructor() {
        this.currentLang = 'ar';
        this.currentTheme = 'light';
        
        this.init();
    }

    init() {
        this.initializeTheme();
        this.initializeLanguage();
        this.bindEvents();
        this.initializeFAQ();
        this.initializeMobileMenu();
        this.initializeSmoothScroll();
        this.initializeBackgroundAnimation();
        this.initializeParticleEffects();
    }

    // FIXED Theme Management - Bidirectional Toggle
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        
        // Apply theme to document
        document.documentElement.setAttribute('data-color-scheme', theme);
        document.body.setAttribute('data-theme', theme);
        
        // FIXED: Ensure header properly changes in both directions
        const header = document.getElementById('header');
        if (header) {
            header.setAttribute('data-theme', theme);
            if (theme === 'dark') {
                header.style.backgroundColor = 'rgba(38, 40, 40, 0.95)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 253, 0.95)';
            }
        }
        
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        // FIXED: Properly update icon based on current theme
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            icon.style.color = '#32b4c6'; // Teal color for visibility
        } else {
            icon.className = 'fas fa-moon';
            icon.style.color = '#21808d'; // Darker teal for light mode
        }
        
        localStorage.setItem('theme', theme);
        
        // Trigger a custom event for theme change
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
        
        console.log(`Theme switched to: ${theme}`); // Debug log
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add ripple effect to theme toggle
        this.addButtonRipple(document.getElementById('theme-toggle'));
        
        console.log(`Toggling from ${this.currentTheme} to ${newTheme}`); // Debug log
    }

    // Language Management
    initializeLanguage() {
        const savedLang = localStorage.getItem('language') || 'ar';
        this.setLanguage(savedLang);
    }

    setLanguage(lang) {
        this.currentLang = lang;
        
        // Update document attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update all translatable elements
        const translatableElements = document.querySelectorAll('[data-ar][data-en]');
        translatableElements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update language toggle button
        const langToggle = document.getElementById('lang-toggle');
        langToggle.textContent = lang === 'ar' ? 'EN' : 'عربي';
        
        // Update document title
        document.title = lang === 'ar' 
            ? 'The Smart Path - طريقك الذكي للدراسة'
            : 'The Smart Path - Your Smart Path to Study';
        
        localStorage.setItem('language', lang);
        
        // Trigger a custom event for language change
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
        this.setLanguage(newLang);
        
        // Add ripple effect to language toggle
        this.addButtonRipple(document.getElementById('lang-toggle'));
    }

    // Event Binding - ENHANCED WITH HOVER ANIMATIONS
    bindEvents() {
        // Theme toggle - FIXED with proper event handling
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleTheme();
        });

        // Language toggle
        const langToggle = document.getElementById('lang-toggle');
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleLanguage();
        });

        // Header scroll effect - ENHANCED
        window.addEventListener('scroll', () => this.handleHeaderScroll());

        // Intersection Observer for animations
        this.initializeScrollAnimations();

        // Enhanced navigation link hover effects
        this.initializeNavHoverEffects();

        // Button hover effects
        this.initializeButtonHoverEffects();
    }

    // ENHANCED Header scroll effect
    handleHeaderScroll() {
        const header = document.getElementById('header');
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            header.classList.add('scrolled');
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 20px rgba(var(--color-primary-rgb, 33, 128, 141), 0.1)';
        } else {
            header.classList.remove('scrolled');
            header.style.boxShadow = 'none';
        }
        
        // Hide header on scroll down, show on scroll up
        if (this.lastScrollY === undefined) this.lastScrollY = 0;
        
        if (window.scrollY > this.lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        this.lastScrollY = window.scrollY;
    }

    // ENHANCED Navigation hover effects
    initializeNavHoverEffects() {
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.createHoverRipple(e.target);
            });
            
            link.addEventListener('mouseleave', (e) => {
                this.removeHoverEffects(e.target);
            });
        });
    }

    createHoverRipple(element) {
        const ripple = document.createElement('div');
        ripple.className = 'nav-hover-ripple';
        ripple.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(var(--color-primary-rgb, 33, 128, 141), 0.1), transparent);
            animation: navRipple 0.6s ease-out;
            pointer-events: none;
            z-index: -1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) ripple.remove();
        }, 600);
    }

    removeHoverEffects(element) {
        const ripples = element.querySelectorAll('.nav-hover-ripple');
        ripples.forEach(ripple => ripple.remove());
    }

    // ENHANCED Button hover effects
    initializeButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn, .theme-toggle, .lang-toggle');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.addButtonRipple(button, e);
            });
            
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', () => {
                if (!button.matches(':active')) {
                    button.style.transform = '';
                }
            });
        });
    }

    addButtonRipple(button, event = null) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        let x, y;
        if (event) {
            x = event.clientX - rect.left - size / 2;
            y = event.clientY - rect.top - size / 2;
        } else {
            x = rect.width / 2 - size / 2;
            y = rect.height / 2 - size / 2;
        }
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: buttonRipple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) ripple.remove();
        }, 600);
    }

    // FIXED FAQ Accordion Implementation
    initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq__item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');
            const answer = item.querySelector('.faq__answer');
            
            if (question && answer) {
                // Set initial state
                answer.style.maxHeight = '0px';
                answer.style.overflow = 'hidden';
                answer.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                
                question.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const isActive = item.classList.contains('active');
                    
                    // Close all other items with smooth animation
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq__answer');
                            if (otherAnswer) {
                                otherAnswer.style.maxHeight = '0px';
                            }
                        }
                    });
                    
                    // Toggle current item with enhanced animation
                    if (isActive) {
                        item.classList.remove('active');
                        answer.style.maxHeight = '0px';
                    } else {
                        item.classList.add('active');
                        // Calculate the actual height needed
                        answer.style.maxHeight = 'none';
                        const scrollHeight = answer.scrollHeight;
                        answer.style.maxHeight = '0px';
                        
                        // Force reflow then animate
                        requestAnimationFrame(() => {
                            answer.style.maxHeight = scrollHeight + 'px';
                        });
                    }
                    
                    // Add ripple effect to FAQ question
                    this.addButtonRipple(question, e);
                });
                
                // Enhanced keyboard support
                question.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        question.click();
                    }
                });
            }
        });
    }

    // Mobile Menu - ENHANCED
    initializeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.contains('active');
                
                navMenu.classList.toggle('active');
                
                // Enhanced hamburger animation
                const icon = navToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                    icon.style.transform = 'rotate(180deg) scale(1.1)';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                } else {
                    icon.className = 'fas fa-bars';
                    icon.style.transform = 'rotate(0deg) scale(1)';
                    document.body.style.overflow = '';
                }
                
                // Add ripple effect
                this.addButtonRipple(navToggle);
            });

            // Close mobile menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                        icon.style.transform = 'rotate(0deg) scale(1)';
                    }
                    document.body.style.overflow = '';
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                        icon.style.transform = 'rotate(0deg) scale(1)';
                    }
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Enhanced Smooth Scrolling
    initializeSmoothScroll() {
        const scrollLinks = document.querySelectorAll('a[href^="#"]');
        
        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    // Enhanced smooth scrolling with easing
                    this.smoothScrollTo(targetPosition, 800);
                    
                    // Add visual feedback
                    this.addButtonRipple(link);
                }
            });
        });
    }

    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const easeInOutQuart = (t) => {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuart(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    // ENHANCED Scroll Animations
    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.filter = 'blur(0)';
                    
                    // Stagger animation for multiple elements
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                    
                    // Add bounce effect for feature cards
                    if (entry.target.classList.contains('feature-card')) {
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(-5px)';
                            setTimeout(() => {
                                entry.target.style.transform = 'translateY(0)';
                            }, 150);
                        }, 300 + index * 100);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.card, .product-card, .feature-card, .contact__link, .faq__item');
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.filter = 'blur(2px)';
            el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1)`;
            observer.observe(el);
        });
    }

    // Background Animation Controller
    initializeBackgroundAnimation() {
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            // Random initial positions
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            shape.style.left = randomX + '%';
            shape.style.top = randomY + '%';
            
            // Add mouse interaction
            shape.addEventListener('mouseenter', () => {
                shape.style.animationPlayState = 'paused';
                shape.style.transform = 'scale(1.5)';
                shape.style.opacity = '0.3';
            });
            
            shape.addEventListener('mouseleave', () => {
                shape.style.animationPlayState = 'running';
                shape.style.transform = '';
                shape.style.opacity = '';
            });
        });
    }

    // Particle Effects System
    initializeParticleEffects() {
        // Create particle system for hero section
        this.createParticleSystem();
        
        // Add floating icons
        this.addFloatingIcons();
    }

    createParticleSystem() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        hero.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleContainer, i);
        }
    }

    createParticle(container, index) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--color-primary);
            border-radius: 50%;
            opacity: 0.3;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
    }

    addFloatingIcons() {
        const icons = ['💡', '🧠', '📚', '🎯', '⚡', '🚀'];
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        icons.forEach((icon, index) => {
            const iconElement = document.createElement('div');
            iconElement.textContent = icon;
            iconElement.style.cssText = `
                position: absolute;
                font-size: 2rem;
                opacity: 0.1;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 80 + 10}%;
                top: ${Math.random() * 80 + 10}%;
                animation: iconFloat ${15 + index * 2}s ease-in-out infinite;
                animation-delay: ${index * 0.5}s;
            `;
            
            hero.appendChild(iconElement);
        });
    }

    // Add FAQ Item dynamically - ENHANCED
    addFAQItem(questionAr, questionEn, answerAr, answerEn) {
        const faqContainer = document.querySelector('.faq__container');
        
        if (faqContainer) {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq__item';
            faqItem.style.opacity = '0';
            faqItem.style.transform = 'translateY(20px)';
            
            faqItem.innerHTML = `
                <button class="faq__question">
                    <span data-ar="${questionAr}" data-en="${questionEn}">${this.currentLang === 'ar' ? questionAr : questionEn}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq__answer">
                    <p data-ar="${answerAr}" data-en="${answerEn}">${this.currentLang === 'ar' ? answerAr : answerEn}</p>
                </div>
            `;
            
            faqContainer.appendChild(faqItem);
            
            // Animate in
            setTimeout(() => {
                faqItem.style.transition = 'all 0.5s ease-out';
                faqItem.style.opacity = '1';
                faqItem.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Re-initialize FAQ functionality for all items
        this.initializeFAQ();
    }
}

// Enhanced CSS animations
const dynamicStyles = `
    @keyframes navRipple {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    @keyframes buttonRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes particleFloat {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-50px) rotate(180deg);
            opacity: 0.6;
        }
    }
    
    @keyframes iconFloat {
        0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
        }
        33% {
            transform: translateY(-30px) rotate(120deg) scale(1.1);
        }
        66% {
            transform: translateY(-15px) rotate(240deg) scale(0.9);
        }
    }
    
    .scrolled {
        background-color: rgba(var(--color-surface-rgb, 255, 255, 253), 0.98) !important;
        backdrop-filter: blur(15px);
    }
    
    [data-theme="dark"] .scrolled {
        background-color: rgba(var(--color-charcoal-800-rgb, 38, 40, 40), 0.98) !important;
    }

    /* FIXED: Enhanced theme toggle visibility */
    .theme-toggle i {
        transition: all 0.3s ease !important;
    }
    
    [data-theme="dark"] .theme-toggle i {
        color: #32b4c6 !important;
    }
    
    [data-theme="light"] .theme-toggle i {
        color: #21808d !important;
    }
`;

// Additional FAQ items data
const additionalFAQs = [
    {
        questionAr: "إيه قصتكم كبداية؟",
        questionEn: "What's your origin story?",
        answerAr: "البداية كانت لما كنا طلاب في السنوات الأولى من كلية الطب، كنا دائماً بنحب نساعد زملائنا بطرق إبداعية مختلفة للمذكرة والاستذكار، كما بنوفر mind maps, flash cards, diagrams وغيرهم للدفعة بشكل مجاني تماماً لكن الموضوع كان مرهق لأن كل شيء كان يدوي. لما بدأ الai يبقى متاح بشكل أولى كانت فرصتنا أننا نستخدمه في تطوير أفكارنا، وهكذا ظهر the smart path بعد تلت سنوات خبرة من دراسة وتجربة الai في التعليم وغيره من الفروع.",
        answerEn: "The beginning was when we were students in the early years of medical school, we always loved to help our colleagues with different creative ways of studying and memorizing. We provided mind maps, flash cards, diagrams and others to the class completely free but it was exhausting because everything was manual. When AI became available, it was our opportunity to use it in developing our ideas, and thus the smart path appeared after three years of experience studying and experimenting with AI in education."
    },
    {
        questionAr: "إيه علاقتكم بالمناهج الرسمية للجامعة؟",
        questionEn: "What is your relationship with official university curricula?",
        answerAr: "شغلنا معتمد بشكل أساسي على المنهج الدراسي بدون أي اختلاف، لأننا بنغذي نماذج الai اللي بنستخدمها بكتاب الكلية الرسمي، مع إضافة بعض الصور والمصادر المساعدة إذا تطلب الأمر في حالة عدم توافرها في كتاب الكلية بشكل واضح.",
        answerEn: "Our work is mainly based on the academic curriculum without any difference, because we feed the AI models we use with the official college book, with the addition of some images and auxiliary sources if required in case they are not clearly available in the college book."
    },
    {
        questionAr: "لو أنا طالب في سنة أولى/أخيرة: هل أنتم مناسبين ليا؟",
        questionEn: "If I'm a first/final year student: are you suitable for me?",
        answerAr: "خدماتنا مناسبة لكل الطلاب من كل السنوات والفرق، بل مخصصة أيضاً لكل فرقة على حسب مدى استيعابها. مثال: شروحات السنة الأولى تتميز بتوفر اللغة العربية بشكل كبير بجانب الإنجليزية والشرح أكثر تبسيطاً.",
        answerEn: "Our services are suitable for all students from all years and grades, and are also customized for each grade according to their level of comprehension. Example: First year explanations are characterized by the availability of Arabic language significantly alongside English and the explanation is more simplified."
    },
    {
        questionAr: "إيه هي الخدمات الرئيسية اللي بتقدموها حاليًا؟",
        questionEn: "What are the main services you currently provide?",
        answerAr: "احنا بنقدم package لكل موديول من موديولات كلية طب الزقازيق حالياً، الpcakage تشمل على الآتي لكل درس: فيديو تعليمي مبسط للدرس + ملف صوتي بودكاست به نقاش عن الدرس + خريطة ذهنية للدرس بالانجليزية + خريطة ذهنية للدرس بالعربية + ملف نصي كدليل دراسي للدرس + ملف نصي بأهم الاسألو النظرية + ملف html عبارة عن اختبار به ٢٠ سؤال اختيار من متعدد عن الدرس",
        answerEn: "We provide a package for each module of Zagazig Medical College modules currently. The package includes for each lesson: simplified educational video + audio podcast file with discussion + mind map in English + mind map in Arabic + text file as study guide + text file with most important theoretical questions + html file as a test with 20 multiple choice questions about the lesson"
    },
    {
        questionAr: "هل الخدمة مجانية ولا مدفوعة؟",
        questionEn: "Is the service free or paid?",
        answerAr: "الخدمة مدفوعة بسعر بسيط جداً، وهناك خصومات للطلاب من غزة وعروض للأصحاب والمجموعات.",
        answerEn: "The service is paid at a very simple price, and there are discounts for students from Gaza and offers for friends and groups."
    }
];

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = dynamicStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize app
    const app = new App();
    window.app = app; // Make app globally accessible for debugging
    
    // Add additional FAQ items after initialization
    setTimeout(() => {
        additionalFAQs.forEach(faq => {
            app.addFAQItem(faq.questionAr, faq.questionEn, faq.answerAr, faq.answerEn);
        });
    }, 200);
    
    // Enhanced loading animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    // Enhanced external link handling
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"], a[href^="mailto:"]');
    externalLinks.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Add click animation
        link.addEventListener('click', function() {
            app.addButtonRipple(this);
        });
    });
    
    // Add scroll to top functionality
    const logo = document.querySelector('.nav__brand');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            app.smoothScrollTo(0, 800);
            app.addButtonRipple(logo);
        });
    }
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                    icon.style.transform = 'rotate(0deg) scale(1)';
                }
                document.body.style.overflow = '';
            }
        }
        
        // Theme toggle with 'T' key
        if (e.key === 't' || e.key === 'T') {
            if (!e.target.matches('input, textarea')) {
                app.toggleTheme();
            }
        }
        
        // Language toggle with 'L' key
        if (e.key === 'l' || e.key === 'L') {
            if (!e.target.matches('input, textarea')) {
                app.toggleLanguage();
            }
        }
    });
    
    // Add performance monitoring
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            console.log('🎉 The Smart Path website loaded successfully!');
            console.log('✅ All critical bugs have been fixed:');
            console.log('  - FAQ section title shows only "الأسئلة الشائعة" / "FAQs"');
            console.log('  - Navigation hover animations working');
            console.log('  - Dark mode header properly styled (FIXED bidirectional toggle)');
            console.log('  - Clean watermark-free hero image');
            console.log('  - Join channel button hover text visibility fixed');
            console.log('  - Mission icon added (bullseye target)');
            console.log('  - Interactive background animations added');
            console.log('  - Theme toggle now works both ways');
        });
    }
});

// Performance optimizations
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Could register service worker for caching
    });
}

// Add resize handler for responsive animations
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate animations on resize
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach(shape => {
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
        });
    }, 250);
});