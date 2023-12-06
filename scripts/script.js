/*function language() {
    const translations = {
        'navbar': {
            'EN': ['Projects', 'About', 'Contact'],
            'PT': ['Projetos', 'Sobre', 'Contato']
        },
        'projectsSection': {
            'EN': 'Projects',
            'PT': 'Projetos'
        },
        'aboutSection': {
            'EN': 'About Me',
            'PT': 'Sobre Mim'
        },
        'contactSection': {
            'EN': 'Contact',
            'PT': 'Contato'
        },

        'aboutText': {
            'EN': 'Hello! I\'m [Your Name], a passionate [Your Profession] with expertise in [Your Skills]. I have experience working on various projects and love turning ideas into reality.',
            'PT': 'Olá! Eu sou [Seu Nome], um apaixonado [Sua Profissão] com experiência em [Suas Habilidades]. Tenho experiência trabalhando em vários projetos e adoro transformar ideias em realidade.'
        },
        'contactInfo': {
            'EN': ['Email: example@example.com', 'Phone: +1 234 567 890'],
            'PT': ['Email: exemplo@exemplo.com', 'Telefone: +1 234 567 890']
        }
    };

    function toggleLanguage() {
        const languageToggle = document.getElementById('languageToggle');
        const currentText = languageToggle.textContent.trim();

        const newLanguage = currentText === 'EN/PT' ? 'PT/EN' : 'EN/PT';
        languageToggle.textContent = newLanguage;

        const primaryLanguage = newLanguage.split('/')[0];

        updateContent(primaryLanguage);
    }

    function updateContent(language) {
        const themes = {
            'EN': ['Dark', 'Light'],
            'PT': ['Escuro', 'Claro']
        };

        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = themeToggle.textContent.split('/')[0].trim();
        const newTheme = themes[language][0] === currentTheme ? themes[language][1] : themes[language][0];
        themeToggle.textContent = `${newTheme}/${themes[language][1 - themes[language].indexOf(newTheme)]}`;

        const navLinks = document.querySelectorAll('.nav-links li a');
        navLinks.forEach((link, index) => {
            link.textContent = translations.navbar[language][index];
        });

        document.getElementById('projects').querySelector('h1').textContent = translations.projectsSection[language];
        document.getElementById('about').querySelector('h1').textContent = translations.aboutSection[language];
        document.getElementById('contact').querySelector('h1').textContent = translations.contactSection[language];

        document.getElementById('about').querySelector('p').textContent = translations.aboutText[language];

        const contactInfo = document.getElementById('contact').querySelectorAll('p');
        contactInfo.forEach((info, index) => {
            info.textContent = translations.contactInfo[language][index];
        });
        // Aqui você pode adicionar mais elementos para atualizar o conteúdo conforme necessário
    }

    const languageToggle = document.getElementById('languageToggle');
    languageToggle.addEventListener('click', toggleLanguage);

    updateContent('PT');
}

language();*/
alert(`Botão de trocar linguagem ainda está em desenvolvimento!`)
// Função para alternar entre temas claro e escuro

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
}

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', toggleTheme);



function filterTechnolgy() {
    const selectElement = document.getElementById('technology');
    const projectCards = document.querySelectorAll('.project-card');

    selectElement.addEventListener('change', function () {
        const selectedTechnology = this.value;

        projectCards.forEach(card => {
            const techTags = card.getAttribute('data-technologies').split(', ');

            const showCard = techTags.includes(selectedTechnology) || selectedTechnology === 'all';

            card.style.display = showCard ? 'block' : 'none';
        });
    });
}

filterTechnolgy();


function toggleMenu() {
    const menuBars = document.getElementById("menu-bars");
    const navigation = document.querySelector(".navbar ul");
    const menuIcon = document.querySelector(".menu-icon");

    menuBars.addEventListener("click", () => {
        navigation.classList.toggle("active");
        menuIcon.classList.toggle("active");

        if (menuIcon.classList.contains("active")) {
            menuIcon.innerHTML = "&#10005;";
        } else {
            menuIcon.innerHTML = "&#9776;";
        }
    });
}

toggleMenu();


function smoothScroll() {

    function smooth(target, duration) {
        const targetElement = document.querySelector(target);
        const navbarHeight = document.querySelector('.navbar').offsetHeight; // Altura da barra de navegação
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const target = this.getAttribute('href');
                const duration = 1000;
                smooth(target, duration);
            });
        });
    }

    initSmoothScroll();

}
smoothScroll()


function initProjectModalLogic() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const modal = document.getElementById(`modal-project-${index + 1}`);
            if (modal) {
                modal.style.opacity = '0';

                const video = modal.querySelector('video');
                if (video) {
                    video.play();
                }

                const fadeInModal = () => {
                    modal.style.display = 'flex';
                    setTimeout(() => {
                        modal.style.opacity = '1';
                    }, 50);
                };

                fadeInModal();

                const closeButton = modal.querySelector('.modal-close');
                closeButton.addEventListener('click', () => {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 500);
                    if (video) {
                        video.pause();
                    }
                });
            }
        });
    });
}

initProjectModalLogic();