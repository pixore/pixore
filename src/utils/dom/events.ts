type NameSpace = EventListener[];

interface NameSpaces {
  [key: string]: NameSpace;
}

interface Event {
  handlers: EventListener[];
  nameSpaces: NameSpaces;
}

interface Events {
  [key: string]: Event;
}

const events = new WeakMap<HTMLElement | Window, Events>();

const getHandlersByType = (
  element: HTMLElement | Window,
  eventType: string,
): Event => {
  if (!events.has(element)) {
    return undefined;
  }

  const eventsByElement = events.get(element);

  return eventsByElement[eventType];
};

const getHandlersByNameSpace = (
  element: HTMLElement | Window,
  eventType: string,
  nameSpace: string,
): NameSpace => {
  const handlersByType = getHandlersByType(element, eventType);

  if (!handlersByType) {
    return undefined;
  }

  return handlersByType.nameSpaces[nameSpace];
};

const offNameSpace = (
  element: HTMLElement | Window,
  eventType: string,
  nameSpace?: string,
) => {
  const handlersByType = getHandlersByType(element, eventType);

  if (!handlersByType) {
    return;
  }

  handlersByType.nameSpaces[nameSpace].forEach((handler) =>
    element.removeEventListener(eventType, handler),
  );
  handlersByType.nameSpaces[nameSpace] = [];
};

const offAllHandlers = (element: HTMLElement | Window, eventType: string) => {
  const handlersByType = getHandlersByType(element, eventType);
  if (!handlersByType) {
    return;
  }

  Object.keys(handlersByType.nameSpaces).forEach((nameSpace) =>
    offNameSpace(element, eventType, nameSpace),
  );
  handlersByType.handlers.forEach((handler) =>
    element.removeEventListener(eventType, handler),
  );
  handlersByType.handlers = [];
};

const offHandlerInNameSpace = (
  element: HTMLElement | Window,
  eventType: string,
  handler?: EventListener,
  nameSpace?: string,
) => {
  const handlersByNameSpace = getHandlersByNameSpace(
    element,
    eventType,
    nameSpace,
  );
  if (!handlersByNameSpace) {
    return;
  }

  const handlerIndex = handlersByNameSpace.indexOf(handler);

  if (handlerIndex !== -1) {
    const handler = handlersByNameSpace[handlerIndex];
    handlersByNameSpace.splice(handlerIndex, 1);
    element.removeEventListener(eventType, handler);
  }
};

const offHandler = (
  element: HTMLElement | Window,
  eventType: string,
  handler?: EventListener,
) => {
  const handlersByType = getHandlersByType(element, eventType);

  if (!handlersByType) {
    return;
  }

  const handlerIndex = handlersByType.handlers.indexOf(handler);

  if (handlerIndex !== -1) {
    const handler = handlersByType.handlers[handlerIndex];
    handlersByType.handlers.splice(handlerIndex, 1);

    element.removeEventListener(eventType, handler);
  }
};

type OffOptions =
  | EventListener
  | {
      handler?: EventListener;
      nameSpace?: string;
    };

type Off = (eventType: string, options?: OffOptions) => ManageEvents;
type On = (
  eventType: string,
  handler: EventListener,
  nameSpace?: string,
) => ManageEvents;

type OffOn = (
  eventType: string,
  handler: EventListener,
  nameSpace?: string,
) => ManageEvents;

interface ManageEvents {
  on: On;
  off: Off;
  offOn: OffOn;
}

const extraOffOptions = (offOptions: OffOptions) => {
  if (typeof offOptions === 'function') {
    return {
      handler: offOptions,
    };
  }

  return offOptions;
};

const offFactory = (
  element: HTMLElement | Window,
  manageEvents: ManageEvents,
): Off => (eventType: string, offOptions: OffOptions = {}) => {
  const { handler, nameSpace } = extraOffOptions(offOptions);

  if (!handler && !nameSpace) {
    offAllHandlers(element, eventType);
  }

  if (handler && nameSpace) {
    offHandlerInNameSpace(element, eventType, handler, nameSpace);
  }

  if (nameSpace) {
    offNameSpace(element, eventType, nameSpace);
  }

  if (handler) {
    offHandler(element, eventType, handler);
  }

  return manageEvents;
};

const onFactory = (
  element: HTMLElement | Window,
  manageEvents: ManageEvents,
): On => (eventType: string, handler: EventListener, nameSpace?: string) => {
  const eventsByElement = events.get(element) || {};
  if (!eventsByElement[eventType]) {
    eventsByElement[eventType] = {
      handlers: [],
      nameSpaces: {},
    };
  }
  const eventsByType = eventsByElement[eventType];
  if (nameSpace) {
    if (!eventsByType.nameSpaces[nameSpace]) {
      eventsByType.nameSpaces[nameSpace] = [];
    }
    eventsByType.nameSpaces[nameSpace].push(handler);
  } else {
    eventsByType.handlers.push(handler);
  }

  events.set(element, eventsByElement);

  element.addEventListener(eventType, handler);

  return manageEvents;
};

const offOnFactory = (on: On, off: Off, manageEvents: ManageEvents): OffOn => (
  eventType: string,
  handler: EventListener,
  nameSpace?: string,
) => {
  off(eventType, { nameSpace });
  on(eventType, handler, nameSpace);

  return manageEvents;
};

const manageEvents = (element: HTMLElement | Window): ManageEvents => {
  const manageEvents: {
    offOn?: OffOn;
    on?: On;
    off?: Off;
  } = {};
  const on = onFactory(element, manageEvents as ManageEvents);
  const off = offFactory(element, manageEvents as ManageEvents);
  const offOn = offOnFactory(on, off, manageEvents as ManageEvents);

  manageEvents.offOn = offOn;
  manageEvents.on = on;
  manageEvents.off = off;
  return manageEvents as ManageEvents;
};

export { manageEvents };
