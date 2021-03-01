import { rest } from 'msw';
import seedCommunities from './seed/seedCommunities';
import seedCommunity from './seed/seedCommunity';
import seedConference from './seed/seedConference';
import seedSpeakers from './seed/seedSpeakers';
import seedSpeaker from './seed/seedSpeaker';
import seedConferences from './seed/seedConferences';
import seedStatisticsCount from './seed/seedStatisticsCount';

const presentationsHandler = (req, res, ctx) => res(ctx.json([]));
const statisticsHandler = (req, res, ctx) => res(ctx.json(seedStatisticsCount));

const communitiesHandler = (req, res, ctx) => res(ctx.json(seedCommunities));
const communityHandler = (req, res, ctx) => res(ctx.json(seedCommunity));

const conferencesHandler = (req, res, ctx) => res(ctx.json(seedConferences));
const conferenceHandler = (req, res, ctx) => res(ctx.json(seedConference));
const featuredConferenceHandler = (req, res, ctx) => res(ctx.json([]));

const speakersHandler = (req, res, ctx) => res(ctx.json(seedSpeakers));
const speakerHandler = (req, res, ctx) => res(ctx.json(seedSpeaker));
const featuredSpeakerHandler = (req, res, ctx) => res(ctx.json([]));

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('*/Statistics/Counts', statisticsHandler),
  rest.get('*/Speakers/idValue/Presentations', presentationsHandler),

  rest.get('*/Communities', communitiesHandler),
  rest.get(`*/Communities/:slug`, communityHandler),

  rest.get(`*/Conferences`, conferencesHandler),
  rest.get(`*/Conferences/:conferenceId`, conferenceHandler),
  rest.get(`*/Conferences/Featured`, featuredConferenceHandler),

  rest.get(`*/Speakers`, speakersHandler),
  rest.get(`*/Speakers/:slug`, speakerHandler),
  rest.get(`*/Speakers/Featured`, featuredSpeakerHandler),
];
