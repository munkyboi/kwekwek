import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';
import PerfectScrollbar from 'perfect-scrollbar';
import inView from 'in-view';
import { createTransitionElements } from './utils';

class Fade extends Highway.Transition {
  in({ from, to, done }) {
    // create transition overlay element for incoming page
    createTransitionElements(to);

    // setup incoming content
    to.style.cssText = 'transform: scale(0.92); opacity: 1; zIndex: 2;';
    
    // gsap timeline
    const tl = new TimelineLite();
    const trEl = to.querySelector('.transitionOverlay');
    const trElCover = to.querySelector('.transitionOverlay__cover');
    const trElSpin = to.querySelector('.transitionOverlay__spin');
    trEl.style.cssText = 'display: block; opacity: 1;';
    tl.fromTo(trElSpin, 0.3, {
      display: 'block',
      opacity: 1,
      rotate: 0,
      scale: 1,
      onComplete: function() {
        from.remove();
      }
    }, {
      display: 'block',
      opacity: 0,
      rotate: 0,
      scale: 1,
      onStart: function() {
        tl.fromTo(trElCover, 0.3, {
          display: 'block',
          opacity: 1,
          top: '0%',
        }, {
          display: 'block',
          opacity: 1,
          top: '100%',
          onComplete: function() {
            tl.fromTo(to, 0.3, {
              transform: 'scale(0.92)',
              transformOrigin: 'center center'
            }, {
              transform: 'scale(1)',
              transformOrigin: 'center center',
              onComplete: function() {
                // hide transition overlay completely
                trEl.style.cssText = 'display: none; opacity: 0;';

                // end of transition
                document.body.classList.remove('transitioning');
                done();
              },
            });
          }
        });
      }
    });
  }

  out({ from, trigger, done }) {
    // inform body that page is transitioning
    document.body.classList.add('transitioning');

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
        tl.fromTo(trElCover, 0.15, {
          display: 'block',
          opacity: 1,
          top: '-100%',
        }, {
          display: 'block',
          opacity: 1,
          top: '0%',
          onComplete: function() {
            // proceed with incoming function
            tl.to(trElSpin, 0.15, {
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