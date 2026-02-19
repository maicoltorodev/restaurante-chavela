-- Categorías del menú
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Productos del menú
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  ingredients TEXT[],
  image_url VARCHAR(500),
  tag VARCHAR(50), -- Etiqueta especial (ej: "3 Unidades", "Nuevo", "Picante")
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  allergens TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Información del restaurante
CREATE TABLE restaurant_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonios
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(200) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usuarios admin
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_active ON menu_items(is_active);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX idx_admin_users_username ON admin_users(username);

-- RLS Policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas públicas de lectura
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Menu items are viewable by everyone" ON menu_items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Restaurant info is viewable by everyone" ON restaurant_info
  FOR SELECT USING (true);

CREATE POLICY "Approved testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (is_approved = true);

-- Políticas de admin (solo usuarios autenticados)
CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can manage menu items" ON menu_items
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can manage restaurant info" ON restaurant_info
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can manage testimonials" ON testimonials
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can manage admin users" ON admin_users
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Función para actualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para timestamps
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurant_info_updated_at BEFORE UPDATE ON restaurant_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
