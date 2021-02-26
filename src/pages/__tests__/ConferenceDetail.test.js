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

    // const conference = {
    //   id: 'idValue',
    //   name: 'nameValue1',
    //   slug: 'slugValue1',
    //   location: 'locationValue1',
    //   description: 'descriptionValue1',
    //   path: 'pathValue1',
    //   tags: ['tag1', 'tag2'],
    //   socialPlatforms: [{ name: 'platform', url: 'platformUrl' }],
    // };

    const conferenceResponseMock = Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(seedConference),
    });
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => conferenceResponseMock);

    const conferencesFeatured = [];
    const conferencesFeaturedResponseMock = Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(conferencesFeatured),
    });
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => conferencesFeaturedResponseMock);

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
