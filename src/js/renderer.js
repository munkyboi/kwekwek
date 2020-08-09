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
    const ps = new PerfectScrollbar(container, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
    const slug = this.properties.slug
    document.querySelector(`[data-slug=${slug}]`).classList.add('active');
  }
  onEnterCompleted() {
    triggerPageAnimation();

    const container = this.wrap.querySelector('.contentWrapper');
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    container.addEventListener('ps-scroll-y', (e) => {
      if (e.target.scrollTop >= (vh / 2)) {
        document.body.classList.add('page-scrolled');
      } else {
        document.body.classList.remove('page-scrolled');
      }
    })
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