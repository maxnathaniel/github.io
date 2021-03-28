import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act, render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ThemeProvider, theme } from 'src/global';

import { MovieDetails } from '../components/MovieDetails';

jest.mock('../../global/api/movies', () => {
  const movieDetails = {
    Actors: 'Jennifer Lawrence, Bruce Anniston',
    Awards: 'Oscars',
    Rated: 'PG',
    Released: '2001',
    Ratings: [{ value: '7/10', source: 'IMDB' }],
    Writer: 'Bruce Pitts',
    Director: ' Brad Willis',
    Genre: 'Action',
    BoxOffice: 'Hollywood',
    Runtime: '120mins',
    Production: 'Disney',
    Plot: 'Hello World',
    Country: 'USA',
  };
  return {
    getMovieDetails: jest.fn(() => Promise.resolve(movieDetails)),
  };
});

const history = createMemoryHistory();
const route = '/movie/1551';
history.push(route);

describe('<MovieDetails />', () => {
  it('should render the various inner Elements', async () => {
    let container;
    let getByText;

    await act(async () => {
      const result = render(
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <MovieDetails />
          </ThemeProvider>
        </Router>
      );
      container = result.container;
      getByText = result.getByText;
    });

    expect(await getByText('Oscars')).toBeInTheDocument();
    expect(await getByText('PG')).toBeInTheDocument();
    expect(await getByText('2001')).toBeInTheDocument();
    expect(await getByText('Bruce Pitts')).toBeInTheDocument();
    expect(await getByText('Brad Willis')).toBeInTheDocument();
    expect(await getByText('Action')).toBeInTheDocument();
    expect(await getByText('Hollywood')).toBeInTheDocument();
    expect(await getByText('120mins')).toBeInTheDocument();
    expect(await getByText('Disney')).toBeInTheDocument();
    expect(await getByText('USA')).toBeInTheDocument();
    expect(await getByText('Jennifer Lawrence')).toBeInTheDocument();
    expect(await getByText('Bruce Anniston')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
