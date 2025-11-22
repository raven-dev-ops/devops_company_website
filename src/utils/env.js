export const getViteEnv = () => {
  try {
    // eslint-disable-next-line no-new-func
    const env = new Function('return import.meta.env')();
    return env || {};
  } catch {
    return {};
  }
};
