// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
) as jest.Mock;

// Suppress React Router warnings in tests
const originalError = console.error;
beforeAll(() => {
    console.error = (...args: string[]) => {
        if (args[0]?.includes('not wrapped in act')) return;
        originalError.call(console, ...args);
    };
});

afterAll(() => {
  console.error = originalError;
}); 