import Highway from '@dogstudio/highway';
import PerfectScrollbar from 'perfect-scrollbar';
import inView from 'in-view';

class Renderer extends Highway.Renderer {
  // Hooks/methods
  onEnter() {
    const container = this.wrap.querySelector('.contentWrapper');
    const ps = new PerfectScrollbar(container, {
      handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 100,
      suppressScrollX : true
    });
    const slug = this.properties.slug
    document.querySelector(`[data-slug=${slug}]`).classList.add('active');
    document.title = `${slug} - kwekwek template`;
  }
  onEnterCompleted() {
    const container = this.wrap.querySelector('.contentWrapper');
    const mainNav = document.querySelector('.mainNav')
    const logoWhite = document.querySelector('.branding img.light');
    const logoDark = document.querySelector('.branding img.dark');
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
          
    inView('.animated')
      .on('enter', (e) => {
        e.classList.remove('animated');
        if (e.dataset.animation) {
          const animclass = `animate__${e.dataset.animation}`;
          e.classList.add(animclass);
        }
        if (e.dataset.animationDelay) {
          const animclassdelay = `animate__delay-${e.dataset.animationDelay}ms`;
          e.classList.add(animclassdelay);
        }
        if (e.dataset.animationDuration) {
          const animeclassduration = `animate__duration-${e.dataset.animationDuration}ms`;
          e.classList.add(animeclassduration);
        }
      })

    container.addEventListener('ps-scroll-y', (e) => {
      if (e.target.scrollHeight > (vh * 1.5)) {
        const perc = Math.round(e.target.scrollTop / (vh / 2) * 100)
        if (perc <= 100) {
          const navHeight = `${8 - (2 * perc / 100)}vh`;
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

export default Renderer;