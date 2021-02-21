import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { act, screen } from '@testing-library/react';
import { render } from '../../utils/test.utilitiy';
import Communities from '../Communities';

describe('Communities', () => {
  const tree = (
    <HelmetProvider>
      <Communities />
    </HelmetProvider>
  );

  it('should render expected fields from list of returned communities', async () => {
    // arrange
    // act
    await act(async () => render(tree));

    // assert
    screen.getByText('Find a Community');

    expect(await screen.findByText('nameValue1')).toBeInTheDocument();
    // communities.forEach(community => {
    //   screen.getByText(community.name);
    //   screen.getByText(community.location);
    //   screen.getByText(community.description);
    // });
  });

  it.skip('should render error message from failed fetch', async () => {
    // arrange
    // const errorMock = new Error('errorMessageValue');
    // const useCommunitiesMock = () => ({
    //   error: errorMock,
    //   isLoaded: true,
    //   communities: [],
    // });
    // jest.spyOn(useCommunities, 'default').mockImplementationOnce(useCommunitiesMock);

    // act
    await act(async () => render(tree));

    // assert
    screen.getByText(/\berrorMessageValue\b/);
  });
});
