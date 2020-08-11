import Highway from '@dogstudio/highway';
import PerfectScrollbar from 'perfect-scrollbar';
import inView from 'in-view';

class Renderer extends Highway.Renderer {
  // Hooks/methods
  onEnter() {
    // set the custom scrollbar when page loads
    const container = this.wrap.querySelector('.contentWrapper');
    const ps = new PerfectScrollbar(container, {
      handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 100,
      suppressScrollX : true
    });
    // set document title
    const slug = this.properties.slug
    document.querySelector(`[data-slug=${slug}]`).classList.add('active');
    document.title = `${slug} - kwekwek template`;
    // add transition overlay element when page loads

    if (!document.querySelector('.transitionOverlay')) {
      const trEl = document.createElement('div');
      const trElSpin = document.createElement('div');
      const trElCover = document.createElement('div');
      trEl.classList.add('transitionOverlay');
      trElSpin.classList.add('transitionOverlay__spin');
      trElCover.classList.add('transitionOverlay__cover');
      trEl.appendChild(trElSpin);
      trEl.appendChild(trElCover);
      document.querySelector('.content').appendChild(trEl);
    }
  }
  onEnterCompleted() {
    const container = this.wrap.querySelector('.contentWrapper');
    const mainNav = document.querySelector('.mainNav')
    const logoWhite = document.querySelector('.branding img.light');
    const logoDark = document.querySelector('.branding img.dark');
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    
    // trigger animation when inview
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

    // main nav transition when scrolling
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
    // clear the active nav links
    [...document.querySelectorAll('.navLink')].forEach(o => {
      o.classList.remove('active');
    });
    // clear all modifiers from previous transition
    document.body.classList.remove('page-scrolled', 'menu-open');
    const mainNav = document.querySelector('.mainNav');
    const logoWhite = document.querySelector('.branding img.light');
    const logoDark = document.querySelector('.branding img.dark');
    mainNav.style.cssText = `max-height: 8vh; background-color: rgba(255, 255, 255, 0)`;
    logoWhite.style.cssText = `opacity: 1;`;
    logoDark.style.cssText = `opacity: 0;`;
  }
  // onLeaveCompleted() {}
}

export default Renderer;