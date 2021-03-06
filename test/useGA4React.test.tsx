import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useGA4React } from '../src/index';

Object.defineProperty(global.document, 'readyState', {
  get() {
    return 'interactive';
  },
});

beforeAll(() => {
  global.document.head.innerHTML = '';
});

const Example: React.FC = () => {
  const ga4React = useGA4React('GA-CODE');
  return <>{JSON.stringify(ga4React)}</>;
};

describe('GA4R hook', () => {
  it('Rendering', async done => {
    const { container } = render(<Example />);

    setTimeout(() => {
      global.document.dispatchEvent(new Event('readystatechange'));
    }, 100);

    setTimeout(() => {
      const LoadEvent = document.createEvent('HTMLEvents');
      LoadEvent.initEvent('load', true, true);
      const target = global.document.head.querySelector('script');
      if (target) {
        target.dispatchEvent(LoadEvent);
      }
    }, 1000);

    setTimeout(() => {
      expect(container.innerHTML).toMatchSnapshot();
      expect(global.document.head).toMatchSnapshot();
      done();
    }, 2000);
  });

  it('Rendering, but ga4React is initialized', async done => {
    const { container } = render(<Example />);

    setTimeout(() => {
      global.document.dispatchEvent(new Event('readystatechange'));
    }, 100);

    setTimeout(() => {
      const LoadEvent = document.createEvent('HTMLEvents');
      LoadEvent.initEvent('load', true, true);
      const target = global.document.head.querySelector('script');
      if (target) {
        target.dispatchEvent(LoadEvent);
      }
    }, 1000);

    setTimeout(() => {
      expect(container.innerHTML).toMatchSnapshot();
      expect(global.document.head).toMatchSnapshot();
      done();
    }, 2000);
  });
});
