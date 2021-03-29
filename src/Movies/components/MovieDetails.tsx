import React, { FC, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Breadcrumb, Image, Placeholder } from 'semantic-ui-react';

import { device, getMovieDetails, styled } from 'src/global';
import { SearchResults } from './Movies';

const MovieDetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  margin: 2% auto;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.p`
  margin: 20% auto 0 auto;
  font-size: 1.6em;
  color: ${(props) => props.theme.colours.red1};
`;

const Poster = styled.div`
  flex: 1 1 auto;
  min-width: 40%;
  max-width: 40%;
`;

const HeaderText = styled.h1`
  font-family: Open Sans;
  font-size: 2em;
  text-align: left;
  max-width: 550px;

  @media only screen and ${device.mobileM} {
    text-align: center;
    max-width: 100%;
  }

  @media only screen and ${device.mobileL} {
    text-align: center;
    max-width: 100%;
  }

  @media only screen and ${device.tablet} {
    text-align: center;
    max-width: 400px;
  }
`;

const SecondayHeaderText = styled.h1`
  font-family: Open Sans;
  font-size: 1.5em;
  font-weight: 300;
`;

const PosterContent = styled.div`
  flex: 2 1 auto;
  align-self: flex-start;
`;

const MoviePlot = styled.div`
  flex: 1 1 auto;
  min-width: 40%;
  max-width: 40%;
  padding: 10px;
  align-self: flex-start;
  text-align: left;

  @media only screen and ${device.mobileM} {
    min-width: 100%;
  }

  @media only screen and ${device.mobileL} {
    min-width: 100%;

    > p {
      max-width: 100%;
    }
  }

  @media only screen and ${device.tablet} {
    width: 100%;

    > p {
      max-width: 100%;
    }
  }

  @media only screen and ${device.laptop} {
    min-width: 40%;
    max-width: 40%;

    > p {
      max-width: 350px;
    }
  }
`;

const Border = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.colours.grey1};
`;

const MovieDetailsText = styled.div`
  flex: 2 1 auto;
  padding: 10px;
  margin-top: 20px;
`;

const Label = styled.p`
  flex: 1 1 auto;
  color: ${(props) => props.theme.colours.neon1};
  text-align: left;
  max-width: 100px;
`;

const Text = styled.p`
  flex: 2 1 auto;
  text-align: left;
  max-width: 350px;

  @media only screen and ${device.mobileM} {
    max-width: 250px;
  }

  @media only screen and ${device.mobileL} {
    max-width: 200px;
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
`;

const Source = styled.h4`
  display: inline-block;
`;

const RatingsWrapper = styled.div`
  text-align: left;
  margin: 10px 10px 0 0;
`;

const Circle = styled.div`
  display: inline-block;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  background-color: ${(props) => props.theme.colours.neon1};
  vertical-align: middle;
  text-align: center;
  margin-right: 20px;
  color: black;

  > p {
    margin-top: 30%;
  }
`;

const PulsingCircle = styled.div`
  display: inline-block;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  background-color: ${(props) => props.theme.colours.neon1};
  vertical-align: middle;
  text-align: center;
  margin-right: 20px;
  color: black;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(0.85);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.85);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  > p {
    margin-top: 30%;
  }
`;

const ActorWrapper = styled.div`
  flex: 1 1 auto;
  text-align: left;
  margin: 10px 0;
