import createApp from '@/libs/create-app';
import button from '@/modules/button';

window.apps.main = createApp({
  modules: {
    // Directly integrate module
    button,

    // lazy-load module if it's found in the DOM
    'vue-module': () => import(/* webpackChunkName: "vue-mod" */ '@/modules/vue-module'),

    // lazy laod when scrolled to this element
    'lazy-module': {
      lazy: true,
      handler: () => import(/* webpackChunkName: "lazy-mod" */ '@/modules/lazy-module'),
    },
  },
});
