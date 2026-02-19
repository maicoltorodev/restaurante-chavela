# 📋 CMS CHAVELA - IMPLEMENTATION PLAN

## 🔐 CREDENCIALES ADMIN
- **Username**: `taquitosraros`
- **Password**: `Chavela0987$`

---

## 🎯 PLAN COMPLETO DE IMPLEMENTACIÓN

### 📅 ORDEN CRÍTICO DE DESARROLLO

#### 🏁 SEMANA 1: FUNDAMENTOS

**DÍA 1: Infraestructura Base**
- [ ] Crear proyecto Supabase (FREE tier)
- [ ] Configurar variables de entorno
- [ ] Instalar dependencias: `@supabase/supabase-js`, `@supabase/auth-helpers-nextjs`

**DÍA 2: Base de Datos**
```sql
-- Tablas principales
categories (id, name, description, order_index, is_active, created_at, updated_at)
menu_items (id, category_id, name, description, price, ingredients, image_url, order_index, is_active, allergens, created_at, updated_at)
restaurant_info (id, key, value, updated_at)
testimonials (id, customer_name, rating, comment, is_approved, created_at, updated_at)
admin_users (id UUID, username VARCHAR(50) UNIQUE, password_hash VARCHAR(255), role VARCHAR(20), last_login TIMESTAMP, created_at TIMESTAMP)
```

**DÍA 3: Conexión Supabase**
- [ ] Configurar cliente Supabase (`lib/supabase/client.ts`, `lib/supabase/server.ts`)
- [ ] Test de conexión y auth

#### 📊 SEMANA 2: CORE FUNCTIONALITY

**DÍA 4: Autenticación Username-Based**
- [ ] Custom auth con username `taquitosraros`
- [ ] Middleware para proteger rutas `/admin`
- [ ] Login/Logout con password `Chavela0987$`

**DÍA 5: Data Fetching**
- [ ] Server Components para menú
- [ ] Tipado con Zod
- [ ] `lib/supabase/queries.ts`

**DÍA 6: CMS Básico**
- [ ] Estructura admin (`app/(admin)/`)
- [ ] CRUD categorías

#### ⚡ SEMANA 3: OPTIMIZACIÓN

**DÍA 7: Caching Strategy**
- [ ] `unstable_cache()` para queries
- [ ] On-Demand Revalidation webhook `/api/revalidate`

**DÍA 8: Realtime**
- [ ] Subscriptions para precios/imágenes/descripciones/contactos
- [ ] Client Islands para interactividad

**DÍA 9: Performance**
- [ ] Edge Runtime everywhere
- [ ] Supabase Storage para imágenes

#### 🎨 SEMANA 4: CMS COMPLETO

**DÍA 10-11: Menú Management**
- [ ] CRUD productos completo
- [ ] Upload imágenes
- [ ] Drag & Drop ordering

**DÍA 12: UI/UX Polish**
- [ ] Responsive CMS
- [ ] Microinteracciones

#### 🚀 SEMANA 5: DEPLOY

**DÍA 13-15: Testing y Deploy**
- [ ] End-to-end testing
- [ ] Production deploy
- [ ] Documentation

---

## 🏗️ ARQUITECTURA TÉCNICA

### 📁 ESTRUCTURA DE CARPETAS
```
app/
├── (admin)/
│   ├── layout.tsx (protegido)
│   ├── page.tsx (dashboard)
│   ├── menu/
│   │   ├── page.tsx (gestión menú)
│   │   └── categories/
│   ├── testimonials/
│   └── settings/
├── api/
│   ├── revalidate/route.ts (webhook Supabase)
│   ├── auth/route.ts
│   └── upload/route.ts
├── menu/
│   └── [category]/page.tsx (estático)
lib/
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   └── auth.ts
├── cms/
│   ├── types.ts
│   └── utils.ts
└── cache/
    └── utils.ts
components/
├── ui/ (Server components)
├── menu/
│   ├── MenuGrid.tsx (Server)
│   ├── MenuItemCard.tsx (Client Island)
│   └── MenuFilters.tsx (Client Island)
└── admin/
    ├── Dashboard.tsx (Client)
    ├── MenuEditor.tsx (Client)
    └── RealtimeUpdater.tsx (Client)
```

### ⚡ OPTIMIZACIÓN EXTREMA

**5 Capas de Caché:**
1. **CDN Cache** (Vercel Edge) - Páginas estáticas (1h + revalidación)
2. **Browser Cache** (Service Worker) - Offline support
3. **Memory Cache** (`unstable_cache()`) - Datos frecuentes
4. **Database Cache** (PostgreSQL) - Queries cache
5. **Application Cache** (React state) - Sesión actual

**Realtime vs Cache:**
- **Realtime Inmediato**: precios, imágenes, descripciones, contactos
- **Cache Estratégico**: categorías, horarios, testimonios

### 🔄 ON-DEMAND REVALIDATION FLOW
1. Admin actualiza → Supabase DB
2. Trigger/Function → Webhook Vercel API
3. Vercel revalida → `revalidatePath()` + tags
4. Next.js regenera → Páginas estáticas
5. Realtime subscribers → UI sin refresh

---

## 🎯 PERFORMANCE TARGETS
- **FCP**: < 800ms
- **LCP**: < 1.5s
- **TTI**: < 2.0s
- **CLS**: < 0.05
- **CMS response**: < 200ms
- **Realtime updates**: < 100ms
- **Cache hit rate**: > 95%

---

## 💰 COSTOS (PLAN GRATUITO)
- **Supabase Free**: $0 (500MB DB, 1GB Storage, 2 conexiones realtime)
- **Vercel Hobby**: $0 (100GB bandwidth, Edge Functions incluidas)
- **Total**: $0

---

## 📋 DEPENDENCIAS CRÍTICAS (PENDIENTES)

### ✅ CONFIGURADO
- [x] Username: `taquitosraros`
- [x] Password: `Chavela0987$`

### 🔄 PENDIENTE DEL CLIENTE
- [ ] Crear cuenta Supabase (https://supabase.com)
- [ ] Crear proyecto "chavela-cms"
- [ ] Obtener Project URL y API Keys
- [ ] Preparar contenido inicial (menú, imágenes, precios)
- [ ] Logo del restaurante
- [ ] Información de contacto y horarios

---

## 🚀 PRÓXIMOS PASOS
1. **HOY**: Cliente crea cuenta Supabase y obtiene claves
2. **MAÑANA**: Empezar implementación Día 1-3
3. **SEMANA SIGUIENTE**: Desarrollo completo CMS

---

## 📝 NOTAS DE DESARROLLO
- Auth custom con username (más simple que email)
- Edge Runtime para máxima velocidad
- Server Components por defecto, Client Islands mínimas
- On-Demand Revalidation vs ISR
- Realtime para cambios críticos, Cache para datos estables

---
*Última actualización: 19 Feb 2026*
