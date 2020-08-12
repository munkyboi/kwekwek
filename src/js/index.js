import Highway from '@dogstudio/highway';
import Quicklink, { listen, prefetch} from 'quicklink/dist/quicklink.mjs';
import 'intersection-observer';
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

H.on('NAVIGATE_IN', ({ to }) => {
  // prefetch images
  let imgArr = [];
  [...to.view.querySelectorAll('*')].forEach(el => {
    const styles = window.getComputedStyle(el);
    if (styles.getPropertyValue('background-image') !== 'none') {
      const img = styles.getPropertyValue('background-image').split('"')[1];
      imgArr.push(img);
    }
    if (el.nodeName === 'IMG') {
      const img = el.src;
      imgArr.push(img);
    }
  });
  prefetch(imgArr, true);
});

(() => {
  // prefetch all links
  listen({
    el: document.body,
    priority: true
  });

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