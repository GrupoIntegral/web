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
    // ============ CÓDIGO PARA EL MODAL DE CONTACTO ============
    const contactBtn = document.getElementById('contact-btn');
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('contact-modal');
    const form = document.querySelector('.modal-form');
    if (contactBtn && modal) {
        // Abrir modal
        contactBtn.addEventListener('click', () => {
            modal.showModal();
            document.body.style.overflow = 'hidden';
        });
        // Cerrar modal
        closeBtn.addEventListener('click', closeModal);
        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        // Cerrar con ESC
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
        // Manejar envío del formulario (CON FORMSPREE)
        if (form) {
            form.addEventListener('submit', async(e) => {
                e.preventDefault();
                // Mostrar feedback de "enviando" (opcional)
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                try {
                    const formData = new FormData(form);
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });
                    if (response.ok) {
                        // Éxito: mostrar mensaje y resetear formulario
                        alert('¡Mensaje enviado! Nos pondremos en contacto pronto.');
                        form.reset();
                        closeModal();
                    } else {
                        throw new Error('Error en el envío');
                    }
                } catch (error) {
                    alert('Error al enviar. Por favor, inténtalo de nuevo.');
                    console.error('Error:', error);
                } finally {
                    // Restaurar botón
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
        }

        function closeModal() {
            modal.close();
            document.body.style.overflow = '';
        }
        // Mejorar accesibilidad
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        closeBtn.setAttribute('aria-label', 'Cerrar ventana modal');
    }
    // ============ ACTUALIZAR AÑO AUTOMÁTICAMENTE ============
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});