import React, { FC, useEffect, useRef, useState } from 'react';
import { Input } from 'semantic-ui-react';

import { getMovies, styled } from 'src/global';

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 60px;
  width: 100%;
  padding: 10px;
  border-bottom: 3px solid #03dac5;
`;

const Title = styled.h1`
  flex: 1 1 auto;
  margin-left: 20px;
  color: #03dac5;
`;

const InputContainer = styled.div`
  margin-right: 20px;
  width: 30%;
`;

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

interface Props {
  page: number;
  onClearList: () => void;
  onUpdate: (data: SearchResults[], search: string) => void;
  onError: (error: string) => void;
}

export const SearchBar: FC<Props> = (props) => {
  const [input, setInput] = useState('');
  const { page, onClearList, onError, onUpdate } = props;
  const id = useRef(0);

  async function getData(input: string) {
    try {
      const data: MoviesData = await getMovies(input, page);
      if (data.Search) {
        onUpdate(data.Search, input);
      }
    } catch (e) {
      console.error('Unable to retrieve Movies', e);
    }
  }

  useEffect(() => {
    const searchKey = sessionStorage.getItem('search');
    if (searchKey) {
      setInput(searchKey);
    }
  }, []);

  useEffect(() => {
    if (input.length === 0) {
      onClearList();
      clearTimeout(id.current);
      return;
    }
  }, [input]);

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      try {
        // we can replace sessionStorage with an in memory state management lib
        // like redux, mobx, recoil, akita etc
        onClearList();
        sessionStorage.setItem('search', input);
        getData(input);
      } catch (e) {
        console.error('Unable to retrieve Movies', e);
        onError(e.toString());
      }
    }
  };

  const onChange = (e: any) => {
    const {
      target: { value },
    } = e;

    setInput(value);
  };

  return (
    <SearchBarContainer>
      <Title>MOVIES</Title>
      <InputContainer>
        <Input
          data-testid='search-input'
          icon='search'
          type='text'
          size='small'
          fluid
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder='Input Movie Title...'
        />
      </InputContainer>
    </SearchBarContainer>
  );
};
