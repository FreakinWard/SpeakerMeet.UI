import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HomeHeroSection from '../components/HomeHeroSection';
import FeaturedPost from '../components/FeaturedPost';
import speakers from '../constants/speakers';
import FindASpeaker from '../components/FindASpeaker';

const useStyles = makeStyles(theme => ({
  howItWorks: {
    fontSize: 35,
    marginBottom: theme.spacing(4),
    textTransform: 'uppercase',
    letterSpacing: 0,
    fontWeight: 400,
  },
  howItWorksIcons: {
    fontSize: 40,
    color: theme.palette.primary.main,
    verticalAlign: 'bottom',
    marginRight: 6,
  },
  findASpeaker: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
    color: 'white',
  },
}));

const mainFeaturedPost = {
  title: 'Speaker and Conference',
  description: "Find out why SpeakerMeet is the best speaker's resource on the web!",
  image: `${process.env.PUBLIC_URL}/images/hero-speaker.jpg`,
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <HomeHeroSection post={mainFeaturedPost} />
      <Container maxWidth="lg" style={{ padding: 24 }}>
        <Typography variant="h2" gutterBottom className={classes.howItWorks}>
          How It Works
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} align="left">
            <Typography variant="h4" align="left">
              <SearchIcon className={classes.howItWorksIcons} />
              Find
            </Typography>
            <Typography variant="h6" gutterBottom>
              The Industry&apos;s Directory
            </Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry’s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} align="left">
            <Typography variant="h4" align="left">
              <GroupAddIcon className={classes.howItWorksIcons} />
              Connect
            </Typography>
            <Typography variant="h6" gutterBottom>
              Easy Interaction
            </Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry’s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} align="left">
            <Typography variant="h4" align="left">
              <RecordVoiceOverIcon className={classes.howItWorksIcons} />
              Book
            </Typography>
            <Typography variant="h6" gutterBottom>
              Speakers and Conferences
            </Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry’s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <FindASpeaker />

      <Container maxWidth="lg" style={{ padding: 24 }}>
        <Typography variant="h4" style={{ padding: 24 }}>
          Featured Speakers
        </Typography>

        {/*
          // todo: extract component
        */}
        <Grid container spacing={4}>
          {speakers.map(post => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
      </Container>
    </>
  );
}