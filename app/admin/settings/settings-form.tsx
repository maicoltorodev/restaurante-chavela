"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Save, Info, MapPin, Phone, Instagram, Clock, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface SettingsFormProps {
    initialData: Record<string, string>
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState(initialData)
    const router = useRouter()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)

        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                toast.success('¡Configuración de Chavela actualizada!')
                router.refresh()
            } else {
                toast.error('Error al actualizar la configuración')
            }
        } catch (error) {
            toast.error('Error de conexión')
        } finally {
            setSaving(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-8 sticky top-0 bg-[#0a0605]/80 backdrop-blur-md py-6 z-10 border-b border-white/5">
                <div>
                    <h1 className="text-4xl font-serif text-white">Configuración</h1>
                    <p className="text-muted-foreground text-sm mt-1">Defina la identidad y esencia digital del restaurante</p>
                </div>
                <Button
                    type="submit"
                    disabled={saving}
                    className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-10 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 min-w-[180px]"
                >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    {saving ? 'Aplicando...' : 'Aplicar Cambios'}
                </Button>
            </div>

            {/* Sección: Identidad */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <Info className="h-4 w-4" />
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Identidad Maestra</h2>
                    </div>
                    <p className="text-[11px] text-muted-foreground/60 leading-relaxed font-sans">
                        La voz y el alma de su marca. Estos detalles definen cómo se presenta su arte culinario ante el mundo digital.
                    </p>
                </div>

                <Card className="lg:col-span-2 bg-[#14100f] border-white/5 shadow-2xl rounded-2xl overflow-hidden">
                    <CardContent className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Nombre del Restaurante</Label>
                                <Input
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="bg-black/20 border-white/5 h-12 focus-visible:ring-primary/40 text-white font-medium"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Instagram (Handle)</Label>
                                <div className="relative">
                                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                                    <Input
                                        value={formData.instagram || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                                        className="bg-black/20 border-white/5 h-12 pl-10 focus-visible:ring-primary/40 text-white"
                                        placeholder="@chavela_restaurante"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Eslogan / Filosofía de Cocina</Label>
                            <Textarea
                                value={formData.description || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                rows={3}
                                className="bg-black/20 border-white/5 focus-visible:ring-primary/40 text-white resize-none py-4 text-sm font-medium"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sección: Localización y Contacto */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-white/5 pt-12">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <MapPin className="h-4 w-4" />
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Reserva y Contacto</h2>
                    </div>
                    <p className="text-[11px] text-muted-foreground/60 leading-relaxed font-sans">
                        Facilite la llegada de sus comensales. Una ubicación clara proyecta confianza y excelencia en el servicio.
                    </p>
                </div>

                <Card className="lg:col-span-2 bg-[#14100f] border-white/5 shadow-2xl rounded-2xl overflow-hidden">
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-3">
                            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Dirección de la Sede</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-4 h-4 w-4 text-primary/40" />
                                <Input
                                    value={formData.address || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                    className="bg-black/20 border-white/5 h-12 pl-10 focus-visible:ring-primary/40 text-white font-medium"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Línea de Reservas</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                                    <Input
                                        value={formData.phone || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        className="bg-black/20 border-white/5 h-12 pl-10 focus-visible:ring-primary/40 text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Enlace WhatsApp Directo</Label>
                                <Input
                                    value={formData.whatsapp || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                                    className="bg-black/20 border-white/5 h-12 focus-visible:ring-primary/40 text-white"
                                    placeholder="https://wa.me/..."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sección: Horarios */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-white/5 pt-12">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <Clock className="h-4 w-4" />
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Horarios de Gracia</h2>
                    </div>
                    <p className="text-[11px] text-muted-foreground/60 leading-relaxed font-sans">
                        La puntualidad es parte del respeto culinario. Defina sus momentos de atención con precisión.
                    </p>
                </div>

                <Card className="lg:col-span-2 bg-[#14100f] border-white/5 shadow-2xl rounded-2xl overflow-hidden">
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Lunes a Jueves</Label>
                                <Input
                                    value={formData.hours_week || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hours_week: e.target.value }))}
                                    className="bg-black/20 border-white/5 h-12 focus-visible:ring-primary/40 text-white font-medium"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Viernes y Sábado</Label>
                                <Input
                                    value={formData.hours_weekend || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hours_weekend: e.target.value }))}
                                    className="bg-black/20 border-white/5 h-12 focus-visible:ring-primary/40 text-white font-medium"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Domingos</Label>
                                <Input
                                    value={formData.hours_sunday || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hours_sunday: e.target.value }))}
                                    className="bg-black/20 border-white/5 h-12 focus-visible:ring-primary/40 text-white font-medium"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    )
}
