const nav = document.querySelector<HTMLElement>('[data-nav]');
const list = nav?.querySelector<HTMLElement>('ul');
const links = [...(nav?.querySelectorAll<HTMLAnchorElement>('ul a') ?? [])];
const targets = links.map((a) => document.querySelector<HTMLElement>(a.hash));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let current: HTMLAnchorElement | null = null;
let queued = false;

function setCurrent(next: HTMLAnchorElement | null) {
  if (next === current) return;
  current?.removeAttribute('aria-current');
  next?.setAttribute('aria-current', 'true');
  current = next;
  // En celular la lista se desplaza: mantener visible el enlace activo.
  if (next && list && list.scrollWidth > list.clientWidth) {
    const left = next.offsetLeft - (list.clientWidth - next.offsetWidth) / 2;
    list.scrollTo({ left, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }
}

function update() {
  queued = false;
  if (!nav) return;
  const scrolled = window.scrollY > 8;
  nav.toggleAttribute('data-scrolled', scrolled);
  nav.classList.toggle('con-grano', scrolled);

  const line = window.innerHeight * 0.4;
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  let active: HTMLAnchorElement | null = null;
  targets.forEach((t, i) => {
    if (t && t.getBoundingClientRect().top <= line) active = links[i];
  });
  setCurrent(atBottom ? links[links.length - 1] : active);
}

const schedule = () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(update);
};
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule);
update();
