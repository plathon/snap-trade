// import { pathsToModuleNameMapper } from 'ts-jest/utils'
// import { compilerOptions } from './tsconfig.json'

export default {
  bail: 1,
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules', 'src'],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //  prefix: '<rootDir>/'
  // }),
  preset: 'ts-jest',
  testEnvironment: 'node'
}
