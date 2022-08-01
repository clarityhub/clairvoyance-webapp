module.exports = {
  "extends": ["claire/preact"],

  "root": true,

  "settings": {
    "import/resolver": {
      "webpack": {
        "config": {
          "resolve": {
            "extensions": [".js", ".json", ".jsx"]
          },

          "alias": {
            "js": "src/js"
          }
        }
      },
      "node": {
        "paths": ["src"]
      }
    }
  }
};
