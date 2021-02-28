import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { act, screen } from '@testing-library/react';
import { render } from '../../utils/test.utilitiy';
import Conferences from '../Conferences';
import * as useConferences from '../../hooks/useConferences';
import seedConferences from '../../mocks/seed/seedConferences';

describe('Conferences', () => {
  it('should render expected fields from list of returned conferences', async () => {
    // arrange
    const tree = (
      <HelmetProvider>
        <Conferences />
      </HelmetProvider>
    );

    // act
    render(tree);

    // assert
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await expect(await screen.findByText(seedConferences.conferences[0].name)).toBeInTheDocument();

    seedConferences.conferences.forEach(conference => {
      screen.getByText(conference.name);
      screen.getByText(conference.location);
      screen.getByText(conference.description);
    });
  });

  it('should render error message from failed fetch', async () => {
    // arrange
    const error = new Error('errorMessageValue');
    const useConferencesHook = () => ({
      error,
      isLoaded: true,
      conferences: seedConferences.conferences,
    });
    jest.spyOn(useConferences, 'default').mockImplementationOnce(useConferencesHook);

    const tree = (
      <HelmetProvider>
        <Conferences />
      </HelmetProvider>
    );

    // act
    await act(async () => render(tree));

    // assert
    screen.getByText(/\berrorMessageValue\b/);
  });
});
