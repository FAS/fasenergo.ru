SystemJS.config({
  baseURL: "/source/scripts",
  rootURL: './', // used by plugin-css
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/",
      "github:": "/jspm_packages/github/",
      "main/": ""
    }
  },
  nodeConfig: {
    "paths": {
      "npm:": "jspm_packages/npm/",
      "github:": "jspm_packages/github/",
      "main/": "source/scripts/"
    }
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.21",
      "systemjs-hot-reloader": "npm:systemjs-hot-reloader@1.1.0",
      "systemjs-plugin-json": "npm:systemjs-plugin-json@0.3.0",
      "systemjs-plugin-css": "npm:systemjs-plugin-css@0.1.36"
    },
    "packages": {
      "npm:systemjs-hot-reloader@1.1.0": {
        "map": {
          "systemjs-hmr": "npm:systemjs-hmr@2.0.9"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "main": {
      "main": "main.js",
      "format": "esm",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        },
        "*.css": {
          "loader": "css"
        },
        "*.json": {
          "loader": "systemjs-plugin-json"
        }
      }
    }
  },
  map: {
    "@hot": "@empty",
    "css": "npm:systemjs-plugin-css@0.1.36"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "ajaxchimp": "npm:ajaxchimp@1.3.0",
    "babel-polyfill": "npm:babel-polyfill@6.23.0",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "jquery": "npm:jquery@3.2.1",
    "jump.js": "npm:jump.js@1.0.2",
    "lodash": "npm:lodash@4.17.4",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "photoswipe": "npm:photoswipe@4.1.2",
    "process": "npm:jspm-nodelibs-process@0.2.1"
  },
  packages: {
    "npm:babel-polyfill@6.23.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.23.0",
        "core-js": "npm:core-js@2.4.1",
        "regenerator-runtime": "npm:regenerator-runtime@0.10.5"
      }
    },
    "npm:babel-runtime@6.23.0": {
      "map": {
        "core-js": "npm:core-js@2.4.1",
        "regenerator-runtime": "npm:regenerator-runtime@0.10.5"
      }
    }
  }
});
