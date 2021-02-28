import React from 'react';
import { screen } from '@testing-library/react';
import Speakers from '../Speakers';
import * as useSpeakersHook from '../../hooks/useSpeakers';
import { render } from '../../utils/test.utilitiy';
import seedSpeakers from '../../mocks/seed/seedSpeakers';
import routes from '../../constants/routes';

describe('Speakers', () => {
  it('should render loading then show speakers', async () => {
    // arrange
    const route = `${routes.speakers.path}/${seedSpeakers.speakers[0].slug}`;

    // act
    render(<Speakers />, { route });

    // assert
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await expect(await screen.findByText(seedSpeakers.speakers[0].name)).toBeInTheDocument();
  });

  it('should render the error', () => {
    // arrange
    const hook = {
      speakers: [],
      error: {
        message: 'errorMessage',
      },
      isLoaded: true,
    };
    jest.spyOn(useSpeakersHook, 'default').mockImplementationOnce(() => hook);

    // act
    const { getByTestId } = render(<Speakers />);

    // assert
    expect(getByTestId('snackError')).toContainHTML(hook.error.message);
  });
});
