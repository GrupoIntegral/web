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

    // ============ CÓDIGO PARA EL LIGHTBOX ============
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxInfo = document.querySelector('.lightbox-info');
    const cerrar = document.querySelector('.cerrar');

    // Verificar que todos los elementos del lightbox existan
    if (lightbox && lightboxImg && lightboxInfo && cerrar) {
        // Array de proyectos
        const proyectos = [{
                imagenes: ["photos/proyecto1.jpg", "photos/proyecto1-2.jpg", "photos/proyecto1-3.jpg", "photos/proyecto1-4.jpg"],
                info: ``,
                indiceImagenActual: 0
            },
            {
                imagenes: ["photos/proyecto2.jpg", "photos/proyecto2-2.jpg", "photos/proyecto2-3.jpg", "photos/proyecto2-4.jpg"],
                info: ``,
                indiceImagenActual: 0
            },
            {
                imagenes: ["photos/proyecto3.jpg", "photos/proyecto3-2.jpg", "photos/proyecto3-3.jpg", "photos/proyecto3-4.jpg"],
                info: ``,
                indiceImagenActual: 0
            },
            {
                imagenes: ["photos/proyecto4.jpg", "photos/proyecto4-2.jpg", "photos/proyecto4-3.jpg", "photos/proyecto4-4.jpg"],
                info: ``,
                indiceImagenActual: 0
            }
        ];

        // Array de obras ejecutadas
        const obras = [{
                imagenes: ["photos/obra1.jpg", "photos/obra1-2.jpeg", "photos/obra1-3.jpg", "photos/obra1-4.jpeg"],
                info: ``,
                indiceImagenActual: 0
            },
            {
                imagenes: ["photos/obra2.jpg", "photos/obra2-2.jpg", "photos/obra2-3.jpg", "photos/obra2-4.jpg"],
                info: ``,
                indiceImagenActual: 0
            },
            {
                imagenes: ["photos/obra3.jpg", "photos/obra3-2.jpg", "photos/obra3-3.jpg", "photos/obra3-4.jpg"],
                info: ``,
                indiceImagenActual: 0
            },
            {
                imagenes: ["photos/obra4.jpg", "photos/obra4-2.jpg", "photos/obra4-3.jpg", "photos/obra4-4.jpg"],
                info: ``,
                indiceImagenActual: 0
            },
            {
                imagenes: ["photos/obra5.jpg", "photos/obra5-2.jpg", "photos/obra5-3.jpg", "photos/obra5-4.jpg", "photos/obra5-5.jpg"],
                info: ``,
                indiceImagenActual: 0
            }
        ];

        let indiceActual = 0;
        let tipoActual = ''; // 'proyecto' u 'obra'
        let intervalo;

        // Función para mostrar contenido en el Lightbox
        function mostrarContenido(tipo, indice, indiceImagen = 0) {
            const coleccion = tipo === 'proyecto' ? proyectos : obras;

            if (indice < 0 || indice >= coleccion.length) return;
            const item = coleccion[indice];
            if (indiceImagen < 0 || indiceImagen >= item.imagenes.length) return;

            item.indiceImagenActual = indiceImagen;
            lightboxImg.src = item.imagenes[indiceImagen];
            lightboxInfo.innerHTML = item.info;
            lightbox.classList.add('mostrar');
            tipoActual = tipo;
            indiceActual = indice;

            // Iniciar carrusel automático (cada 5 segundos)
            clearInterval(intervalo);
            intervalo = setInterval(siguienteImagen, 5000);
        }

        // Navegación entre imágenes
        function siguienteImagen() {
            const coleccion = tipoActual === 'proyecto' ? proyectos : obras;
            const item = coleccion[indiceActual];
            const nuevoIndice = (item.indiceImagenActual + 1) % item.imagenes.length;
            mostrarContenido(tipoActual, indiceActual, nuevoIndice);
        }

        function anteriorImagen() {
            const coleccion = tipoActual === 'proyecto' ? proyectos : obras;
            const item = coleccion[indiceActual];
            const nuevoIndice = (item.indiceImagenActual - 1 + item.imagenes.length) % item.imagenes.length;
            mostrarContenido(tipoActual, indiceActual, nuevoIndice);
        }

        // Eventos para botones "Ver detalles" de PROYECTOS
        document.querySelectorAll('.portafolio-contenedor .ver-mas').forEach((boton, index) => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                mostrarContenido('proyecto', index, 0);
            });
        });

        // Eventos para botones "Ver detalles" de OBRAS
        document.querySelectorAll('.portafolio-contenedor-obras .ver-mas').forEach((boton, index) => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                mostrarContenido('obra', index, 0);
            });
        });

        // Botones de navegación del carrusel
        const btnSiguiente = document.querySelector('.siguiente');
        const btnAnterior = document.querySelector('.anterior');

        if (btnSiguiente) {
            btnSiguiente.addEventListener('click', (e) => {
                e.stopPropagation();
                clearInterval(intervalo);
                siguienteImagen();
            });
        }

        if (btnAnterior) {
            btnAnterior.addEventListener('click', (e) => {
                e.stopPropagation();
                clearInterval(intervalo);
                anteriorImagen();
            });
        }

        // Cerrar Lightbox
        cerrar.addEventListener('click', (e) => {
            e.preventDefault();
            lightbox.classList.remove('mostrar');
            clearInterval(intervalo);
        });

        // Cerrar al hacer clic fuera
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('mostrar');
                clearInterval(intervalo);
            }
        });
    }

    // ============ ACTUALIZAR AÑO AUTOMÁTICAMENTE ============
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});