`;

interface MovieDetailsData extends SearchResults {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: any[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export const MovieDetails: FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<MovieDetailsData | null>(null);
  const [error, setError] = useState('');

  const onReturn = () => {
    history.push('../');
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      getMovie(id);
    } catch (e) {
      console.error('Unable to retrieve movie details', e);
      setError(e.toString());
    }
    setIsLoading(false);

    async function getMovie(id: string) {
      try {
        const data = await getMovieDetails(id);
        if (data) {
          setDetails(data);
        }
      } catch (e) {
        setError('Unable to retrieve movie details');
      }
    }
  }, []);

  return (
    <MovieDetailsContainer>
      <Breadcrumb
        style={{ marginTop: '10px', width: '80%', textAlign: 'left' }}
      >
        <Breadcrumb.Section
          link
          onClick={onReturn}
          style={{ color: '#03dac5' }}
        >
          Home
        </Breadcrumb.Section>
        <Breadcrumb.Divider style={{ color: '#03dac5' }} />
        <Breadcrumb.Section active>Movie</Breadcrumb.Section>
      </Breadcrumb>
      {error && <ErrorText>Unable to retrieve movie details</ErrorText>}
      {details && (
        <>
          <Section>
            <Poster>
              {details.Poster === 'N/A' ? (
                <Placeholder
                  inverted
                  style={{ maxWidth: '250px', minHeight: '300px' }}
                >
                  <Placeholder.Image />
                </Placeholder>
              ) : (
                <Image
                  style={{ margin: '0 auto' }}
                  src={details.Poster}
                  size='medium'
                />
              )}
            </Poster>
            <PosterContent>
              <HeaderText>{details.Title}</HeaderText>
              {details.Ratings.length &&
                details.Ratings.map((rating) => {
                  return (
                    <RatingsWrapper key={rating}>
                      <PulsingCircle>
                        <p>{rating.Value}</p>
                      </PulsingCircle>
                      <Source>
                        <p>{rating.Source}</p>
                      </Source>
                    </RatingsWrapper>
                  );
                })}
            </PosterContent>
          </Section>
          <Border />
          <Section>
            <MoviePlot>
              <SecondayHeaderText>Movie Details</SecondayHeaderText>
              <Text style={{ color: '#03dac5' }}>Synposis</Text>
              <Text style={{ color: '#FFF', lineHeight: '2' }}>
                {details.Plot}
              </Text>
            </MoviePlot>
            <MovieDetailsText>
              <SecondayHeaderText>{''}</SecondayHeaderText>
              <FlexRow>
                <Label>Awards</Label>
                <Text>{details.Awards}</Text>
              </FlexRow>
              <FlexRow>
                <Label>Rated</Label>
                <Text>{details.Rated}</Text>
              </FlexRow>
              <FlexRow>
                <Label>Genre</Label>
                <Text>{details.Genre}</Text>
              </FlexRow>
              <FlexRow>
                <Label>Director</Label>
                <Text>{details.Director}</Text>
              </FlexRow>
              <FlexRow>
                <Label>Writer</Label>
                <Text>{details.Writer}</Text>
              </FlexRow>
              <FlexRow>
                <Label>Released</Label>
                <Text>{details.Released}</Text>
              </FlexRow>
              <FlexRow>
                <Label>Box Office</Label>
                <Text>{details.BoxOffice}</Text>
              </FlexRow>
              <FlexRow>
                <Label>Runtime</Label>
                <Text>{details.Runtime}</Text>
              </FlexRow>
              <FlexRow>
                <Label>Studio</Label>
                <Text>{details.Production}</Text>
              </FlexRow>
              <FlexRow>
                <Label>Country</Label>
                <Text>{details.Country}</Text>
              </FlexRow>
            </MovieDetailsText>
          </Section>
          <Border />
          <Section>
            <SecondayHeaderText style={{ width: '100%', textAlign: 'left' }}>
              Cast
            </SecondayHeaderText>
            <FlexRow style={{ width: '100%', flexWrap: 'wrap' }}>
              {details.Actors.split(',').map((actor) => {
                return (
                  <ActorWrapper key={actor} style={{ minWidth: '25%' }}>
                    <Circle>
                      <p>{actor.trim()[0]}</p>
                    </Circle>
                    <Text style={{ display: 'inline' }}>{actor.trim()}</Text>
                  </ActorWrapper>
                );
              })}
            </FlexRow>
          </Section>
        </>
      )}
    </MovieDetailsContainer>
  );
};

export default MovieDetails;
