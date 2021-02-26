import { rest } from 'msw';
import seedCommunities from './seed/seedCommunities';
import seedCommunity from './seed/seedCommunity';
import seedConference from './seed/seedConference';

const communitiesHandler = (req, res, ctx) => res(ctx.json(seedCommunities));
const communityHandler = (req, res, ctx) => res(ctx.json(seedCommunity));
const conferenceHandler = (req, res, ctx) => res(ctx.json(seedConference));

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('*/Communities', communitiesHandler),
  rest.get(`*/Communities/:slug`, communityHandler),
  rest.get(`*/Conferences/:conferenceId`, conferenceHandler),
];
