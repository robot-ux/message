module.exports = {
  // Add this line to your Jest config
  rootDir: './',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx}'],
  setupFilesAfterEnv: ['./config/jest.setup.js'],
};
