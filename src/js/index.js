import Highway from '@dogstudio/highway';
import Fade from './transition';
import Renderer from './renderer';

const H = new Highway.Core({
  renderers: {
    home: Renderer,
    about: Renderer,
    portfolio: Renderer,
    contact: Renderer,
  },
  transitions: {
    default: Fade
  }
});