// Trabajos: comparador antes/después, entrada escalonada del mosaico y visor de fotos.
const section = document.querySelector<HTMLElement>('[data-works]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (section) {
  initComparisons(section);
  initReveal(section);
  initViewer(section);
}

function initComparisons(root: HTMLElement) {
  const pairs = [...root.querySelectorAll<HTMLElement>('[data-ba-pair]')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-ba-dot]')];
  let current = 0;

  const setPos = (stage: HTMLElement, range: HTMLInputElement, value: number) => {
    const v = Math.min(100, Math.max(0, value));
    stage.style.setProperty('--pos', `${v}%`);
    range.value = String(Math.round(v));
    range.setAttribute('aria-valuetext', `Antes ${Math.round(v)}%, después ${100 - Math.round(v)}%`);
  };

  pairs.forEach((pair) => {
    const stage = pair.querySelector<HTMLElement>('[data-ba-stage]')!;
    const range = pair.querySelector<HTMLInputElement>('[data-ba-range]')!;
    let touched = false;

    range.addEventListener('input', () => {
      touched = true;
      setPos(stage, range, Number(range.value));
    });

    // Arrastre con mouse y dedo. touch-action: pan-y deja el scroll vertical al navegador.
    const fromPointer = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      setPos(stage, range, ((e.clientX - r.left) / r.width) * 100);
    };
    stage.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      touched = true;
      stage.setPointerCapture(e.pointerId);
      stage.dataset.dragging = '';
      fromPointer(e);
    });
    stage.addEventListener('pointermove', (e) => {
      if (stage.hasPointerCapture(e.pointerId)) fromPointer(e);
    });
    const end = (e: PointerEvent) => {
      if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
      delete stage.dataset.dragging;
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);

    // Una sola invitación a arrastrar: 50 → 65 → 50 en ~1 s al entrar en pantalla.
    if (reduceMotion.matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((en) => en.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1000;
        const tick = (now: number) => {
          if (touched) return;
          const p = Math.min(1, (now - start) / dur);
          const wave = Math.sin(p * Math.PI); // sube y vuelve
          setPos(stage, range, 50 + 15 * wave * wave);
          if (p < 1) requestAnimationFrame(tick);
        };
        setTimeout(() => requestAnimationFrame(tick), 250);
      },
      { threshold: 0.6 },
    );
    io.observe(stage);
  });

  const show = (next: number) => {
    current = (next + pairs.length) % pairs.length;
    pairs.forEach((p, i) => (p.hidden = i !== current));
    dots.forEach((d, i) => d.setAttribute('aria-current', String(i === current)));
  };
  dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
  root.querySelectorAll<HTMLButtonElement>('[data-ba-step]').forEach((b) =>
    b.addEventListener('click', () => show(current + Number(b.dataset.baStep))),
  );
}

function initReveal(root: HTMLElement) {
  const items = root.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
  root.classList.add('reveal-on');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        (en.target as HTMLElement).classList.add('is-in');
        io.unobserve(en.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  items.forEach((el) => io.observe(el));
}

function initViewer(root: HTMLElement) {
  const dialog = root.querySelector<HTMLDialogElement>('[data-viewer]');
  if (!dialog) return;
  const img = dialog.querySelector<HTMLImageElement>('[data-viewer-img]')!;
  const tag = dialog.querySelector<HTMLElement>('[data-viewer-tag]')!;
  const model = dialog.querySelector<HTMLElement>('[data-viewer-model]')!;
  const count = dialog.querySelector<HTMLElement>('[data-viewer-count]')!;
  const openers = [...root.querySelectorAll<HTMLButtonElement>('[data-viewer-open]')];
  let index = 0;
  let returnTo: HTMLElement | null = null;

  const render = () => {
    const btn = openers[index];
    const thumb = btn.querySelector('img')!;
    const fig = btn.closest('figure')!;
    img.src = thumb.currentSrc || thumb.src;
    img.alt = thumb.alt;
    tag.textContent = fig.querySelector('.w-tag')?.textContent ?? '';
    model.textContent = fig.querySelector('.w-model')?.textContent ?? '';
    count.textContent = `${index + 1} / ${openers.length}`;
  };
  const go = (step: number) => {
    index = (index + step + openers.length) % openers.length;
    render();
  };

  openers.forEach((btn, i) =>
    btn.addEventListener('click', () => {
      index = i;
      returnTo = btn;
      render();
      dialog.showModal(); // modal: el resto de la página queda inerte y el foco no sale del visor
    }),
  );
  dialog.addEventListener('close', () => returnTo?.focus());
  dialog.querySelector('[data-viewer-close]')?.addEventListener('click', () => dialog.close());
  dialog.querySelectorAll<HTMLButtonElement>('[data-viewer-step]').forEach((b) =>
    b.addEventListener('click', () => go(Number(b.dataset.viewerStep))),
  );
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
  // Clic afuera de la foto cierra.
  dialog.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t === dialog || t.matches('[data-viewer-frame], .viewer-figure')) dialog.close();
  });

  // Swipe horizontal.
  let x0: number | null = null;
  img.addEventListener('pointerdown', (e) => (x0 = e.clientX));
  img.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  });
}
