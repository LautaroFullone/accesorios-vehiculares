// Selector temporal de versiones del cierre. Cambia data-variant en cada sección.
const targets: Record<string, string> = { cierre: '#cierre' };

document.querySelectorAll<HTMLElement>('[data-variant-group]').forEach((group) => {
  const section = document.querySelector<HTMLElement>(targets[group.dataset.variantGroup ?? '']);
  if (!section) return;
  group.querySelectorAll<HTMLButtonElement>('[data-variant-value]').forEach((btn) => {
    btn.addEventListener('click', () => {
      section.dataset.variant = btn.dataset.variantValue;
      group.querySelectorAll('[data-variant-value]').forEach((b) =>
        b.setAttribute('aria-checked', String(b === btn)),
      );
    });
  });
});
