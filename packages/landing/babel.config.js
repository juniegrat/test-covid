module.exports = function (api) {
  api.cache(true);

  const presets = ['next/babel'];
  const plugins = [['styled-components'], ['superjson-next']];

  return {
    presets,
    plugins
  };
};
