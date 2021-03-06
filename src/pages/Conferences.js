import { CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import FindABanner from '../components/FindABanner';
import ResultList from '../components/ResultList';
import useConferences from '../hooks/useConferences';

export default function Conferences() {
  const { error, isLoaded, conferences } = useConferences();

  return (
    <>
      <Helmet>
        <title>SpeakerMeet | Conferences</title>
      </Helmet>

      <FindABanner text="Conference" />

      <Container maxWidth="lg" style={{ padding: 24, minHeight: '100vh' }}>
        {!isLoaded ? <CircularProgress /> : <ResultList data={conferences} />}
      </Container>

      <ErrorSnackbar error={error} />
    </>
  );
}
