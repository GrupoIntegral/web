// Código exclusivo para el encabezado
window.addEventListener('load', function() {
    // Elementos del header
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

        // Activar al cargar si ya está scrolleado
        header.classList.toggle('scrolled', window.scrollY > 50);
    }

    // 4. Detectar página activa (opcional)
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Actualizar año automáticamente
    document.getElementById('year').textContent = new Date().getFullYear();
});

window.addEventListener('load', function() {
    // Seleccionar elementos
    const tabButtons = document.querySelectorAll('.tablinks');
    const tabContents = document.querySelectorAll('.tabcontent');

    // Función para cambiar de pestaña
    function switchTab(evt, tabId) {
        // Remover clase 'active' de todos los botones y contenidos
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });

        // Activar el botón y contenido seleccionado
        evt.currentTarget.classList.add('active');
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
            activeTab.style.display = 'block';
            activeTab.classList.add('active');
        }
    }

    // Asignar eventos a los botones
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const tabId = this.getAttribute('onmouseover').split("'")[1];
            switchTab(e, tabId);
        });

        // Mantener el hover si lo prefieres
        button.addEventListener('mouseover', function(e) {
            if (window.innerWidth > 768) { // Solo en desktop
                const tabId = this.getAttribute('onmouseover').split("'")[1];
                switchTab(e, tabId);
            }
        });
    });

    // Activar la primera pestaña por defecto
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons[0].classList.add('active');
        tabContents[0].style.display = 'block';
        tabContents[0].classList.add('active');
    }
});