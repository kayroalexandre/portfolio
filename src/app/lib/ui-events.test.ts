import { describe, expect, it, vi } from 'vitest';

import { uiEventBus } from './ui-events';

describe('uiEventBus', () => {
  it('notifies listeners for emitted events', () => {
    const onLightboxOpen = vi.fn();
    const unsubscribe = uiEventBus.on('lightbox:open', onLightboxOpen);

    uiEventBus.emit('lightbox:open', {
      src: '/images/case-cover.png',
      alt: 'Case cover',
    });

    expect(onLightboxOpen).toHaveBeenCalledTimes(1);
    expect(onLightboxOpen).toHaveBeenCalledWith({
      src: '/images/case-cover.png',
      alt: 'Case cover',
    });

    unsubscribe();
  });

  it('stops notifying after unsubscribe', () => {
    const onZoom = vi.fn();
    const unsubscribe = uiEventBus.on('image:scroll-zoom', onZoom);

    uiEventBus.emit('image:scroll-zoom', {
      src: '/images/hero.png',
      scale: 1.2,
    });
    unsubscribe();
    uiEventBus.emit('image:scroll-zoom', {
      src: '/images/hero.png',
      scale: 1.05,
    });

    expect(onZoom).toHaveBeenCalledTimes(1);
    expect(onZoom).toHaveBeenLastCalledWith({
      src: '/images/hero.png',
      scale: 1.2,
    });
  });
});
