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
    document.title = `${slug} - kwekwek template`;
  }
  onEnterCompleted() {
    triggerPageAnimation();

    const container = this.wrap.querySelector('.contentWrapper');
    const mainNav = document.querySelector('.mainNav')
    const logoWhite = document.querySelector('.branding img.light');
    const logoDark = document.querySelector('.branding img.dark');
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    container.addEventListener('ps-scroll-y', (e) => {
      if (e.target.scrollHeight > (vh * 2)) {
        const perc = Math.round(e.target.scrollTop / (vh / 2) * 100)
        if (perc <= 100) {
          const navHeight = `${8 - (2 * perc / 100)}vh`;
          console.log(navHeight)
          mainNav.style.cssText = `max-height: ${navHeight}; background-color: rgba(255, 255, 255, ${perc / 100})`;
          logoWhite.style.cssText =`opacity: ${1 - perc/100};`
          logoDark.style.cssText =`opacity: ${perc/100};`
          document.body.classList.remove('page-scrolled');
        } else {
          document.body.classList.add('page-scrolled');
        }
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