import React from 'react';
import { screen } from '@testing-library/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import SpeakerDetail from '../SpeakerDetail';
import { render } from '../../utils/test.utilitiy';
import seedSpeaker from '../../mocks/seed/seedSpeaker';
import routes from '../../constants/routes';

describe('SpeakerDetail', () => {
  it('should render the expected Speaker fields', async () => {
    // arrange
    const theme = createMuiTheme();

    const tree = (
      <ThemeProvider theme={theme}>
        <SpeakerDetail />
      </ThemeProvider>
    );

    // act
    render(tree, {
      route: `${routes.speakers.path}/${seedSpeaker.slug}`,
    });

    // assert
    await expect(await screen.findByText(seedSpeaker.name)).toBeInTheDocument();
    screen.getByText(seedSpeaker.location);
    screen.getByText(seedSpeaker.description);

    seedSpeaker.socialPlatforms.forEach(platform => {
      expect(screen.getByLabelText(platform.name)).toHaveAttribute('href', platform.name.url);
    });

    seedSpeaker.tags.forEach(tag => screen.getByText(tag));
  });
});
