import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../mocks/server';
import { render } from '../../utils/test.utilitiy';
import Conferences from '../Conferences';
import seedConferences from '../../mocks/seed/seedConferences';

describe('Conferences', () => {
  const tree = (
    <HelmetProvider>
      <Conferences />
    </HelmetProvider>
  );

  it('should render expected fields from list of returned conferences', async () => {
    // arrange
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
    const errorHandler = async (req, res, ctx) =>
      res(ctx.status(500), ctx.json('errorMessageValue'));
    server.use(rest.get('*/Conferences', errorHandler));

    // act
    render(tree);

    // assert
    await expect(await screen.findByTestId('snackError')).toContainHTML('errorMessageValue');
  });
});
