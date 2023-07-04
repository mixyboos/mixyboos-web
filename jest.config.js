module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
    "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/RelativeImageStub.js",
    "module_name_(.*)": "<rootDir>/substituted_module_$1.js",
    "assets/(.*)": [
      "<rootDir>/images/$1",
      "<rootDir>/photos/$1",
      "<rootDir>/recipes/$1",
    ],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
// import type {Config} from "jest";
//
// const config: Config = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   transform: {
//     "^.+\\.ts?$": "ts-jest",
//   },
//   transformIgnorePatterns: ["<rootDir>/node_modules/"],
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//     "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
//     "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/RelativeImageStub.js",
//     "module_name_(.*)": "<rootDir>/substituted_module_$1.js",
//     "assets/(.*)": [
//       "<rootDir>/images/$1",
//       "<rootDir>/photos/$1",
//       "<rootDir>/recipes/$1",
//     ],
//   },
//   setupFilesAfterEnv: ['./jest.setup.js']
//
// };
//
// export default config;
//
// // module.exports = {
// //   preset: "ts-jest",
// //   testEnvironment: "node",
// //   transform: {
// //     "^.+\\.ts?$": "ts-jest",
// //   },
// //   transformIgnorePatterns: ["<rootDir>/node_modules/"],
// // };
