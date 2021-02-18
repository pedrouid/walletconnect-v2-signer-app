const nodelibs = require("node-libs-react-native");

nodelibs.crypto = null;

module.exports = {
  resolver: {
    extraNodeModules: nodelibs,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
