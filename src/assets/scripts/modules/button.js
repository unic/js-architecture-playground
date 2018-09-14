import observer from '@unic/composite-observer';
import createModule from '@/libs/create-module';
import WindowEventObserver from '@/libs/window-event-observer';

export default createModule({
  mixins: { observer }, // mixins have to be factory functions as well
  options: () => ({
    foo: 'bar',
  }),

  /**
   * createButton
   * @param {Object} module - Module
   * @param {Element} module.el - Element
   * @param {Object} module.state - State
   * @param {Object} module.options - Options
   * @return {Object} state
   */
  constructor({ el, state, options }) {
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

      console.log('**************** module init ****************');
      console.log('el', el);
      console.log('state', state);
      console.log('options', options);
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
  },
});
