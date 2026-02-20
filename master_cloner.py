import os
import shutil
import re
import secrets

def setup_new_project():
    print("\n" + "="*50)
    print("🚀 CHAVELA MASTER CLONER - TEMPLATE GOLD 🚀")
    print("="*50)
    
    # 1. Datos del Cliente
    brand_name = input("\n📝 Nombre del Restaurante (ej: El Italiano): ")
    slogan = input("✨ Slogan (ej: La mejor pasta artesanal): ")
    location = input("📍 Ubicación (ej: Chia, Cundinamarca): ")
    whatsapp = input("📞 WhatsApp (solo números, ej: 573101234567): ")
    domain = input("🌐 Dominio Vercel (ej: el-italiano.vercel.app): ")

    # 2. Configuración Visual (Presets de OKLCH)
    print("\n🎨 Selecciona un color de marca (Primary Color):")
    print("1. Mexican Red (Actual)  - oklch(0.62 0.22 25)")
    print("2. Italian Green         - oklch(0.60 0.20 150)")
    print("3. Mediterranean Blue    - oklch(0.55 0.18 250)")
    print("4. Elegant Gold          - oklch(0.75 0.16 75)")
    print("5. Custom (Ingresar manual)")
    
    choice = input("Opción: ")
    colors = {
        "1": "oklch(0.62 0.22 25)",
        "2": "oklch(0.60 0.20 150)",
        "3": "oklch(0.55 0.18 250)",
        "4": "oklch(0.75 0.16 75)"
    }
    primary_color = colors.get(choice, colors["1"])
    if choice == "5":
        primary_color = input("Ingresa el color oklch (ej: oklch(0.6 0.1 20)): ")

    # 3. Datos de Supabase
    print("\n🔑 Configuración de Supabase (Nueva DB):")
    sb_url = input("Supabase URL: ")
    sb_anon = input("Supabase Anon Key: ")
    sb_role = input("Supabase Service Role Key: ")
    jwt_secret = secrets.token_hex(32) # Generamos uno nuevo y seguro

    # 4. Proceso de Clonación
    folder_name = brand_name.lower().replace(" ", "-")
    target_dir = f"../{folder_name}"
    
    if os.path.exists(target_dir):
        print(f"\n❌ Error: La carpeta {target_dir} ya existe.")
        return

    print(f"\n📦 Clonando base de código en {target_dir}...")
    # Ignoramos carpetas pesadas para la copia
    ignore = shutil.ignore_patterns('.next', 'node_modules', '.git', 'master_cloner.py')
    shutil.copytree(".", target_dir, ignore=ignore)

    # 5. Reemplazo de metadatos en layout.tsx
    layout_path = os.path.join(target_dir, "app/layout.tsx")
    with open(layout_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    content = re.sub(r"title: '.*?'", f"title: '{brand_name} | {slogan}'", content)
    content = content.replace("Chavela Cocina Mexicana", brand_name)
    content = content.replace("Taquitos de un mundo raro", slogan)
    content = content.replace("https://chavelacocina.vercel.app", f"https://{domain}")
    
    with open(layout_path, "w", encoding="utf-8") as f:
        f.write(content)

    # 6. Actualización de .env.local
    env_path = os.path.join(target_dir, ".env.local")
    env_content = f"""NEXT_PUBLIC_SUPABASE_URL={sb_url}
NEXT_PUBLIC_SUPABASE_ANON_KEY={sb_anon}
SUPABASE_SERVICE_ROLE_KEY={sb_role}
JWT_SECRET={jwt_secret}
"""
    with open(env_path, "w", encoding="utf-8") as f:
        f.write(env_content)

    # 7. Actualización de Color en globals.css
    css_path = os.path.join(target_dir, "app/globals.css")
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()
    css = re.sub(r"--primary: oklch\(.*?\);", f"--primary: {primary_color};", css)
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css)

    # 8. Navbar y ubicación
    navbar_path = os.path.join(target_dir, "components/navbar.tsx")
    with open(navbar_path, "r", encoding="utf-8") as f:
        nav = f.read()
    nav = re.sub(r'wa\.me/\d+', f'wa.me/{whatsapp}', nav)
    nav = nav.replace("Usaquén · Bogotá", location)
    nav = nav.replace("Chavela", brand_name)
    with open(navbar_path, "w", encoding="utf-8") as f:
        f.write(nav)

    print("\n" + "="*50)
    print(f"✅ ¡PROYECTO '{brand_name}' GENERADO CON ÉXITO!")
    print(f"📁 Carpeta: {target_dir}")
    print("="*50)
    print("\nPróximos pasos:")
    print(f"1. Entra a la carpeta: cd {target_dir}")
    print("2. Instala dependencias: pnpm install")
    print("3. Ejecuta el SQL de 'database/schema.sql' en tu nuevo Supabase.")
    print("4. Reemplaza el logo en 'public/images/logo.png'.")
    print("5. ¡Disfruta de tu nueva venta! 💸\n")

if __name__ == "__main__":
    setup_new_project()