/**
 * QDM · Popup de campaña — trigger (delay + frecuencia de reaparición).
 * El modal en sí (apertura/cierre/scroll-lock) lo maneja dialog-component (dialog.js).
 */

const STORAGE_KEY_DISMISSED = 'qdm-campaign-popup:dismissed-until';
const STORAGE_KEY_SUBSCRIBED = 'qdm-campaign-popup:subscribed';

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    /* localStorage no disponible (ej. modo privado): el popup se comporta como si fuera la primera visita */
  }
}

function init() {
  const root = document.querySelector('[data-qdm-campaign-popup]');
  if (!root) return;

  const justSubscribed = root.querySelector('[data-qdm-just-subscribed]') !== null;

  if (justSubscribed) {
    writeStorage(STORAGE_KEY_SUBSCRIBED, 'true');
    root.showDialog();
    return;
  }

  const subscribed = readStorage(STORAGE_KEY_SUBSCRIBED) === 'true';
  const dismissedUntil = Number(readStorage(STORAGE_KEY_DISMISSED)) || 0;

  if (subscribed || Date.now() < dismissedUntil) return;

  const delay = Number(root.dataset.delay) || 0;
  const reappearDays = Number(root.dataset.reappearDays) || 7;

  window.setTimeout(() => {
    root.showDialog();
  }, delay);

  root.addEventListener(
    'dialog:close',
    () => {
      const until = Date.now() + reappearDays * 24 * 60 * 60 * 1000;
      writeStorage(STORAGE_KEY_DISMISSED, String(until));
    },
    { once: true }
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
