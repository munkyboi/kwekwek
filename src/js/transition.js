import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';
import PerfectScrollbar from 'perfect-scrollbar';

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
        document.body.classList.remove('animating');
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
        const ps = new PerfectScrollbar(container);
      },
    });
    done();
  }

  out({ from, trigger, done }) {
    const tl = new TimelineLite();
    document.body.classList.add('animating');
    
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
        done();
      },
    });
  }
}

export default Fade;