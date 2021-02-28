import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../mocks/server';
import { render } from '../../utils/test.utilitiy';
import Communities from '../Communities';
import seedCommunities from '../../mocks/seed/seedCommunities';
import routes from '../../constants/routes';

describe('Communities', () => {
  const tree = (
    <HelmetProvider>
      <Communities />
    </HelmetProvider>
  );

  it('should render expected fields from list of returned communities', async () => {
    // arrange
    const { communities } = seedCommunities;
    const route = `${routes.communities.path}/${seedCommunities.communities[0].slug}`;

    // act
    render(tree, { route });

    // assert
    screen.getByText('Find a Community');

    await expect(await screen.findByText(communities[0].name)).toBeInTheDocument();

    communities.forEach(community => {
      expect(screen.getByText(community.name)).toBeInTheDocument();
      expect(screen.getByText(community.location)).toBeInTheDocument();
      expect(screen.getByText(community.description)).toBeInTheDocument();
    });
  });

  it('should render error message from failed fetch', async () => {
    // arrange
    const errorHandler = async (req, res, ctx) =>
      res(ctx.status(500), ctx.json('errorMessageValue'));
    server.use(rest.get('*/Communities', errorHandler));

    // act
    render(tree);

    // assert
    await expect(await screen.findByTestId('snackError')).toContainHTML('errorMessageValue');
  });
});
