import injector from '@/injector';
import createWindowEventObserver from '@/libs/window-event-observer';

// Async Dependencies
injector.register('Vue', () =>
  import(/* webpackChunkName: "vue" */ 'vue').then(module => {
    const Vue = module.default;
    Vue.productionTip = false;
    return Vue;
  }),
);

// Dependencies
injector.register('Dependency', { foo: 'foo' });
injector.register('WindowEventObserver', createWindowEventObserver());
