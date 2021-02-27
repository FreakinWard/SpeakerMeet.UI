import { rest } from 'msw';
import seedCommunities from './seed/seedCommunities';
import seedCommunity from './seed/seedCommunity';
import seedConference from './seed/seedConference';
import seedSpeaker from './seed/seedSpeaker';

const communitiesHandler = (req, res, ctx) => res(ctx.json(seedCommunities));
const communityHandler = (req, res, ctx) => res(ctx.json(seedCommunity));

const conferenceHandler = (req, res, ctx) => res(ctx.json(seedConference));
const featuredConferenceHandler = (req, res, ctx) => res(ctx.json([]));

const speakerHandler = (req, res, ctx) => res(ctx.json(seedSpeaker));
const featuredSpeakerHandler = (req, res, ctx) => res(ctx.json([]));

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('*/Communities', communitiesHandler),
  rest.get(`*/Communities/:slug`, communityHandler),
  rest.get(`*/Conferences/:conferenceId`, conferenceHandler),
  rest.get(`*/Conferences/Featured`, featuredConferenceHandler),
  rest.get(`*/Speakers/:slug`, speakerHandler),
  rest.get(`*/Speakers/Featured`, featuredSpeakerHandler),
];
