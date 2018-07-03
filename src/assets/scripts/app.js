import injector from '@/injector';

/**
 * Create a Module
 * @param {Object} config - Moduleconfig
 * @return {Object} - Module
 */
const createModule = config => {
  const module = {
    config,
    selector: [
      `[data-module="${config.name}"]`,
      `[data-module^="${config.name} "]`,
      `[data-module$=" ${config.name}"]`,
      `[data-module~=" ${config.name} "]`,
    ].toString(),
    injectedConstructor:
      config.dependencies && config.dependencies.length
        ? injector.resolve([null, ...config.dependencies], config.constructor)
        : config.constructor,
    instances: [],
  };

  /**
   * Init this module for every Element found with the selector
   * @param {Element} [scope = document] - When given, only inits Modules inside given scope
   * @return {Object}- Return Module for chaining-option
   */
  module.init = (scope = document) => {
    scope.querySelectorAll(module.selector).forEach(async el => {
      const initialState = {};

      // Apply mixins to initial state
      if (Array.isArray(module.config.mixins) && module.config.mixins.length > 0) {
        module.config.mixins.reduce(
          (acc, mixin) =>
            Object.assign(acc, typeof mixin === 'function' ? mixin() : mixin),
          initialState,
        );
      }

      const state = await Promise.resolve(
        module.injectedConstructor({
          name: module.config.name, // TODO: Is this needed?
          el,
          state: initialState,
          options: Object.assign(
            {},
            module.config.options,
            JSON.parse(el.getAttribute(`data-${config.name}-options`)),
          ),
        }),
      );

      module.instances.push({
        el,
        state,
      });
    });

    return module;
  };

  /**
   * Destroy all instances in given scope
   * @param {Element} [scope = document] - When given, only destroys Modules inside given scope
   * @return {Object}- Return Module for chaining-option
   */
  module.destroy = (scope = document) => {
    const elements = Array.from(scope.querySelectorAll(module.selector));

    // Destroy and remove instances in the same step
    module.instances = module.instances.reduce((acc, instance) => {
      // TODO: something can't work here... refactor
      if (elements.includes(instance.el)) {
        try {
          instance.state.destroy();
        } catch (error) {
          /* Eats error when function not found */
        }
      } else {
        acc.push(instance);
      }

      return acc;
    }, []);

    return module;
  };

  return module;
};

// eslint-disable-next-line
const createApp = ({ state = {}, configs }) => {
  state.modules = {};
  state.configs = configs;

  // Create modules
  state.configs.forEach(config => {
    const module = createModule(config);
    state.modules[module.config.name] = module;
  });

  state.init = (scope = document) => {
    Object.values(state.modules).forEach(module => {
      module.init(scope);
    });
  };

  state.destroy = (scope = document) => {
    Object.values(state.modules).forEach(module => {
      module.destroy(scope);
    });
  };

  state.init();

  return state;
};

export default createApp;
