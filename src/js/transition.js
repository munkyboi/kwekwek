import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';
import PerfectScrollbar from 'perfect-scrollbar';
import inView from 'in-view';

class Fade extends Highway.Transition {
  in({ from, to, done }) {
    // create transition overlay element for incoming page
    if (!to.querySelector('.transitionOverlay')) {
      const trEl = document.createElement('div');
      const trElSpin = document.createElement('div');
      const trElCover = document.createElement('div');
      trEl.classList.add('transitionOverlay');
      trElSpin.classList.add('transitionOverlay__spin');
      trElCover.classList.add('transitionOverlay__cover');
      trEl.appendChild(trElSpin);
      trEl.appendChild(trElCover);
      to.appendChild(trEl);
    }
    
    // gsap timeline
    const tl = new TimelineLite();
    tl.fromTo(to, 0, {
      transform: 'scale(0.92)',
      opacity: '1',
      zIndex: '2',
    }, {
      transform: 'scale(0.92)',
      opacity: '1',
      zIndex: '2',
      onStart: function() {
        const trEl = to.querySelector('.transitionOverlay');
        const trElCover = to.querySelector('.transitionOverlay__cover');
        const trElSpin = to.querySelector('.transitionOverlay__spin');
        trEl.style.cssText = 'display: block; opacity: 1;';
        tl.fromTo(trElSpin, 0.3, {
          display: 'block',
          opacity: 1,
          rotate: 0,
          scale: 1
        }, {
          display: 'block',
          opacity: 0,
          rotate: 0,
          scale: 1,
          onStart: function() {
            tl.fromTo(trElCover, 0.3, {
              display: 'block',
              opacity: 1,
              transform: 'translateY(0%)',
            }, {
              display: 'block',
              opacity: 1,
              transform: 'translateY(100%)',
              onComplete: function() {
                tl.fromTo(to, 0.3, {
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
                    document.body.classList.remove('transitioning');
                    done();
                  },
                });
              }
            })
          }
        })
      },
      onComplete: function() {
        from.remove();
      }
    })
  }

  out({ from, trigger, done }) {
    // inform body that page is transitioning
    document.body.classList.add('transitioning');

    // prevent element animation from triggering again when exiting
    [...document.querySelectorAll('[class*=animate]')].forEach(el => {
      [...el.classList].forEach(cl => {
        if (cl.indexOf('animate') > -1) {
          el.classList.remove(cl);
        }
      })
    })

    // gsap timeline
    const tl = new TimelineLite();
    tl.fromTo(from, 0.3, {
      transform: 'scale(1)',
      opacity: '1',
      zIndex: '1',
      transformOrigin: 'center center',
    }, {
      transform: 'scale(0.92)',
      opacity: '1',
      zIndex: '1',
      transformOrigin: 'center center',
      onComplete: function() {
        // animate transition overlay - cover
        const trEl = from.querySelector('.transitionOverlay');
        const trElCover = from.querySelector('.transitionOverlay__cover');
        const trElSpin = from.querySelector('.transitionOverlay__spin');
        trEl.style.cssText = 'display: block; opacity: 1;';
        tl.fromTo(trElCover, 0.3, {
          display: 'block',
          opacity: 1,
          transform: 'translateY(-100%)',
        }, {
          display: 'block',
          opacity: 1,
          transform: 'translateY(0%)',
          onComplete: function() {
            // proceed with incoming function
            tl.to(trElSpin, 0.3, {
              display: 'block',
              opacity: 0,
              scale: 1,
            }).to(trElSpin, 0.3, {
              display: 'block',
              opacity: 1,
              scale: 1,
              onComplete: function() {
                done();
              }
            });
          },
        });
      },
    });
  }
}

export default Fade;