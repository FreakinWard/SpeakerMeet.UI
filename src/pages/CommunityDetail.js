import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Disqus from 'disqus-react';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import FeaturedPost from '../components/FeaturedPost';
import BreadCrumbs from '../components/BreadCrumbs';
import FindA from '../components/FindA';
import DetailTabs from '../components/DetailTabs';
import FeaturedCommunities from '../components/FeaturedCommunities';
import config from '../constants/config';
import endpoints from '../constants/endpoints';
import routes from '../constants/routes';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CommunityDetail() {
  const { slug } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [community, setCommunity] = useState(null);
  const disqusShortname = config.disqusShortName;
  const disqusConfig = {
    url: config.url,
    identifier: slug,
    title: slug,
  };

  useEffect(() => {
    (async () => {
      fetch(`${endpoints.communityDetail}/${slug}`)
        .then(res => res.json())
        .then(
          result => {
            setCommunity(result);
            setLoaded(true);
          },
          e => {
            setError(e);
            setLoaded(true);
          },
        );
    })();
  }, [slug]);

  if (error) {
    return (
      <Snackbar open autoHideDuration={6000}>
        <Alert severity="error">
          Error:
          {error.message}
        </Alert>
      </Snackbar>
    );
  }
  return (
    <>
      <FindA text="Community" />

      <Container maxWidth="lg" style={{ padding: 24, minHeight: '100vh' }}>
        {!isLoaded ? (
          <CircularProgress />
        ) : (
          <>
            <BreadCrumbs />
            <Grid container spacing={4}>
              <Grid item xs={12} style={{ marginBottom: 48 }}>
                <FeaturedPost
                  key={community.name}
                  post={{
                    ...community,
                    path: `${routes.communities.path}/${community.slug}`,
                  }}
                />
                <Chip size="small" label=".net" />
                <Chip size="small" label="tdd" />
                <Chip size="small" label="agile" />
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ marginBottom: 48 }}>
              <DetailTabs rows={rows} />
            </Grid>

            <Grid item xs={12} style={{ marginBottom: 64 }}>
              <Typography variant="h4" style={{ padding: 24 }}>
                Comments
              </Typography>

              <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </Grid>

            <FeaturedCommunities />
          </>
        )}
      </Container>
    </>
  );
}
