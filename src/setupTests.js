/* eslint-disable */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import MutationObserver from '@sheerun/mutationobserver-shim';
import { server } from './mocks/server';

const mockConfig = {
  api: 'https://mockUrl.com',
  nodeEnvironments: { production: 'production' },
  applicationInsightsTelemetryKey: 'applicationInsightsTelemetryKeyValue',
  disqusShortName: 'disqusShortNameValue',
};

jest.mock('./constants/config', () => mockConfig);

window.scrollTo = x => x;
window.MutationObserver = MutationObserver;

global.matchMedia = media => ({
  addListener: () => {},
  removeListener: () => {},
  matches: media === '(min-width: 1200px)',
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
