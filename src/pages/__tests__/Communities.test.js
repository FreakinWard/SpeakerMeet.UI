import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { act, screen } from '@testing-library/react';
import { render } from '../../utils/test.utilitiy';
import Communities from '../Communities';
import * as useCommunities from '../../hooks/useCommunities';
import seedCommunities from '../../mocks/seed/seedCommunities';

describe('Communities', () => {
  const tree = (
    <HelmetProvider>
      <Communities />
    </HelmetProvider>
  );

  it('should render expected fields from list of returned communities', async () => {
    // arrange
    const { communities } = seedCommunities;

    // act
    await act(async () => render(tree));

    // assert
    screen.getByText('Find a Community');

    // TODO: await for the first community to appear before looping thru all communities details
    await expect(await screen.findByText(communities[0].name)).toBeInTheDocument();

    communities.forEach(community => {
      expect(screen.getByText(community.name)).toBeInTheDocument();
      expect(screen.getByText(community.location)).toBeInTheDocument();
      expect(screen.getByText(community.description)).toBeInTheDocument();
    });
  });

  it('should render error message from failed fetch', async () => {
    // arrange
    const errorMock = new Error('errorMessageValue');
    const useCommunitiesMock = () => ({
      error: errorMock,
      isLoaded: true,
      communities: [],
    });
    jest.spyOn(useCommunities, 'default').mockImplementationOnce(useCommunitiesMock);
    // TODO: make worksy
    // const mockCommunitiesError = async (req, res, ctx) =>
    //   res(ctx.status(500), ctx.json({ message: 'errorMessageValue' }));
    // server.use(rest.get('*/Communities', mockCommunitiesError));

    // act
    await act(async () => render(tree));

    // assert
    screen.getByText(/\berrorMessageValue\b/);
  });
});
