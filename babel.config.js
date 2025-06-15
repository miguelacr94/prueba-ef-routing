module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel'
    ],
    plugins: [
      // Debe ser el ÚLTIMO plugin en la lista
      [
        'react-native-reanimated/plugin', 
        {
          version: '3.18.0', // Especifica la versión explícitamente
          relativeSourceLocation: true,
        }
      ]
    ],
  };
};