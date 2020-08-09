import Highway from '@dogstudio/highway';
import PerfectScrollbar from 'perfect-scrollbar';

const triggerPageAnimation = () => {
  document.querySelectorAll('.animated').forEach(d => {
    let willAnimate = true;
    d.classList.forEach(c => {
      if (c.indexOf('animate__delay') > -1) {
        willAnimate = false;
      }
    });
    if (willAnimate) {
      d.classList.add('animate__animated');
    }
    d.classList.remove('animated');
  });
}

class Renderer extends Highway.Renderer {
  // Hooks/methods
  onEnter() {
    const container = this.wrap.querySelector('.contentWrapper');
    const ps = new PerfectScrollbar(container);
    const slug = this.properties.slug
    document.querySelector(`[data-slug=${slug}]`).classList.add('active');
  }
  onEnterCompleted() {
    triggerPageAnimation();
  }
  onLeave() {
    document.querySelectorAll('.navLink').forEach(o => {
      o.classList.remove('active');
    })
  }
  // onLeaveCompleted() {}
}

// Don`t forget to export your renderer
export default Renderer;