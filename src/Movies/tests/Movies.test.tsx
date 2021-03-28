import React, { ReactElement } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ThemeProvider, theme } from 'src/global';

import { Movies } from '../components/Movies';

/**
 * Utility function that mocks the `IntersectionObserver` API. Necessary for components that rely
 * on it, otherwise the tests will crash. Recommended to execute inside `beforeEach`.
 * @param intersectionObserverMock - Parameter that is sent to the `Object.defineProperty`
 * overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 * mock the intersection observer, but its methods.
 */
export function setupIntersectionObserverMock({
  root = null,
  rootMargin = '',
  thresholds = [],
  disconnect = () => null,
  observe = () => null,
  takeRecords = () => [],
  unobserve = () => null,
} = {}): void {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = root;
    readonly rootMargin: string = rootMargin;
    readonly thresholds: ReadonlyArray<number> = thresholds;
    disconnect: () => void = disconnect;
    observe: (target: Element) => void = observe;
    takeRecords: () => IntersectionObserverEntry[] = takeRecords;
    unobserve: (target: Element) => void = unobserve;
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}

beforeEach(() => {
  return new setupIntersectionObserverMock();
});

const history = createMemoryHistory();
const route = '/movie/1551';
history.push(route);

describe('<Movies />', () => {
  it('should render the various inner Elements', () => {
    const { container, getByText } = render(
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Movies />
        </ThemeProvider>
      </Router>
    );
    expect(
      getByText('No results found. Please type in the search bar above.')
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
