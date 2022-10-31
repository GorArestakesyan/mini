module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
    '@react-native-async-storage/async-storage': {
      root: __dirname,
      // rn-cli incorrectly resolves node_modules path for the following platforms
      platforms: {
        ios: null,
        android: null,
      },
    },
  },
};
