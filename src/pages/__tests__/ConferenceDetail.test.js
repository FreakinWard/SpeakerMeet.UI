import React from 'react';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ConferenceDetail from '../ConferenceDetail';
import { render } from '../../utils/test.utilitiy';
import seedConference from '../../mocks/seed/seedConference';

describe('ConferenceDetail', () => {
  it('should render the expected Conference fields', async () => {
    // arrange
    const theme = createMuiTheme();

    const tree = (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ConferenceDetail />
        </BrowserRouter>
      </ThemeProvider>
    );

    // act
    render(tree);

    // assert
    await screen.findByText(seedConference.name);
    screen.getByText(seedConference.location);
    screen.getByText(seedConference.description);

    seedConference.socialPlatforms.forEach(platform => {
      expect(screen.getByLabelText(platform.name)).toHaveAttribute('href', platform.name.url);
    });

    seedConference.tags.forEach(tag => screen.getByText(tag));
  });
});
