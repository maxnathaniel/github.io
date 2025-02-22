import React, { FC, useEffect, useRef, useState } from 'react';

import { device, getMovies, styled } from 'src/global';
import { SearchBar } from 'src/Search';
import { MovieItem } from './MovieItem';

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CenterPos = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: calc(100vh - 60px);
  color: ${(props) => props.theme.colours.neon1};
  justify-content: center;

  > p {
    text-align: center;
    font-size: 1em;
    align-self: center;
  }

  @media only screen and ${device.mobileM} {
    > p {
      font-size: 1.2em;
    }
  }

  @media only screen and ${device.mobileL} {
    > p {
      font-size: 1.4em;
    }
  }

  @media only screen and ${device.tablet} {
    > p {
      font-size: 1.6em;
    }
  }

  @media only screen and ${device.laptop} {
    > p {
      font-size: 1.8em;
    }
  }
`;

const Bottom = styled.div``;

export interface SearchResults {
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbID: string;
}

interface MoviesData {
  Search: SearchResults[];
}

export const Movies: FC = () => {
  const [movies, setMovies] = useState<SearchResults[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const bottomRef = useRef<Element | null>(null);
  const moviesCountRef = useRef(0);

  async function getData(searchVal?: string) {
    setIsLoading(true);
    const data: MoviesData = await getMovies(searchVal ?? search, page);

    if (moviesCountRef.current === 0) {
      moviesCountRef.current = movies.length + data.Search.length;
    }

    if (data.Search) {
      setMovies((movieList) => [...movieList, ...data.Search]);
    }
    setIsLoading(false);
  }

  const reset = () => {
    setMovies([]);
    setPage(1);
    moviesCountRef.current = 0;
  };

  const onClearList = () => {
    reset();
  };

  const onMoviesUpdate = (data: SearchResults[], search: string) => {
    setSearch(search);
    moviesCountRef.current = movies.length + data.length;
    setMovies((moviesList) => [...moviesList, ...data]);
    setError('');
  };

  const onMoviesUpdateError = (error: any) => {
    setError(error);
  };

  const handleObserver = (entities: any[]) => {
    const [target] = entities;

    if (target.isIntersecting && moviesCountRef.current > 0) {
      setPage((page) => page + 1);
    }
  };

  const clearStorage = () => {
    sessionStorage.clear();
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '40px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (bottomRef && bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [bottomRef]);

  useEffect(() => {
    const searchVal = sessionStorage.getItem('search');
    if (searchVal) {
      setSearch(searchVal);
      getData(searchVal);
    }

    window.addEventListener('beforeunload', clearStorage);

    return () => {
      window.removeEventListener('beforeunload', clearStorage);
    };
  }, []);

  useEffect(() => {
    try {
      if (search.length && page > 1) {
        getData();
      }
    } catch (e) {
      console.error('Unable to retrieve Movies', e);
      setError(e.toString());
    }
  }, [page]);

  return (
    <MoviesContainer>
      <SearchBar
        page={page}
        onClearList={onClearList}
        onUpdate={onMoviesUpdate}
        onError={onMoviesUpdateError}
      />
      {!movies.length && !error && (
        <CenterPos>
          <p> No results found. Please type in the search bar above.</p>
        </CenterPos>
      )}
      {error && (
        <CenterPos>
          <p>Error retrieving movies</p>
        </CenterPos>
      )}
      {movies.map((movie) => {
        return <MovieItem key={movie.imdbID} data={movie} />;
      })}
      {isLoading &&
        [1, 2, 3, 4, 5, 6].map((x) => (
          <MovieItem key={x} data={{}} isPlaceHolder={isLoading} />
        ))}
      <Bottom ref={bottomRef} />
    </MoviesContainer>
  );
};

export default Movies;
