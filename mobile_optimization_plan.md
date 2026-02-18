# Plan de Optimización para Mobile (UI/UX Premium)

Para lograr una experiencia de usuario (UX) excepcional y un diseño (UI) impecable en móviles, realizaremos los siguientes ajustes:

## 1. Navegación (Navbar)
- [ ] Implementar una transición suave (AnimatePresence o CSS) para el menú móvil.
- [ ] Añadir un efecto de "glassmorphism" más refinado.
- [ ] Asegurar que el logo y el texto no colisionen en pantallas ultra pequeñas.

## 2. Hero Section
- [ ] Ajustar el tamaño del logo en móviles (`width={280}` es mucho para 320px, usaremos escalas relativas).
- [ ] Optimizar la tipografía para que no cause desbordamiento horizontal.
- [ ] Reducir ligeramente la intensidad de la sombra/aura en móviles para mejorar el rendimiento.

## 3. Menú (MenuSection)
- [ ] Ocultar la barra de desplazamiento del menú de categorías (`no-scrollbar`).
- [ ] Mejorar el espaciado de las tarjetas de platos en pantallas verticales.
- [ ] Asegurar que las imágenes de los platos no ocupen demasiado espacio visual en móviles pequeños.

## 4. Secciones de Contenido (About, Testimonials, Contact)
- [ ] Ajustar los paddings laterales y verticales (`py-32` puede ser mucho para móvil, usaremos `py-20`).
- [ ] Alinear textos de manera que la lectura sea natural en pantallas estrechas.
- [ ] Optimizar el mapa para que sea amigable al tacto (evitar que se capture el scroll accidentalmente).

## 5. Rendimiento y Técnica
- [ ] Revisar el uso de `priority` en imágenes críticas.
- [ ] Minimizar el uso de animaciones pesadas en dispositivos de gama baja.
- [ ] Asegurar que no haya desbordamientos horizontales (`overflow-x-hidden` global).
