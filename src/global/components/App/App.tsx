import React, { FC, lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

const Movies = lazy(
  () => import(/* webpackChunkName: "movies" */ 'src/Movies/components/Movies')
);
const MovieDetails = lazy(
  () =>
    import(
      /* webpackChunkName: "movieDetails" */ 'src/Movies/components/MovieDetails'
    )
);
import { GlobalStyle, ThemeProvider, styled } from 'src/global';

const AppContainer = styled.div<any>``;

export const theme = {
  buttons: {
    color: '#03dac5',
  },
  background: {
    color: '#282828',
  },
  colours: {
    neon1: '#03dac5',
    neon2: '', // TODO
    neon3: '', // TODO
    grey1: '#545454',
    grey2: '', // TODO
    grey3: '', // TODO
    white: '', // TODO
    red1: '#FF5733',
  },
};

export const App: FC = () => {
  return (
    <Suspense
      fallback={
        <Dimmer active>
          <Loader size='massive' />
        </Dimmer>
      }
    >
      <ThemeProvider theme={theme}>
        <AppContainer>
          <GlobalStyle darkTheme />
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Movies} />
              <Route path='/movie/:id' component={MovieDetails} />
            </Switch>
          </BrowserRouter>
        </AppContainer>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
