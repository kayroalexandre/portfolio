export interface UIEventPayloadMap {
  'lightbox:open': {
    src: string;
    alt: string;
  };
  'lightbox:close': {
    src: string;
    alt: string;
  };
  'image:scroll-zoom': {
    src: string;
    scale: number;
  };
}

type EventName = keyof UIEventPayloadMap;
type EventListener<T extends EventName> = (payload: UIEventPayloadMap[T]) => void;

class UIEventBus {
  private listeners: {
    [key in EventName]: Set<EventListener<key>>;
  } = {
    'lightbox:open': new Set(),
    'lightbox:close': new Set(),
    'image:scroll-zoom': new Set(),
  };

  on<T extends EventName>(eventName: T, listener: EventListener<T>): () => void {
    const listeners = this.listeners[eventName] as Set<EventListener<T>>;
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  emit<T extends EventName>(eventName: T, payload: UIEventPayloadMap[T]): void {
    const listeners = this.listeners[eventName] as Set<EventListener<T>>;

    for (const listener of listeners) {
      listener(payload);
    }
  }
}

export const uiEventBus = new UIEventBus();
