let enabled = true;

export function areTransitionsEnabled() {
  return enabled;
}

export function disableTransitions() {
  enabled = false;
}

export function enableTransitions() {
  enabled = true;
}
