# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueños de autos medianos y premium (BMW, Audi, Mercedes, VW, Peugeot nuevos) en Mar del Plata que cuidan su auto y quieren mantenerlo impecable. Muchos son clientes recurrentes con lavados semanales o quincenales. Llegan al sitio desde Instagram, casi siempre desde el celular, y su objetivo es ver qué servicios hay, cuánto cuestan para su tipo de vehículo y pedir turno.

## Product Purpose

Sitio de un servicio de detailing y lavado de autos en Mar del Plata. Presenta los servicios con sus precios y lleva al visitante a sacar turno por WhatsApp. El éxito es que un visitante que llega desde Instagram entienda la oferta, encuentre el precio para su vehículo y abra WhatsApp para reservar.

No es una tienda: no vende ni instala accesorios, no tiene carrito, pagos online ni catálogo de productos. "Accesorios Vehiculares MdP" es solo el nombre del negocio; el sitio no debe sugerir venta de accesorios.

## Positioning

Un servicio de detailing local que trabaja sobre autos que sus dueños valoran, con mantenimiento recurrente y protección cerámica además del lavado. El sitio se apoya en trabajos reales del negocio, no en promesas genéricas. El sitio habla con la voz del negocio (plural) y no nombra al dueño: se considera poco profesional.

## Operating Context

- Descubrimiento por Instagram (@accesoriosvehicularesmdp); el sitio es el paso entre el perfil y el chat.
- Uso mayoritario en celular, muchas veces abriendo el link desde la bio o una historia.
- Los turnos se cierran por WhatsApp; no hay reserva ni pago dentro del sitio.
- Atención solo con turno previo, siempre (en el sitio se dice «turno», nunca «cita»): no hay local abierto al público (el lugar es la casa del dueño) y no se atiende sin turno. El sitio no debe invitar a ir sin avisar.
- Ubicación: Barrio Constitución, Mar del Plata. El sitio lleva un mapa de Google Maps a todo el ancho, con `TODO` hasta cargar la dirección exacta en `src/data/business.ts`.

## Capabilities and Constraints

Servicios y modelo de precios (centralizados en `src/data/services.ts`; precios en ARS, auto / camioneta):

- **Lavado tradicional:** la base de todo y siempre incluido. $30.000 / $36.000.
- **Extras que se suman al lavado** (la camioneta paga el precio de auto × 1,2). Los valores de los extras están marcados `TODO` hasta confirmarlos con Ramiro:
  - Lavado de motor: +$10.000 / +$12.000.
  - Plásticos: +$5.000 / +$6.000. `TODO`: confirmar si son interiores, exteriores o ambos.
  - Sellador cerámico: +$30.000 / +$36.000. Se llama solo "sellador cerámico"; no se usa la palabra "booster".
- **Mantenimiento:** se ofrece aparte de los extras y se cobra por lavado.
  - Semanal: $24.000 / $29.000.
  - Quincenal: $26.000 / $31.000.

Los precios base y de mantenimiento son los que se publican; no llevan aclaración de "precios de referencia".

Datos del negocio centralizados en `src/data/business.ts`:

- Instagram: @accesoriosvehicularesmdp (confirmado).
- WhatsApp: +54 9 223 538-5974 (confirmado; `5492235385974` para links wa.me).
- Ubicación: "Barrio Constitución, Mar del Plata".
- Horarios: no se publican.

Idioma del sitio: español de Argentina, con voseo. En los mensajes de WhatsApp al dueño se lo trata de "Rama".

Copys editables: los textos principales del sitio (titular, subtítulo, llamados a la acción) viven en `src/data/business.ts`.

## Brand Commitments

- Nombre: Accesorios Vehiculares MdP.
- Logo actual: `public/logo-actual.jpg`, la foto de perfil de Instagram (320×320, fondo negro, silueta de auto deportivo en línea blanca y "ACCESORIOS VEHICULARES MDP" en letra itálica de estilo racing). Es provisorio y el dueño lo va a mejorar; el sitio debe poder cambiarlo sin rediseñar.

## Evidence on Hand

- `src/assets/hero/hero-bmw-m240i-desktop.webp`, `src/assets/hero/hero-bmw-m240i-mobile.webp` (y originales `.png` en `src/assets/originales/`): auto real lavado por Ramiro (foto de su Instagram), retocada con IA solo para el hero (fondo de estudio oscuro, gotas de agua y luz trasera encendida). No sirve como antes/después ni como prueba del resultado del lavado.
- Hay más fotos reales de trabajos (del Instagram del negocio) que se van a sumar después. Hasta entonces, la galería y el antes/después usan placeholders claramente marcados con `TODO`.
- Reseñas y testimonios: no hay. No inventar ninguno, ni cantidad de clientes, años de experiencia, calificaciones o garantías. Tampoco superlativos que no se puedan verificar ("el mejor", "número uno").

## Product Principles

1. Del Instagram al WhatsApp sin fricción: cada pantalla acerca al visitante a pedir turno desde el celular.
2. El precio a la vista: el visitante encuentra el valor para su tipo de vehículo sin tener que preguntar.
3. Solo prueba real: se muestran trabajos, datos y precios verdaderos; todo lo provisorio se marca `TODO` y vive en un único lugar fácil de reemplazar.
4. Servicio, no tienda: nada en el sitio sugiere venta de productos o accesorios.
5. Pensado para el cliente que vuelve: los planes de mantenimiento se presentan como una relación continua, no como una venta única.
