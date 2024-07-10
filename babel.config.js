module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    [
      '@babel/plugin-transform-private-methods',
      {
        loose: true // Ensure 'loose' mode is consistent
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true // Ensure 'loose' mode is consistent
      }
    ]
  ],
};