{
  "parser":  "@typescript-eslint/parser",
  "extends": ["airbnb-base"],
  "env": {
      "browser": true
  },
  "parserOptions": {
    "project": "tsconfig.json",
    "tsconfigRootDir": "."
  },
  "rules": {
      "class-methods-use-this": "off",
      "linebreak-style": "off",
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
      "jsx-a11y/click-events-have-key-events": "off",
      "no-console": "off",
      "import/prefer-default-export": "off",
      "implicit-arrow-linebreak": "off"
  },
  "settings": {
      "import/resolver": {
        "node": {
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        }
      }
  },
  "overrides": [
      {
        "files": ["**/*.ts", "**/*.tsx"],
        "rules": {
          "no-unused-vars": ["off"],
          "no-undef": ["off"]
        }
      }
  ]
}