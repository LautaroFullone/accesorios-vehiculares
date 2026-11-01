import { messages, waLink } from '../data/business';
import { base, extras, maintenance, formatARS, vehicles, type Vehicle } from '../data/services';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const STAGGER = 55;

let vehicle: Vehicle = 'auto';
const active = new Set<string>();

// --- Precios con flip split-flap. El texto real vive en .sr-only; los flaps son solo visuales.

function renderPrice(el: HTMLElement, text: string, animate: boolean) {
  const prev = el.dataset.text;
  el.dataset.text = text;
  if (prev === text) return;

  const sr = `<span class="sr-only">${text}</span>`;
  const chars = [...text];
  const old = prev ? [...prev] : [];
  const offset = chars.length - old.length;
  const doFlip = animate && !reduceMotion.matches && prev !== undefined;

  let k = 0;
  const cells = chars.map((c, i) => {
    if (!/\d/.test(c)) return `<span class="sep">${c}</span>`;
    const before = old[i - offset];
    if (doFlip && before !== undefined && before !== c && /\d/.test(before)) {
      const delay = k++ * STAGGER;
      return `<span class="cell flipping" style="--d:${delay}ms"><span class="face old">${before}</span><span class="face new">${c}</span></span>`;
    }
    return `<span class="cell"><span class="face">${c}</span></span>`;
  });
  el.innerHTML = `${sr}<span class="flaps" aria-hidden="true">${cells.join('')}</span>`;

  if (k > 0) {
    window.setTimeout(() => {
      if (el.dataset.text !== text) return;
      el.querySelectorAll('.cell.flipping').forEach((cell) => {
        const face = cell.querySelector('.face.new');
        cell.className = 'cell';
        cell.innerHTML = `<span class="face">${face?.textContent ?? ''}</span>`;
      });
    }, k * STAGGER + 520);
  }
}

// --- Datos derivados

const selectedExtras = () => extras.filter((e) => active.has(e.id));
const total = () =>
  base.price[vehicle] + selectedExtras().reduce((sum, e) => sum + e.price[vehicle], 0);
const vehicleLabel = () => vehicles.find((v) => v.id === vehicle)!.label;

// --- Render

const $$ = <T extends HTMLElement>(sel: string) => [...document.querySelectorAll<T>(sel)];

function update(animate: boolean, changedExtra?: string) {
  // Precios por vehículo (renglones del configurador, planes). Solo hacen flip si cambia el vehículo.
  $$('[data-price]').forEach((el) => {
    const prefix = el.dataset.prefix ?? '';
    const value = Number(el.dataset[vehicle === 'auto' ? 'auto' : 'camioneta']);
    const isVehicleChange = animate && changedExtra === undefined;
    renderPrice(el, prefix + formatARS(value), isVehicleChange);
  });

  const t = total();
  $$('[data-total]').forEach((el) => renderPrice(el, formatARS(t), animate));

  const list = document.querySelector<HTMLElement>('[data-summary-list]');
  if (list) {
    const lines = [base, ...selectedExtras()];
    list.innerHTML = lines
      .map(
        (it, i) =>
          `<li><span>${it.name}</span><span class="tnum">${i === 0 ? '' : '+'}${formatARS(it.price[vehicle])}</span></li>`,
      )
      .join('');
  }
  const vehicleOut = document.querySelector<HTMLElement>('[data-summary-vehicle]');
  if (vehicleOut) vehicleOut.textContent = vehicleLabel();

  const names = [base.short, ...selectedExtras().map((e) => e.short)];
  const configHref = waLink(messages.config(names, vehicle));
  $$<HTMLAnchorElement>('[data-wa="config"]').forEach((a) => (a.href = configHref));
  maintenance.forEach((p) => {
    $$<HTMLAnchorElement>(`[data-wa="plan:${p.id}"]`).forEach(
      (a) => (a.href = waLink(messages.plan(p.ask, vehicle))),
    );
  });

  $$('[data-vehicle]').forEach((btn) => {
    btn.setAttribute('aria-checked', String(btn.dataset.vehicle === vehicle));
    // Un solo vehículo en el orden de tabulación de cada radiogroup.
    btn.tabIndex = btn.dataset.vehicle === vehicle ? 0 : -1;
  });
  $$('[data-extra]').forEach((btn) => {
    btn.setAttribute('aria-checked', String(active.has(btn.dataset.extra!)));
  });
}

// --- Eventos

$$('[data-vehicle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = btn.dataset.vehicle as Vehicle;
    if (next === vehicle) return;
    vehicle = next;
    update(true);
  });
});

// Flechas entre las dos opciones del selector. Hay un selector sobre el configurador y otro sobre mantenimiento,
// y los dos se mantienen sincronizados.
$$('[data-vehicle-group]').forEach((group) => {
  group.addEventListener('keydown', (e) => {
    const ev = e as KeyboardEvent;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault();
    const idx = vehicles.findIndex((v) => v.id === vehicle);
    const next = vehicles[(idx + 1) % vehicles.length].id;
    vehicle = next;
    update(true);
    group.querySelector<HTMLElement>(`[data-vehicle="${next}"]`)?.focus();
  });
});

$$('[data-extra]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.extra!;
    if (active.has(id)) active.delete(id);
    else active.add(id);
    update(true, id);
  });
});

// Barra inferior en celular: visible mientras el configurador está en pantalla y el resumen no.
const bar = document.querySelector<HTMLElement>('[data-bar]');
const configurator = document.querySelector<HTMLElement>('.cfg-grid');
const summary = document.querySelector<HTMLElement>('[data-summary]');
if (bar && configurator && summary) {
  let inConfig = false;
  let inSummary = false;
  const sync = () => bar.toggleAttribute('data-visible', inConfig && !inSummary);
  new IntersectionObserver((es) => {
    inConfig = es[0].isIntersecting;
    sync();
  }).observe(configurator);
  new IntersectionObserver((es) => {
    inSummary = es[0].isIntersecting;
    sync();
  }, { threshold: 0.15 }).observe(summary);
}

update(false);
document.documentElement.dataset.ready = '';
