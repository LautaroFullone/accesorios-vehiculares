import type { ImageMetadata } from 'astro';

// Las fotos de Trabajos viven en src/assets/trabajos/ para que Astro genere versiones livianas
// (varios anchos en WebP) al compilar. En los datos se nombran solo por archivo.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/trabajos/*.{webp,jpg,jpeg,png}', {
	eager: true,
});

export const foto = (file: string): ImageMetadata => {
	const found = files[`../assets/trabajos/${file}`];
	if (!found) throw new Error(`Falta la foto src/assets/trabajos/${file}`);
	return found.default;
};
