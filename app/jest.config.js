module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testResultsProcessor: "jest-teamcity-reporter",
  snapshotSerializers: ["jest-emotion"],
  globals: {
    "ts-jest": {
      babelConfig: require("./webpack.common").babelCommon
    }
  }
};
