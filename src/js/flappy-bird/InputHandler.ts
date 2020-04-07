let bindings: any = {};

export function addBinding(key: string, listener: () => void) {
  if (!bindings[key]) bindings[key] = [];
  bindings[key].push(listener);
}

export function register() {
  document.addEventListener('keydown', onKeydown);
}

export function deregister() {
  document.removeEventListener('keydown', onKeydown);
}

function onKeydown(ev: KeyboardEvent) {
  let listeners = bindings[ev.code];
  if (listeners) listeners.forEach((l: Function) => l());
}
