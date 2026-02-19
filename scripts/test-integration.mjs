import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import path from 'path'

// Cargar variables de entorno desde .env.local manualmente
try {
    const envContent = readFileSync('.env.local', 'utf8')
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
            process.env[key.trim()] = value
        }
    })
} catch (e) {
    console.error('⚠️ No se pudo cargar .env.local. Asegúrate de que exista.')
    process.exit(1)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan llaves de Supabase en las variables de entorno.')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function runTests() {
    console.log('🚀 Iniciando pruebas de integración del CMS...\n')

    const tests = [
        { name: 'Conexión a Categorías', table: 'categories' },
        { name: 'Conexión a Menú Items', table: 'menu_items' },
        { name: 'Conexión a Testimonios', table: 'testimonials' },
        { name: 'Conexión a Restaurant Info', table: 'restaurant_info' },
        { name: 'Conexión a Usuarios Admin', table: 'admin_users' }
    ]

    let passed = 0

    for (const test of tests) {
        try {
            const { data, error, count } = await supabase
                .from(test.table)
                .select('*', { count: 'exact', head: false })
                .limit(1)

            if (error) throw error

            console.log(`✅ ${test.name}: OK (${data.length} registros encontrados)`)
            passed++
        } catch (error) {
            console.log(`❌ ${test.name}: ERROR - ${error.message}`)
        }
    }

    console.log(`\n📊 Resumen: ${passed}/${tests.length} tests pasados.`)

    if (passed === tests.length) {
        console.log('\n✨ ¡Todo parece estar configurado correctamente en Supabase!')
    } else {
        console.log('\n⚠️ Revisa los errores arriba. Asegúrate de haber corrido el schema y el seed.')
    }
}

runTests()
