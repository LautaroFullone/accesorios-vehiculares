// Datos del negocio y copys editables. Cambiar acá no requiere tocar la página.

export const business = {
	name: 'Accesorios Vehiculares MdP',
	city: 'Mar del Plata',
	// La zona se nombra únicamente en la sección Ubicación.
	zone: 'Barrio Constitución, Mar del Plata',
	instagram: {
		handle: '@accesoriosvehicularesmdp',
		display: 'accesoriosvehicularesmdp',
		url: 'https://www.instagram.com/accesoriosvehicularesmdp/',
	},
	whatsapp: {
		display: '+54 9 223 538-5974',
		number: '5492235385974',
	},
	// Datos de contacto del pie. Texto plano, sin íconos.
	contact: {
		name: 'Ramiro Altamirano',
		// TODO: cargar el mail real. Mientras sea null, el pie no muestra esa línea.
		email: null as string | null,
		phone: '+54 9 2235385974',
		phoneHref: 'tel:+5492235385974',
		place: 'Mar del Plata, Argentina',
	},
	// TODO: reemplazar por el logo mejorado cuando exista (es la foto de perfil de Instagram, 320x320).
	logo: { src: '/logo-actual.jpg', alt: 'Accesorios Vehiculares MdP' },
	// Se atiende solo con turno previo y la dirección exacta se pasa por WhatsApp al confirmar:
	// el mapa marca únicamente la zona (barrio), nunca el domicilio. No cargar acá la dirección
	// ni el link exacto: este archivo viaja dentro del JavaScript público del sitio.
	location: {
		// Centro público del barrio (OpenStreetMap). Nunca cargar acá el domicilio.
		zone: { lat: -37.9618, lng: -57.5468 },
		zoom: 14,
		// En escritorio el barrio se corre hacia la izquierda para que la tarjeta quede sobre el mar.
		shiftPx: 340,
	},
} as const

// Sin marcador: el mapa se centra en `shiftPx` píxeles al este del barrio, así el barrio queda
// corrido hacia la izquierda. La escala horizontal de Mercator es lineal: 360° = 256 * 2^zoom px.
export const mapEmbedUrl = (
	zone: { lat: number; lng: number },
	zoom: number,
	shiftPx = 0,
) => {
	const lng = zone.lng + (shiftPx * 360) / (256 * 2 ** zoom)
	return `https://maps.google.com/maps?ll=${zone.lat},${lng.toFixed(5)}&z=${zoom}&t=m&output=embed&hl=es`
}

export const copy = {
	title: 'Accesorios Vehiculares MdP — Lavado y detailing en Mar del Plata',
	description:
		'Lavado, sellador cerámico y mantenimiento para autos que se cuidan, en Mar del Plata. Armá tu servicio y reservá tu turno por WhatsApp.',
	hero: {
		headline: 'Que vuelva a verse como el primer día.',
		subtitle:
			'Cada auto necesita algo distinto. Elegí lo que necesita el tuyo y reservá un turno con nosotros',
		cta: 'Pedí tu turno',
	},
	configurator: {
		title: 'Configurá el cuidado de tu auto',
		vehicleLabel: 'Tu vehículo',
		includedTag: 'Incluido',
		summaryTitle: 'Tu configuración',
		totalLabel: 'Total estimado',
		send: 'Enviar por WhatsApp',
		note: 'Te confirmamos el turno por WhatsApp.',
	},
	maintenance: {
		title: 'Mantenimiento',
		intro: 'Para el que lava seguido. Precio por lavado.',
		perWash: 'por lavado',
		cta: 'Quiero este plan',
	},
	works: {
		// TODO: el título y la sección siguen provisorios mientras las fotos sean placeholders.
		title: 'Tu auto merece brillar así.',
		before: 'Antes',
		after: 'Después',
		placeholder: 'Foto del trabajo',
		// TODO: sumar fotos reales de Instagram: { src: '/trabajos/foto.webp', alt: 'Descripción' }
		photos: [] as { src: string; alt: string }[],
		beforeAfter: null as null | { before: string; after: string; alt: string },
	},
	close: {
		title: 'Tu turno a un mensaje de distancia.',
		cta: 'Escribinos',
		image: {
			desktop: { src: '/cierre-q8-desktop.webp', width: 1536, height: 1024 },
			mobile: { src: '/cierre-q8-mobile.webp', width: 1024, height: 1536 },
			alt: 'Audi Q8 gris oscuro, visto de frente, en un estudio oscuro con luz blanca fría.',
		},
	},
	nav: {
		label: 'Secciones',
		links: [
			{ href: '#reservas', label: 'Cómo reservar' },
			{ href: '#configurador', label: 'Armá tu lavado' },
			{ href: '#trabajos', label: 'Trabajos' },
			{ href: '#mantenimiento', label: 'Mantenimiento' },
			{ href: '#ubicacion', label: 'Ubicación' },
		],
	},
	location: {
		title: 'Ubicación',
		notice: 'Atendemos únicamente con turno previo.',
		lede: 'La dirección exacta te la enviamos por WhatsApp al confirmar la reserva.',
		mapTitle: 'Mapa de la zona de atención',
		zoneLabel: 'Zona de atención',
		zoneFact: 'Zona',
	},
	footer: {
		rights: 'Todos los derechos reservados',
		siteTitle: 'Este sitio',
		servicesTitle: 'Servicios',
		contactTitle: 'Escribinos',
	},
	booking: {
		title: 'Cómo se reserva',
		steps: ['Armás tu lavado.', 'Mandás el WhatsApp.', 'Te confirmamos tu turno.'],
	},
} as const

export const messages = {
	general: 'Hola! Vi la web y quiero pedir un turno.',
	turno: 'Hola Rama! Vi la web y quiero sacar un turno.',
	config: (names: string[], vehicle: string) =>
		`Hola Rama! Vi la web y quiero turno para: ${names.join(' + ')} (${vehicle}). ¿Qué días tenés?`,
	plan: (ask: string, vehicle: string) =>
		`Hola Rama! Vi la web y quiero ${ask} (${vehicle}). ¿Qué días tenés?`,
}

export const waLink = (text: string) =>
	`https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(text)}`
