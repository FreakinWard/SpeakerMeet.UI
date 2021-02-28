import React from 'react';
import { screen } from '@testing-library/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CommunityDetail from '../CommunityDetail';
import { render } from '../../utils/test.utilitiy';
import seedCommunity from '../../mocks/seed/seedCommunity';
import routes from '../../constants/routes';

describe('CommunityDetail', () => {
  it('should render the expected Community fields', async () => {
    // arrange
    const theme = createMuiTheme();
    const route = `${routes.communities.path}/${seedCommunity.slug}`;
    const tree = (
      <ThemeProvider theme={theme}>
        <CommunityDetail />
      </ThemeProvider>
    );

    // act
    render(tree, { route });

    // assert
    await screen.findByText(seedCommunity.name);
    screen.getByText(seedCommunity.location);
    screen.getByText(seedCommunity.description);

    seedCommunity.socialPlatforms.forEach(platform => {
      expect(screen.getByLabelText(platform.name)).toHaveAttribute('href', platform.name.url);
    });

    seedCommunity.tags.forEach(tag => screen.getByText(tag));
  });
});
