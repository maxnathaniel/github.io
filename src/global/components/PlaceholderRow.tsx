import React, { FC} from 'react';
import { Placeholder } from 'semantic-ui-react';

import { styled } from '../styles';
import { device } from '../utils';

const PlaceholdeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PlaceholderItemWrapper = styled.div`
  min-height: 300px;
  margin: 10px;
  width: calc( (100% / 4) - 20px );
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in;

  @media only screen and ${device.mobileM} {
    width: calc(100% - 20px);
  }

  @media only screen and ${device.mobileL} {
    width: calc( (100% / 2) - 20px );
  }

  @media only screen and ${device.laptop} {
    width: calc( (100% / 3) - 20px );
  }
`;

export const PlaceholderRow: FC = () => {
  return (
    <PlaceholdeContainer>
      <PlaceholderItemWrapper>
        <Placeholder inverted style={{ width: '100%', height: '100%'}}>
          <Placeholder.Image />
        </Placeholder>
      </PlaceholderItemWrapper>
      <PlaceholderItemWrapper>
        <Placeholder inverted style={{ width: '100%', height: '100%'}}>
          <Placeholder.Image />
        </Placeholder>
        </PlaceholderItemWrapper>
      <PlaceholderItemWrapper>
        <Placeholder inverted style={{ width: '100%', height: '100%'}}>
          <Placeholder.Image />
        </Placeholder>
      </PlaceholderItemWrapper>
    </PlaceholdeContainer>
  );
};

export default PlaceholderRow;