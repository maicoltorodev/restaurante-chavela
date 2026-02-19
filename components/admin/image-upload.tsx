"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    onRemove: () => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            const file = e.target.files?.[0]
            if (!file) return

            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                toast.error('El archivo debe ser una imagen')
                return
            }

            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `menu/${fileName}`

            // Subir a Supabase Storage
            const { data, error } = await supabase.storage
                .from('images') // Asegúrate de tener un bucket llamado 'images'
                .upload(filePath, file)

            if (error) throw error

            // Obtener URL pública
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath)

            onChange(publicUrl)
            toast.success('Imagen subida correctamente')
        } catch (error: any) {
            console.error('Error uploading:', error)
            toast.error('Error al subir la imagen: ' + (error.message || 'Inténtalo de nuevo'))
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-4 w-full">
            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-border group">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={onRemove}
                                className="h-8 w-8"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="w-40 h-40 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center bg-muted/5">
                        <ImageIcon className="h-8 w-8 text-muted-foreground/40 mb-2" />
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Sin imagen</p>
                    </div>
                )}

                <div className="flex-1">
                    <label className="relative cursor-pointer">
                        <div className="flex flex-col gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={uploading}
                                className="relative overflow-hidden group"
                            >
                                {uploading ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <Upload className="h-4 w-4 mr-2" />
                                )}
                                {uploading ? 'Subiendo...' : 'Seleccionar Imagen'}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleUpload}
                                    disabled={uploading}
                                    accept="image/*"
                                />
                            </Button>
                            <p className="text-[10px] text-muted-foreground italic">
                                Recomendado: 800x800px (JPG/PNG/WEBP). Máx 2MB.
                            </p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}
