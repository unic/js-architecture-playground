import observer from '@unic/composite-observer';
import createModule from '@/libs/create-module';
import Vue from 'vue';

export default createModule({
  mixins: { observer }, // mixins have to be factory functions as well
  options: () => ({
    foo: 'bar',
  }),

  /**
   * createVueModule
   * @param {Object} module - Module
   * @param {Element} module.el - Element
   * @param {Object} module.state - State
   * @param {Object} module.options - Options
   * @return {Object} state
   */
  constructor({ el, state, options }) {
    state.wm = new Vue({
      el,
      data: {
        options,
      },
    });

    return state;
  },
});
