import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Image, Placeholder } from 'semantic-ui-react';

import { styled, device } from 'src/global';
import { SearchResults } from './Movies';

const MovieItemContainer = styled.div`
  min-height: 300px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in;

  @media only screen and ${device.mobileM} {
    width: calc(100% - 20px);
  }

  @media only screen and ${device.mobileL} {
    width: calc((100% / 2) - 20px);
  }

  @media only screen and ${device.laptop} {
    width: calc((100% / 3) - 20px);
  }

  :hover {
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

interface Props {
  data?: Partial<SearchResults> | undefined;
  isPlaceHolder?: boolean;
}

export const MovieItem: FC<Props> = (props) => {
  const { data, isPlaceHolder = false } = props;
  const history = useHistory();

  const onClick = useCallback(() => {
    if (data?.imdbID) {
      history.push(`/movie/${data.imdbID}`);
    }
  }, []);

  return (
    <MovieItemContainer>
      {data && data.Poster === 'N/A' ? (
        <Placeholder
          onClick={onClick}
          inverted
          style={{ height: '100%', width: '100%' }}
        >
          <Placeholder.Image />
        </Placeholder>
      ) : (
        <ImageContainer>
          <Image
            style={{ border: '2px solid #03DAC5' }}
            src={data?.Poster}
            alt='movie-img'
            size='big'
            onClick={onClick}
          />
        </ImageContainer>
      )}
      {isPlaceHolder && (
        <Placeholder inverted style={{ height: '100%', width: '100%' }}>
          <Placeholder.Image />
        </Placeholder>
      )}
    </MovieItemContainer>
  );
};
