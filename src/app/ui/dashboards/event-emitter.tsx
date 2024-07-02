import EventEmitter from 'events';

const navbarEventEmitter = new EventEmitter();

export const events = {
  toggleNavbar: 'TOGGLE_SMALL_NAVBAR',
  toggleMobileNavbar: 'TOGGLE_MOBILE_NAVBAR',
};

export const emitEvent = {
  toggleNavbar: () => {
    navbarEventEmitter.emit(events.toggleNavbar);
  },
  toggleMobileNavbar: () => {
    navbarEventEmitter.emit(events.toggleMobileNavbar);
  },
};

export const onEvent = {
  toggleNavbar: (sideEffect: () => void) => {
    navbarEventEmitter.on(events.toggleNavbar, sideEffect);
  },
  toggleMobileNavbar: (sideEffect: () => void) => {
    navbarEventEmitter.on(events.toggleMobileNavbar, sideEffect);
  },
};

export const offEvent = {
  toggleNavbar: (sideEffect: () => void) => {
    navbarEventEmitter.off(events.toggleNavbar, sideEffect);
  },
  toggleMobileNavbar: (sideEffect: () => void) => {
    navbarEventEmitter.off(events.toggleMobileNavbar, sideEffect);
  },
};
