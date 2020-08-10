import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';
import PerfectScrollbar from 'perfect-scrollbar';
import inView from 'in-view';

class Fade extends Highway.Transition {
  in({ from, to, done }) {
    const tl = new TimelineLite();

    tl.fromTo(to, 0.3, {
      opacity: '0',
      zIndex: '2',
    }, {
      opacity: '1',
      zIndex: '2',
      onComplete: function() {
        document.body.classList.remove('transitioning');
        from.remove();
      },
    }).fromTo(to, 0.3, {
      transform: 'scale(0.92)',
      transformOrigin: 'center center'
    }, {
      transform: 'scale(1)',
      transformOrigin: 'center center',
      onComplete: function() {
        const container = to.querySelector('.contentWrapper');
        const ps = new PerfectScrollbar(container, {
          handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 100,
          suppressScrollX : true
        });
          
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
        
        const mainNav = document.querySelector('.mainNav')
        const logoWhite = document.querySelector('.branding img.light');
        const logoDark = document.querySelector('.branding img.dark');
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
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
      },
    });
    done();
  }

  out({ from, trigger, done }) {
    const tl = new TimelineLite();
    document.body.classList.add('transitioning');

    const elArr = document.querySelectorAll('[class*=animate]');
    elArr.forEach(el => {
      el.classList.forEach(cl => {
        if (cl.indexOf('animate') > -1) {
          el.classList.remove(cl);
        }
      })
    })
    
    tl.fromTo(from, 0.3, {
      transform: 'scale(1)',
      opacity: '1',
      zIndex: '1',
      transformOrigin: 'center center',
      onComplete: function() {
        document.body.classList.remove('page-scrolled');
        document.body.classList.remove('menu-open');
        const mainNav = document.querySelector('.mainNav')
        const logoWhite = document.querySelector('.branding img.light');
        const logoDark = document.querySelector('.branding img.dark');
        mainNav.style.cssText = `max-height: 8vh; background-color: rgba(255, 255, 255, 0)`;
        logoWhite.style.cssText =`opacity: 1;`
        logoDark.style.cssText =`opacity: 0;`
      }
    }, {
      transform: 'scale(0.92)',
      opacity: '1',
      zIndex: '1',
      transformOrigin: 'center center',
      onComplete: function() {
        done();
      },
    });
  }
}

export default Fade;