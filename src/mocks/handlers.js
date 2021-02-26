import { rest } from 'msw';
// import seedCommunities from './seed/seedCommunities';
import seedCommunity from './seed/seedCommunity';

// const communitiesHandler = (req, res, ctx) => res(ctx.json(seedCommunities));
const communityHandler = (req, res, ctx) => res(ctx.json(seedCommunity));
// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  // rest.get('*/Communities', communitiesHandler),
  rest.get(`*/Communities/:slug`, communityHandler),
  rest.post('/login', (req, res, ctx) => {
    const { username } = req.body;

    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        username,
        firstName: 'John',
        lastName: 'Maverick',
      }),
    );
  }),
];
