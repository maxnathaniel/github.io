import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { MovieItem } from '../components/MovieItem';

describe('<MovieItem />', () => {
  it('should render the various inner Elements', () => {
    const { container, getAllByAltText } = render(<MovieItem />);

    expect(getAllByAltText('movie-img')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
