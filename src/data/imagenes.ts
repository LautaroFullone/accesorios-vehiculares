import { getImage } from 'astro:assets';
import heroDesktopSrc from '../assets/hero/hero-bmw-m240i-desktop.webp';
import heroMobileSrc from '../assets/hero/hero-bmw-m240i-mobile.webp';
import cierreDesktopSrc from '../assets/cierre/cierre-audi-q8-desktop.webp';
import cierreMobileSrc from '../assets/cierre/cierre-audi-q8-mobile.webp';

// Imágenes de portada y cierre: Astro genera varios anchos en WebP al compilar.
// Para cambiar una foto, reemplazá el archivo en src/assets/hero/ o src/assets/cierre/ y su import acá.
const make = (src: ImageMetadata, widths: number[]) =>
	getImage({ src, widths, format: 'webp', quality: 80 });

export const hero = {
	desktop: await make(heroDesktopSrc, [1280, 1920, 2560]),
	mobile: await make(heroMobileSrc, [640, 900, 1200]),
	desktopSizes: '(min-width: 800px) 74vw',
	mobileSizes: '100vw',
};

export const cierre = {
	desktop: await make(cierreDesktopSrc, [768, 1152, 1536]),
	mobile: await make(cierreMobileSrc, [480, 768, 1024]),
};
