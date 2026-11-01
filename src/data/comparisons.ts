// Pares antes/después del slider de Trabajos. Mismo tamaño y encuadre en las dos fotos de cada par.
// Para cambiar una foto, cambiá el nombre del archivo acá: las fotos viven en src/assets/trabajos/.

const AMAROK_ANTES = 'amarok-antes.webp'
const AMAROK_DESPUES = 'amarok-despues.webp'
const HILUX_MOTOR_ANTES = 'hilux-motor-antes.webp'
const HILUX_MOTOR_DESPUES = 'hilux-motor-despues.webp'

export interface Comparison {
	id: string
	servicio: string // rótulo visible y texto del mensaje de WhatsApp
	before: { src: string; alt: string }
	after: { src: string; alt: string }
}

export const comparisons: Comparison[] = [
	{
		id: 'amarok',
		servicio: 'Lavado tradicional',
		before: {
			src: AMAROK_ANTES,
			alt: 'Volkswagen Amarok gris antes del lavado, con barro y polvo en la caja y los laterales.',
		},
		after: {
			src: AMAROK_DESPUES,
			alt: 'La misma Amarok después del lavado tradicional, limpia y brillante.',
		},
	},
	{
		id: 'hilux-motor',
		servicio: 'Lavado y acondicionado de motor',
		before: {
			src: HILUX_MOTOR_ANTES,
			alt: 'Motor de una Toyota Hilux antes del lavado, con polvo y manchas.',
		},
		after: {
			src: HILUX_MOTOR_DESPUES,
			alt: 'El mismo motor después del lavado y acondicionado, limpio.',
		},
	},
]
