import React from 'react';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorSnackbar from './ErrorSnackbar';
import FeaturedPost from './FeaturedPost';
import useCommunitiesFeatured from '../hooks/useCommunitiesFeatured';

export default function FeaturedCommunities() {
  const { error, isLoaded, communities } = useCommunitiesFeatured();

  return (
    <>
      <Typography variant="h4" style={{ padding: 24 }}>
        Featured Communities
      </Typography>

      <ErrorSnackbar error={error} />

      <Grid container spacing={4}>
        {!isLoaded ? (
          <Grid item xs={12} md={12}>
            <CircularProgress data-testid="loading" style={{ align: 'center' }} />
          </Grid>
        ) : (
          communities.map(post => (
            <Grid item key={post.name} xs={12} sm={6} md={3} lg={3}>
              <FeaturedPost post={post} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
