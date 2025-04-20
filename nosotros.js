// Esperar a que toda la página esté completamente cargada
window.addEventListener('load', function() {
    // ============ CÓDIGO PARA EL ENCABEZADO ============
    const menuBtn = document.querySelector('.header__menu-btn');
    const nav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');

    // 1. Menú hamburguesa
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // 2. Cerrar menú al seleccionar enlace (solo móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992 && nav) {
                nav.classList.remove('active');
                if (menuBtn) {
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // 3. Efecto de scroll para el header
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
        header.classList.toggle('scrolled', window.scrollY > 50);
    }

    // 4. Detectar página activa
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ============ CÓDIGO PARA EL CARRUSEL ============
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carousel && slides.length > 0) {
        let currentIndex = 0;
        let autoSlideInterval;

        // Función para mover el carrusel
        function moveToSlide(index) {
            currentIndex = index;
            const translateX = -currentIndex * 50;
            carousel.style.transform = `translateX(${translateX}%)`;
            updateIndicators();
        }

        // Función para siguiente slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(currentIndex);
            resetAutoSlide();
        }

        // Función para slide anterior
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveToSlide(currentIndex);
            resetAutoSlide();
        }

        // Auto slide
        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 4000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // Event listeners para botones
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Iniciar auto slide
        startAutoSlide();

        // Pausar al hacer hover (opcional)
        carousel.parentElement.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carousel.parentElement.addEventListener('mouseleave', startAutoSlide);

        // Actualizar indicadores
        function updateIndicators() {
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        // Inicializar primera posición
        moveToSlide(0);
    }

    // ============ ACTUALIZAR AÑO AUTOMÁTICAMENTE ============
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

      document.addEventListener("DOMContentLoaded", function() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.play().catch(e => console.log("Error al reproducir:", e));
        });
    });
});
