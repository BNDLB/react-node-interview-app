// This file is automatically included by Jest when running tests
// It sets up any global mocks or configuration needed for tests

// Import JestDOM for DOM testing utilities
import '@testing-library/jest-dom';

// Mock for fetch API if needed
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
  } as Response)
);
