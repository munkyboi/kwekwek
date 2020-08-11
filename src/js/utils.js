import PerfectScrollbar from 'perfect-scrollbar';
import inView from 'in-view';

export const createTransitionElements = (to) => {
  const parentEl = (typeof to !== 'undefined') ? to : document.querySelector('.content');
  if (!parentEl.querySelector('.transitionOverlay')) {
    const trEl = document.createElement('div');
    const trElSpin = document.createElement('div');
    const trElCover = document.createElement('div');
    trEl.classList.add('transitionOverlay');
    trElSpin.classList.add('transitionOverlay__spin');
    trElCover.classList.add('transitionOverlay__cover');
    trEl.appendChild(trElSpin);
    trEl.appendChild(trElCover);
    parentEl.appendChild(trEl);
  }
};

export const setCustomScrollbar = (el) => {
  const ps = new PerfectScrollbar(el, {
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 100,
    suppressScrollX : true
  });

  // main nav transition when scrolling
  const mainNav = document.querySelector('.mainNav');
  const logoWhite = document.querySelector('.branding img.light');
  const logoDark = document.querySelector('.branding img.dark');
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const styles = window.getComputedStyle(mainNav);
  const nHUnit = 'px';
  const nH = styles.getPropertyValue('max-height').split(nHUnit)[0];
  el.addEventListener('ps-scroll-y', (e) => {
    if (e.target.scrollHeight > (vh * 1.5)) {
      const perc = Math.floor(e.target.scrollTop / (vh / 2) * 100);
      if (perc <= 100) {
        const navHeight = `${Math.floor(nH - ((nH / 4) * perc / 100))}px`;
        mainNav.style.cssText = `max-height: ${navHeight}; background-color: rgba(255, 255, 255, ${perc / 100})`;
        logoWhite.style.cssText =`opacity: ${1 - perc/100};`;
        logoDark.style.cssText =`opacity: ${perc/100};`;
        document.body.classList.remove('page-scrolled');
      } else {
        document.body.classList.add('page-scrolled');
      }
    }
  });
  
  inView('.animated').on('enter', (e) => {
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
  });
}

export const clearPageModifiers = () => {
  // document.body.classList.remove('page-scrolled', 'menu-open');
  document.body.setAttribute('class', '');
  const mainNav = document.querySelector('.mainNav');
  const logoWhite = document.querySelector('.branding img.light');
  const logoDark = document.querySelector('.branding img.dark');
  mainNav.style.cssText = '';
  logoWhite.style.cssText = `opacity: 1;`;
  logoDark.style.cssText = `opacity: 0;`;
}