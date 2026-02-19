-- Limpiar datos previos (OPCIONAL - Ten cuidado en producción)
TRUNCATE categories, menu_items, testimonials, restaurant_info CASCADE;

-- Insertar usuario admin (la contraseña es Chavela0987$ hashada)
INSERT INTO admin_users (username, password_hash, role) VALUES 
('taquitosraros', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJw/2Ej7W', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insertar categorías reales del restaurante
INSERT INTO categories (name, description, order_index, is_active) VALUES 
('Botanas', 'Entradas y acompañamientos deliciosos para empezar', 1, true),
('Tacos', 'Nuestra especialidad con el auténtico sabor mexicano', 2, true),
('Para Compartir', 'Platos ideales para disfrutar en grupo', 3, true),
('Quesadillas', 'Tortillas de harina o maíz rellenas de queso fundido y más', 4, true),
('Fuertes', 'Platos generosos para los más hambrientos', 5, true),
('Cócteles', 'Bebidas de autor con toques mexicanos', 6, true),
('Bebidas', 'Refrescos y bebidas naturales', 7, true);

-- Insertar productos reales del menú
-- Categoría: Botanas
INSERT INTO menu_items (category_id, name, description, price, image_url, order_index, tag) VALUES 
((SELECT id FROM categories WHERE name = 'Botanas'), 'Totopos', 'Totopos acompañados de guacamole fresco', 8900, '/images/menu/botana_totopos.webp', 1, NULL),
((SELECT id FROM categories WHERE name = 'Botanas'), 'Empanadas', '4 empanadas de carne y papa acompañadas con ají de la casa', 16000, '/images/menu/botana_empanadas.webp', 2, NULL),
((SELECT id FROM categories WHERE name = 'Botanas'), 'Papas con Queso', 'Papas a la francesa bañadas en queso cheddar y guacamole', 12900, '/images/menu/botana_papas_queso.webp', 3, NULL),
((SELECT id FROM categories WHERE name = 'Botanas'), 'Papas Chavela', 'Papas a la francesa con birria de res, queso cheddar y guacamole', 24900, '/images/menu/botana_papas_chavela.webp', 4, 'Especial'),
((SELECT id FROM categories WHERE name = 'Botanas'), 'Fridas de Birria (Flautas)', '16 deditos rellenos de carne de birria, acompañados de guacamole, frijol refrito y salsa verde', 21900, '/images/menu/botana_fridas.webp', 5, NULL),
((SELECT id FROM categories WHERE name = 'Botanas'), 'Guacamole con Chicharrón', 'Guacamole fresco acompañado de chicharrón al estilo Monterrey y totopos', 24900, '/images/menu/botana_guacamole_chicharron.webp', 6, NULL),
((SELECT id FROM categories WHERE name = 'Botanas'), 'Ignacios (Nachos)', 'Totopos con birria de res, queso mozzarella gratinado, guacamole y cebolla encurtida', 32000, '/images/menu/botana_nachos.webp', 7, NULL),
((SELECT id FROM categories WHERE name = 'Botanas'), 'Burguestias', '3 mini hamburguesas en pan de papa con guacamole y queso mozzarella', 29900, '/images/menu/botana_burguestias.webp', 8, NULL),
((SELECT id FROM categories WHERE name = 'Botanas'), 'Pizza Birria', 'Tortilla de harina rellena de carne de birria, queso mozzarella y caldo', 42900, '/images/menu/botana_pizza_birria.webp', 9, NULL);

-- Categoría: Tacos
INSERT INTO menu_items (category_id, name, description, price, image_url, order_index, tag) VALUES 
((SELECT id FROM categories WHERE name = 'Tacos'), 'Rivera', 'Cerdo al pastor adobado por 24 horas en chiles y especias', 21000, '/images/menu/taco_pastor.webp', 1, '3 Unidades'),
((SELECT id FROM categories WHERE name = 'Tacos'), 'Birria de Res', 'Carne de res desmechada, marinada en adobo de chiles, tomates y especias', 21000, '/images/menu/taco_birria.webp', 2, '3 Unidades'),
((SELECT id FROM categories WHERE name = 'Tacos'), 'Chicharrón', 'Panceta de cerdo cocinada al estilo Monterrey con guacamole y cebolla roja encurtida', 21000, '/images/menu/taco_chicharron.webp', 3, '3 Unidades'),
((SELECT id FROM categories WHERE name = 'Tacos'), 'Quesabirria', 'Taco de birria con queso mozzarella fundido', 24000, '/images/menu/taco_quesabirria.webp', 4, '3 Unidades');

-- Categoría: Para Compartir
INSERT INTO menu_items (category_id, name, description, price, image_url, order_index, tag) VALUES 
((SELECT id FROM categories WHERE name = 'Para Compartir'), 'Taquiza para Compartir', 'Selección de 2 tacos de pastor (Rivera), 2 de birria y 2 de chicharrón', 40000, '/images/menu/compartir_taquiza.webp', 1, 'Ideal 2-3 pers');

-- Categoría: Quesadillas
INSERT INTO menu_items (category_id, name, description, price, image_url, order_index, tag) VALUES 
((SELECT id FROM categories WHERE name = 'Quesadillas'), 'Queso Mozzarella', 'Quesadilla de queso mozzarella, acompañada de guacamole y frijol refrito', 12900, '/images/menu/quesadilla_mozzarella.webp', 1, NULL),
((SELECT id FROM categories WHERE name = 'Quesadillas'), 'Rivera', 'Cerdo al pastor con queso mozzarella, acompañada de guacamole y frijol refrito', 16900, '/images/menu/quesadilla_pastor.webp', 2, NULL),
((SELECT id FROM categories WHERE name = 'Quesadillas'), 'Chicharrón', 'Panceta de cerdo al estilo Monterrey con mozzarella, guacamole y frijol refrito', 16900, '/images/menu/quesadilla_chicharron.webp', 3, NULL);

-- Categoría: Fuertes
INSERT INTO menu_items (category_id, name, description, price, image_url, order_index, tag) VALUES 
((SELECT id FROM categories WHERE name = 'Fuertes'), 'Burrito de Birria', 'Relleno de arroz, mozzarella y frijol refrito, con birria de res, guacamole y suero costeño', 27900, '/images/menu/fuerte_burrito_birria.webp', 1, NULL),
((SELECT id FROM categories WHERE name = 'Fuertes'), 'Burrito Cerdo al Pastor', 'Relleno de arroz, mozzarella y frijol refrito, con cerdo al pastor, guacamole y suero costeño', 27900, '/images/menu/fuerte_burrito_pastor.webp', 2, NULL);

-- Categoría: Cócteles
INSERT INTO menu_items (category_id, name, description, price, image_url, order_index, tag) VALUES 
((SELECT id FROM categories WHERE name = 'Cócteles'), 'Adiós Paloma', 'Tequila blanco, soda de pomelo, sirope de agave y zumo de limón', 23900, '/images/menu/coctel_adios_paloma.webp', 1, NULL),
((SELECT id FROM categories WHERE name = 'Cócteles'), 'Piña Chavelada', 'Ron, mermelada de piña, sirope de coco, zumo de limón y naranja', 22900, '/images/menu/coctel_pina_chavelada.webp', 2, NULL),
((SELECT id FROM categories WHERE name = 'Cócteles'), 'Gracias a la Vida', 'Tequila blanco, infusión de arándanos, horchata, hierbabuena y zumo de limón', 22900, '/images/menu/coctel_gracias_vida.webp', 3, NULL),
((SELECT id FROM categories WHERE name = 'Cócteles'), 'La Frida de Chavela', 'Margarita de autor: Tequila blanco, miel de agave y zumo de limón', 21900, '/images/menu/coctel_frida_chavela.webp', 4, NULL),
((SELECT id FROM categories WHERE name = 'Cócteles'), 'Lulo Tonic', 'Tequila blanco, lulo fresco, tónica y zumo de limón', 23900, '/images/menu/coctel_lulo_tonic.webp', 5, NULL),
((SELECT id FROM categories WHERE name = 'Cócteles'), 'Penicillín Chicano', 'Tequila blanco, aperol, mermelada de jengibre, hierbabuena y zumo de limón', 23900, '/images/menu/coctel_penicillin.webp', 6, NULL);

-- Categoría: Bebidas
INSERT INTO menu_items (category_id, name, description, price, image_url, order_index, tag) VALUES 
((SELECT id FROM categories WHERE name = 'Bebidas'), 'Coca-Cola', 'Sabor original en presentación personal', 5900, '/images/menu/bebida_cocacola.webp', 1, NULL),
((SELECT id FROM categories WHERE name = 'Bebidas'), 'Agua Mineral', 'Agua pura de manantial con o sin gas', 4900, '/images/menu/bebida_agua_mineral.webp', 2, NULL),
((SELECT id FROM categories WHERE name = 'Bebidas'), 'Limonada de Coco', 'Refrescante mezcla de limón y crema de coco', 7900, '/images/menu/bebida_limonada_coco.webp', 3, NULL),
((SELECT id FROM categories WHERE name = 'Bebidas'), 'Soda de Maracuyá', 'Soda artesanal con pulpa natural de maracuyá', 12900, '/images/menu/bebida_soda_maracuya.webp', 4, NULL),
((SELECT id FROM categories WHERE name = 'Bebidas'), 'Soda Jengibre y Limón', 'Soda refrescante de la casa con jengibre y limón', 12900, '/images/menu/bebida_soda_jengibre_limon.webp', 5, NULL),
((SELECT id FROM categories WHERE name = 'Bebidas'), 'Soda de Frutos Rojo', 'Mezcla artesanal de moras, fresas y arándanos', 12900, '/images/menu/bebida_soda_frutos_rojos.webp', 6, NULL);

-- Información del restaurante real
INSERT INTO restaurant_info (key, value) VALUES 
('name', 'Chavela Cocina Mexicana'),
('description', 'Auténtica fusión colombo-mexicana en el corazón de Usaquén'),
('phone', '+57 300 000 0000'),
('address', 'Calle 124 #15-84 Local BBC, Bogotá, Colombia'),
('instagram', 'chavela.cocina'),
('whatsapp', 'https://wa.me/573000000000'),
('hours_week', 'Lun - Jue: 3:30 PM - 10:00 PM'),
('hours_weekend', 'Vie - Sab: 2:30 PM - 11:00 PM'),
('hours_sunday', 'Dom: 3:30 PM - 10:00 PM');

-- Testimonios reales
INSERT INTO testimonials (customer_name, rating, comment, is_approved) VALUES 
('B Her', 5, 'Ambiente genial, personal muy amable, servicio rápido, comida fresca y muy buena temperatura de la comida! Recomendado 100%', true),
('Nidia Valenzuela', 5, 'La comida espectacular. Todo delicioso y muy auténtico. Un pedacito de México en Bogotá.', true),
('Heydi León', 5, 'Muy buen lugar, muy buena atención y el servicio de los meseros excelente. La atmósfera es mágica.', true),
('Yuris yaneth Contreras', 5, 'Excelente servicio y la comida muy rica y el servicio excelente 10/10. Muy recomendado.', true),
('Jose Tovar', 5, 'Excelente comida, servicio y ambiente en el corazón de Usaquén. Todo de 5 estrellas.', true),
('Paula Duran', 5, 'El mejor lugar para disfrutar de la auténtica fusión colombo-mexicana. ¡Volveré pronto!', true);
