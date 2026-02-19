# 🍷 Chavela CMS: Master Architecture Guide

Esta es la documentación técnica definitiva del proyecto **Chavela**. Este documento sirve como mapa para desarrolladores y administradores que necesiten mantener o expandir el sistema.

---

## 🚀 Tech Stack (Vanguardia Digital)

El proyecto utiliza las tecnologías más recientes del mercado para garantizar rendimiento extremo y una experiencia de usuario premium:

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **Runtime**: [React 19](https://react.dev/) (Concurrent Rendering & Shared Promises)
- **Styling**: [Tailwind CSS v4.0](https://tailwindcss.com/) (Motor de alto rendimiento)
- **Base de Datos**: [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security)
- **Autenticación**: JWT custom con `bcryptjs` y cookies seguras (`HttpOnly`).
- **Validación**: [Zod](https://zod.dev/) (Esquemas de datos estrictos pero flexibles).
- **Notificaciones**: [Sonner](https://sonner.stevenly.me/) (Toast system minimalista).
- **Iconografía**: [Lucide React](https://lucide.dev/).
- **Tiempo Real**: Supabase Realtime (Subscripciones via WebSockets).

---

## ⚡ Estrategia de Caché y Rendimiento

Chavela utiliza un sistema de caché de tres niveles para garantizar que el sitio sea extremadamente rápido pero siempre esté actualizado:

1.  **Deduplicación y Memoización**: Next.js evita peticiones duplicadas a la base de datos dentro del mismo ciclo de renderizado.
2.  **Persistent Cache (`unstable_cache`)**: Las consultas pesadas (Menú, Categorías) están envueltas en `unstable_cache` dentro de `lib/supabase/queries.ts`. 
    - *TTL*: 1 hora por defecto.
    - *Tags*: Usamos tags como `['menu-items']` o `['categories']` para poder invalidar la caché de forma selectiva.
3.  **On-Demand Revalidation**: Contamos con un endpoint de revalidación en `/api/revalidate`.
    - **Trigger**: Se dispara mediante Webhooks de Supabase cuando ocurre un cambio (UPDATE, INSERT, DELETE) en las tablas principales.
    - **Seguridad**: El endpoint requiere un `SUPABASE_WEBHOOK_SECRET` en el header de Authorization.
    - **Acción**: Ejecuta `revalidateTag()` y `revalidatePath('/')` para purgar la caché vieja y generar la nueva versión del sitio al instante.

---

## 📡 Sincronización en Tiempo Real (Realtime)

Para que el Admin Panel se sienta "vivo", usamos **Supabase Realtime**:

- **Componente Central**: `components/admin/realtime-updater.tsx`.
- **Funcionamiento**: El componente se suscribe a los canales de Postgres Changes. Cuando alguien (u otro administrador) modifica el menú, el componente recibe el evento por WebSockets y dispara:
    1. Una notificación visual (Toast).
    2. Ejecuta `router.refresh()` o callbacks específicos para refrescar la UI sin recargar la página.
- **Canales Activos**: `menu_items`, `categories`, `testimonials`.

---

## 🏗️ Arquitectura de Archivos

```text
/app
  ├── (frontend)     # Sitio público para los comensales
  ├── /admin         # Panel de control (Dashboard, Menú, Categorías)
  ├── /api           # Endpoints de datos (CRUD)
  └── /login         # Acceso exclusivo Chef
/components
  ├── /ui            # Componentes base (Shadcn modificados)
  ├── /admin         # Componentes específicos del panel
  └── /...           # Componentes temáticos (Hero, Menu, etc.)
/lib
  ├── /supabase      # Clientes y consultas (Queries & Auth)
  ├── /cms           # Tipos de TypeScript y Validaciones Zod
  └── utils.ts       # Utilidades (Formato COP, Tailwind merge)
/public              # Activos estáticos (Imágenes .webp, Logos)
```

---

## 🔐 Sistema de Autenticación

El acceso al `/admin` está protegido por un flujo de seguridad de dos niveles:

1.  **Middleware (`middleware.ts`)**: Verifica la presencia de la cookie `auth-token`. Si no existe, bloquea el acceso a `/admin/*` y redirige a `/login`.
2.  **Server-side Validation (`app/admin/layout.tsx`)**: El Layout raíz de administración valida la firma del JWT usando una `JWT_SECRET` en el servidor. Si el token es inválido o expiró, redirige al login. Esto garantiza que nadie pueda entrar incluso si falsifican una cookie manualmente.

> **Importante**: Las contraseñas se almacenan como hashes `bcrypt`. Si necesitas resetear el acceso, debes generar un nuevo hash y actualizarlo en la tabla `admin_users`.

---

## 🔄 Flujo de Datos (Next.js 16 Patterns)

Siguiendo las mejores prácticas de **Next.js 16**, hemos optimizado el flujo de datos:

- **Server Components (RSC)**: Las páginas de administración (ej: `admin/menu/page.tsx`) cargan los datos directamente desde Supabase en el servidor. Esto elimina parpadeos y pantallas de carga innecesarias.
- **Async Params**: Todas las rutas dinámicas deben esperar (`await`) a los parámetros. 
    ```tsx
    // Correcto en Next 16
    export default async function Page({ params }: { params: Promise<{ id: string }> }) {
        const { id } = await params;
    }
    ```
- **Híbridos Cliente/Servidor**: Usamos componentes de servidor para el layout y carga de datos, e inyectamos componentes de cliente para formularios o tablas interactivas.

---

## 🎨 Diseño "Dark Luxury"

El sistema utiliza una identidad visual de alta gama:
- **Colores Primarios**: `#0a0605` (Fondo profundo), `#14100f` (Tarjetas), `#ff6b35` (Acentos Chavela).
- **Tipografía**: Mezcla de Serif para títulos (Elegancia) y Sans para datos (Legibilidad).
- **Efectos**: Glassmorphism (`backdrop-blur`), bordes sutiles en `white/5` y sombras profundas.

---

## 📦 Base de Datos (Tablas Clave)

1.  **`menu_items`**: El corazón de la carta. Almacena ingredientes, precios, imágenes y alérgenos.
2.  **`categories`**: Define la arquitectura del menú (Entradas, Fuertes, etc.).
3.  **`testimonials`**: Opiniones con sistema de moderación boolean (`is_approved`).
4.  **`restaurant_info`**: Configuración global (Dirección, Teléfono, Instagram).
5.  **`admin_users`**: Credenciales del staff.

---

## 💡 Notas para el Mantenimiento

- **Imágenes**: Se recomienda usar formato `.webp` para optimizar la carga en móviles. El CMS acepta rutas locales `/images/menu/*` o URLs externas.
- **Precios**: Se usa la función `formatPrice` en `lib/utils.ts`. Siempre almacena los precios como números enteros en la DB (ej: `45000`).
- **Limites del Edge**: Las APIs marcadas con `runtime = 'edge'` son rápidas pero no pueden usar todas las librerías de Node.js. Si algo falla en la API, revisa el runtime.
- **Validaciones**: Si agregas un nuevo campo al menú, **debes** actualizar el esquema en `lib/cms/validations.ts` para que el error "Datos no válidos" no aparezca.

---

*Documento actualizado al 19 de Febrero, 2026.*
