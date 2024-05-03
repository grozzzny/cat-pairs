import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __CLIENT_HOST__: JSON.stringify(process.env.CLIENT_HOST || 'http://localhost:3000')
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.css$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./setup-tests.tsx']
};
