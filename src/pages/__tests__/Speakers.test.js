import React from 'react';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import Speakers from '../Speakers';
import { render } from '../../utils/test.utilitiy';
import seedSpeakers from '../../mocks/seed/seedSpeakers';
import { server } from '../../mocks/server';

describe('Speakers', () => {
  it('should render loading then show speakers', async () => {
    // arrange
    // act
    render(<Speakers />);

    // assert
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await expect(await screen.findByText(seedSpeakers.speakers[0].name)).toBeInTheDocument();
  });

  it('should render the error', async () => {
    // arrange
    const errorHandler = async (req, res, ctx) =>
      res(ctx.status(500), ctx.json('errorMessageValue'));
    server.use(rest.get('*/Speakers', errorHandler));

    // act
    render(<Speakers />);

    // assert
    await expect(await screen.findByTestId('snackError')).toContainHTML('errorMessageValue');
  });
});
