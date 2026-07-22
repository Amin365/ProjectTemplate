const modules = import.meta.glob('./*.js', { eager: true });

const mergedRoles = Object.entries(modules)
  .filter(([modulePath]) => modulePath !== './index.js')
  .reduce((acc, [, moduleExports]) => {
    Object.values(moduleExports).forEach((value) => {
      if (value && typeof value === 'object') {
        Object.assign(acc, value);
      }
    });
    return acc;
  }, {});

export default mergedRoles;
