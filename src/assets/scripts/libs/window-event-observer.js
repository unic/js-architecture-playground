import throttle from 'raf-throttle';
import observer from '@unic/composite-observer';

/**
 * createWindowEventObserver
 * @return {Object} windowEventObserver
 */
const createWindowEventObserver = () => {
  const state = Object.assign({}, observer());

  /* --- Private methods --- */

  const resizeHandler = throttle(event => {
    state.trigger('resize', event);
  });

  const scrollHandler = throttle(event => {
    state.trigger('scroll', event);
  });

  /**
   * addEventListeners
   * @return {undefined}
   */
  const addEventListeners = () => {
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('scroll', scrollHandler);
  };

  /**
   * removeEventListeners
   * @return {undefined}
   */
  const removeEventListeners = () => {
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('scroll', scrollHandler);
  };

  /* --- Public methods --- */

  /**
   * init
   * @return {undefined}
   */
  state.init = () => {
    addEventListeners();
  };

  /**
   * destroy
   * @return {undefined}
   */
  state.destroy = () => {
    removeEventListeners();
  };

  state.init();

  return state;
};

export default createWindowEventObserver;
