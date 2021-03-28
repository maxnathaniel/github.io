import React from 'react';
import { act, render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SearchBar } from '../components/SearchBar';

jest.mock('../../global/api/movies', () => {
  const movies = {
    Search: [
      {
        Title: 'ABC',
        Year: '2002',
        Poster: 'url',
        type: 'movie',
        imdbID: '1414ytt',
      },
    ],
  };

  return {
    getMovies: jest.fn(() => Promise.resolve(movies)),
  };
});

describe('<Searchbar />', () => {
  afterEach(() => {
    cleanup();
  });

  const page = 0;
  const onClearListFn = jest.fn();
  const onUpdateFn = jest.fn();
  const onErrorFn = jest.fn();

  it('should render the various inner Elements', () => {
    const { container, getByText } = render(
      <SearchBar
        page={page}
        onClearList={onClearListFn}
        onUpdate={onUpdateFn}
        onError={onErrorFn}
      />
    );
    expect(getByText('MOVIES')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render search text in Input el', () => {
    const { container, getByTestId } = render(
      <SearchBar
        page={page}
        onClearList={onClearListFn}
        onUpdate={onUpdateFn}
        onError={onErrorFn}
      />
    );
    const inputEl = getByTestId('search-input').children[0];
    fireEvent.change(inputEl, {
      target: { value: 'star wars' },
    });
    expect(inputEl).toHaveValue('star wars');
    expect(container).toMatchSnapshot();
  });

  it('should get movies and invoke callback on Enter key', async () => {
    const { container, getByTestId } = render(
      <SearchBar
        page={page}
        onClearList={onClearListFn}
        onUpdate={onUpdateFn}
        onError={onErrorFn}
      />
    );
    const inputEl = getByTestId('search-input').children[0];
    fireEvent.change(inputEl, {
      target: { value: 'star wars' },
    });
    expect(inputEl).toHaveValue('star wars');

    await act(async () => {
      fireEvent.keyDown(inputEl, { key: 'Enter' });
    });

    expect(onUpdateFn).toBeCalled();
    expect(container).toMatchSnapshot();
  });
});
