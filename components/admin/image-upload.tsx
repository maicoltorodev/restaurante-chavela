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

    const convertToWebP = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Error de contexto canvas'))
                    return
                }
                ctx.drawImage(img, 0, 0)
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob)
                    else reject(new Error('Error de conversión'))
                }, 'image/webp', 0.8) // Calidad 80%
            }
            img.onerror = (e) => reject(e)
            img.src = URL.createObjectURL(file)
        })
    }

    const deleteOldImage = async (url: string) => {
        if (!url) return
        try {
            await fetch('/api/upload', {
                method: 'DELETE',
                body: JSON.stringify({ url }),
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) {
            console.error('Error deleting old image:', error)
        }
    }

    const handleRemove = async () => {
        if (value) {
            await deleteOldImage(value)
            toast.info('Imagen anterior eliminada')
        }
        onRemove()
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0]
            if (!file) return

            // 1. Validar Tipo Inicial
            if (!file.type.startsWith('image/')) {
                toast.error('Solo se permiten imágenes')
                return
            }

            setUploading(true)
            toast.info('Optimizando imagen...', { duration: 2000 })

            // 2. Convertir a WebP y Comprimir
            const webpBlob = await convertToWebP(file)

            // 3. Validar Tamaño Final (Máx 2MB)
            const MAX_SIZE = 2 * 1024 * 1024
            if (webpBlob.size > MAX_SIZE) {
                toast.error(`La imagen es muy pesada (${(webpBlob.size / 1024 / 1024).toFixed(1)}MB). Intenta reducirla.`)
                setUploading(false)
                return
            }

            // 4. Generar nombre único
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.webp`
            const filePath = `menu/${fileName}`

            // 5. Subir a través de API Route (Seguro, Server-Side Upload)
            const formData = new FormData()
            formData.append('file', webpBlob)
            formData.append('path', filePath)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Error en el servidor')
            }

            // SI YA HABÍA UNA IMAGEN, BORRAR LA ANTERIOR PARA AHORRAR ESPACIO
            if (value) {
                await deleteOldImage(value)
            }

            onChange(result.publicUrl)
            toast.success('Imagen procesada y subida')
        } catch (error: any) {
            console.error('Error uploading:', error)
            toast.error('Error al subir: ' + (error.message || 'Inténtalo de nuevo'))
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
                                onClick={handleRemove}
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
                                    accept="image/jpeg,image/png,image/webp"
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
