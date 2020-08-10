import Highway from '@dogstudio/highway';
import Fade from './transition';
import Renderer from './renderer';
import PerfectScrollbar from 'perfect-scrollbar';

const H = new Highway.Core({
  renderers: {
    home: Renderer,
    about: Renderer,
    portfolio: Renderer,
    contact: Renderer,
  },
  transitions: {
    default: Fade
  }
});

(() => {
  const container = document.querySelector('.navList');
  const ps = new PerfectScrollbar(container, {
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20,
    suppressScrollX : true
  });
  const burgerBtn = document.querySelector('.burger');
  burgerBtn.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    if (document.body.classList.contains('menu-open')) {
      document.body.classList.remove('menu-open');
    } else {
      document.body.classList.add('menu-open');
    }
  });
})();