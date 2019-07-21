const enum Key {
  Spacebar = ' ',
}

type KeyStates = { [key in Key]?: boolean };

const keyStates: KeyStates = {};

if (typeof window !== 'undefined') {
  document.addEventListener('keydown', (event) => {
    keyStates[event.key] = true;
  });

  document.addEventListener('keyup', (event) => {
    keyStates[event.key] = false;
  });
}

const getModifierState = (key: Key): boolean => Boolean(keyStates[key]);

export { getModifierState, Key };
