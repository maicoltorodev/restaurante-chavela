import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🚀 Configurando base de datos...')

  try {
    // Leer y ejecutar schema
    const schema = readFileSync(join(__dirname, '../database/schema.sql'), 'utf8')
    
    const { error: schemaError } = await supabase.rpc('exec_sql', { sql: schema })
    if (schemaError) {
      console.error('Error ejecutando schema:', schemaError)
      return
    }

    console.log('✅ Schema creado correctamente')

    // Leer y ejecutar seed
    const seed = readFileSync(join(__dirname, '../database/seed.sql'), 'utf8')
    
    const { error: seedError } = await supabase.rpc('exec_sql', { sql: seed })
    if (seedError) {
      console.error('Error ejecutando seed:', seedError)
      return
    }

    console.log('✅ Datos iniciales insertados')
    console.log('🎉 Base de datos configurada exitosamente!')
    console.log('👤 Usuario: taquitosraros')
    console.log('🔑 Contraseña: Chavela0987$')

  } catch (error) {
    console.error('Error configurando base de datos:', error)
  }
}

setupDatabase()
