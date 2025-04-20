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
    // ============ CÓDIGO PARA PANELES DESLIZABLES ============
    const panelBtns = document.querySelectorAll('.slide-panel-btn');
    const closeBtns = document.querySelectorAll('.close-panel');
    if (panelBtns.length > 0) {
        const overlay = document.createElement('div');
        overlay.className = 'panel-overlay';
        document.body.appendChild(overlay);
        // Abrir panel específico
        panelBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const panelId = this.getAttribute('data-panel');
                const panel = document.getElementById(panelId);
                if (panel) {
                    panel.classList.add('active');
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        // Cerrar todos los paneles
        closeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.slide-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        // Cerrar al hacer clic en el overlay
        overlay.addEventListener('click', function() {
            document.querySelectorAll('.slide-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    // ============ CÓDIGO PARA ENVÍO DEL FORMULARIO ============
    document.getElementById('myForm').addEventListener('submit', async(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const messageDiv = document.getElementById('form-message');
        // Deshabilitar botón durante el envío
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                messageDiv.style.display = 'block';
                messageDiv.style.backgroundColor = '#4CAF50';
                messageDiv.textContent = '¡Mensaje enviado con éxito!';
                form.reset(); // Limpiar el formulario
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            messageDiv.style.display = 'block';
            messageDiv.style.backgroundColor = '#FF5733';
            messageDiv.textContent = 'Error al enviar. Por favor, inténtalo de nuevo.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'ENVIAR';
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    });
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
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        document.querySelector('.hero__video').play();
    }
});
