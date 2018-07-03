/* eslint-disable no-console */
import observer from '@unic/composite-observer';

/**
 * createButton
 * @param {Object} module - Module
 * @param {Element} module.el - Element
 * @param {Object} module.state - State
 * @param {Object} module.options - Options
 * @param {Object} Dependency - Blaa
 * @param {Function} Vue - Blaa
 * @param {Object} WindowEventObserver - Blaa
 * @return {Object} state
 */
export const createButton = (
  { el, state, options },
  Dependency,
  Vue,
  WindowEventObserver,
) => {
  /* --- Private methods --- */

  /**
   * clickHandler
   * @param {Event} event - Native Event
   * @return {undefined}
   */
  const clickHandler = event => {
    console.log('clicked', event, el);
  };

  /**
   * resizeHandler
   * @param {Event} event - Native Event
   * @return {undefined}
   */
  const resizeHandler = event => {
    console.log('resized', event);
  };

  /**
   * addEventListeners
   * @return {undefined}
   */
  const addEventListeners = () => {
    el.addEventListener('click', clickHandler);
    WindowEventObserver.on('resize', resizeHandler);
  };

  /**
   * removeEventListeners
   * @return {undefined}
   */
  const removeEventListeners = () => {
    el.removeEventListener('click', clickHandler);
    WindowEventObserver.off('resize', resizeHandler); // This actually doesn't work in current observer
  };

  /* --- Public methods --- */

  /**
   * init
   * @return {undefined}
   */
  state.init = () => {
    addEventListeners();

    console.log('el', el);
    console.log('state', state);
    console.log('options', options);
    console.log('Dependency', Dependency);
    console.log('Vue', Vue);
    console.log('WindowEventObserver', WindowEventObserver);
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

export const config = {
  name: 'button',
  dependencies: ['Dependency', 'Vue', 'WindowEventObserver'],
  mixins: [observer],
  constructor: createButton,
};
