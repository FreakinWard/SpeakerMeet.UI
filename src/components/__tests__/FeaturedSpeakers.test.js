import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FeaturedSpeakers from '../FeaturedSpeakers';
import * as useSpeakersFeatured from '../../hooks/useSpeakersFeatured';
import seedSpeaker from '../../mocks/seed/seedSpeaker';

describe('FeaturedSpeakers', () => {
  const tree = (
    <BrowserRouter>
      <FeaturedSpeakers />
    </BrowserRouter>
  );

  it('should notify user of loading', () => {
    // arrange
    const useSpeakersFeaturedMock = () => ({
      error: null,
      isLoaded: false,
      speakers: [],
    });
    jest.spyOn(useSpeakersFeatured, 'default').mockImplementationOnce(useSpeakersFeaturedMock);

    // act
    const { getByTestId } = render(tree);

    // assert
    getByTestId('loading');
  });

  it('should render expected speaker fields', () => {
    // arrange
    const speakers = [seedSpeaker];

    const useSpeakersFeaturedMock = () => ({
      error: null,
      isLoaded: true,
      speakers,
    });
    jest.spyOn(useSpeakersFeatured, 'default').mockImplementationOnce(useSpeakersFeaturedMock);

    // act
    const { getByText } = render(tree);

    // assert
    getByText(seedSpeaker.name);
  });

  it('should alert of error', () => {
    // arrange
    const error = new Error('error message');

    const useSpeakersFeaturedMock = () => ({
      error,
      isLoaded: true,
      speakers: [],
    });
    jest.spyOn(useSpeakersFeatured, 'default').mockImplementationOnce(useSpeakersFeaturedMock);

    // act
    const { getByTestId } = render(tree);

    // assert
    expect(getByTestId('snackError')).toContainHTML(error.message);
  });
});
