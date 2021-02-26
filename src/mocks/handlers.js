import { rest } from 'msw';
import seedCommunities from './seed/seedCommunities';
import seedCommunity from './seed/seedCommunity';

const communitiesHandler = (req, res, ctx) => res(ctx.json(seedCommunities));
const communityHandler = (req, res, ctx) => res(ctx.json(seedCommunity));
// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('*/Communities', communitiesHandler),
  rest.get(`*/Communities/:slug`, communityHandler),
];
