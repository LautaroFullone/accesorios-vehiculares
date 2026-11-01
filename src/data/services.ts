// Precios y servicios. ARS. La camioneta paga el precio de auto x 1,2.

export type Vehicle = 'auto' | 'camioneta';
export type Prices = Record<Vehicle, number>;

export const vehicles: { id: Vehicle; label: string }[] = [
  { id: 'auto', label: 'Auto' },
  { id: 'camioneta', label: 'Camioneta' },
];

export interface Item {
  id: string;
  name: string;
  short: string; // nombre corto para el mensaje de WhatsApp
  description: string;
  price: Prices;
}

// Siempre incluido, base de todos los turnos.
export const base: Item = {
  id: 'lavado',
  name: 'Lavado tradicional',
  short: 'Lavado tradicional',
  description: 'Base de todos los turnos.',
  price: { auto: 30000, camioneta: 36000 },
};

// Se suman al lavado. TODO: confirmar precios y alcance con el negocio.
export const extras: Item[] = [
  {
    id: 'motor',
    name: 'Lavado de motor',
    short: 'Motor',
    description: 'Lavado y acondicionado del motor.',
    price: { auto: 10000, camioneta: 12000 },
  },
  {
    id: 'plasticos',
    name: 'Plásticos',
    short: 'Plásticos',
    // TODO: confirmar si son interiores, exteriores o ambos.
    description: 'Limpieza y acondicionado de plásticos.',
    price: { auto: 5000, camioneta: 6000 },
  },
  {
    id: 'sellador',
    name: 'Sellador cerámico',
    short: 'Sellador cerámico',
    description: 'Aplicación de sellador cerámico.',
    price: { auto: 30000, camioneta: 36000 },
  },
];

// Mantenimiento, aparte del configurador. Precio por lavado.
export interface Plan {
  id: string;
  name: string;
  description: string;
  ask: string; // frase para el mensaje de WhatsApp
  price: Prices;
}

export const maintenance: Plan[] = [
  {
    id: 'semanal',
    name: 'Mantenimiento semanal',
    description: 'Un lavado por semana.',
    ask: 'arrancar el mantenimiento semanal',
    price: { auto: 24000, camioneta: 29000 },
  },
  {
    id: 'quincenal',
    name: 'Mantenimiento quincenal',
    description: 'Un lavado cada dos semanas.',
    ask: 'arrancar el mantenimiento quincenal',
    price: { auto: 26000, camioneta: 31000 },
  },
];

export const formatARS = (n: number) =>
  '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
