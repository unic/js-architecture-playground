/**
 * Dependency Injector Factory
 *
 * @description
 * A Dependency injector manages Dependency-instances and injects them into other functions
 *
 * @example
 * const injector = createDependencyInjector();
 *
 * @return {Object} injector
 */
const createDependencyInjector = () => {
  const depencendies = {};

  /**
   * Register a new Dependency
   *
   * @example
   * injector.register('router', { name: 'router' });
   * injector.register('service', { name: 'service' });
   *
   * @param {String} name - Dependency name
   * @param {Function} dependency - Dependency to register
   * @return {undefined}
   */
  const register = (name, dependency) => {
    if (!name || !dependency) {
      throw new Error(
        'Provide a name and a dependency when trying to register a dependency',
      );
    }

    depencendies[name] = dependency;
  };

  /**
   * Dependency Resolver
   *
   * @description
   * The Dependency injector is a higher order function that takes an Array and a Function as arguments.
   * The Array has Depencendies and placeholders (null), placeholders will always be filles via the call from the returned function.
   *
   * @example
   * const factory = injector.resolve([null, 'router', 'service'], function(options, router, service) {
   *     console.log(router); // Loggs registered router dependency
   *     console.log(service); // Loggs registered service dependency
   * });
   *
   * @param {Array} deps - Dependencies
   * @param {Function} fn - Factory function
   * @return {Function} - Function with injected dependencies
   */
  const resolve = (deps, fn) =>
    function injectedFunction(...args) {
      const props = deps.map((dep, index) => {
        if (args[index]) {
          return args[index];
        }
        if (typeof deps[index] === 'string') {
          // eslint-disable-next-line
          if (depencendies.hasOwnProperty(deps[index])) {
            if (typeof depencendies[deps[index]] === 'function') {
              return new Promise(_resolve => {
                depencendies[deps[index]]().then(_resolve);
              });
            }

            return depencendies[deps[index]];
          }
          throw new Error(`Dependency ${deps[index]} is not registered`);
        }
        return undefined;
      });

      // Check if one ore more props are pending Promises
      // If Promises are found, resolve asynchronously
      // If no Promises are found, resolve synchronously
      if (props.some(item => Promise.resolve(item) === item)) {
        return Promise.all(props).then(resolvedProps => fn.call(this, ...resolvedProps));
      }
      return fn.call(this, ...props);
    };

  return {
    register,
    resolve,
  };
};

export default createDependencyInjector;
