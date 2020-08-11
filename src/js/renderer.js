import Highway from '@dogstudio/highway';
import {
  createTransitionElements,
  setCustomScrollbar,
  clearPageModifiers } from './utils';

class Renderer extends Highway.Renderer {
  // Hooks/methods
  onEnter() {
    // clear all page modifiers from previous transition
    clearPageModifiers();

    // set document title
    const slug = this.properties.slug;
    if (document.querySelector(`[data-slug=${slug}]`)) {
      document.querySelector(`[data-slug=${slug}]`).classList.add('active');
    }
    document.title = `${slug} - kwekwek template`;

    // add transition overlay element when page loads
    createTransitionElements();
  }
  onEnterCompleted() {
    const container = this.wrap.querySelector('.contentWrapper');

    // set the custom scrollbar on initial page load
    setCustomScrollbar(container);
  }
  onLeave() {
    // clear all page modifiers from previous transition
    clearPageModifiers();

    // clear the active nav links
    [...document.querySelectorAll('.navLink')].forEach(nl => {
      nl.classList.remove('active');
    });

    // prevent element animation from triggering again when exiting
    [...document.querySelectorAll('*[class*=animate]')].forEach(el => {
      [...el.classList].forEach(cl => {
        if (cl.indexOf('animate') > -1) {
          el.classList.remove(cl);
        }
      });
    });
  }
  // onLeaveCompleted() {}
}

export default Renderer;