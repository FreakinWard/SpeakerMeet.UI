import { rest } from 'msw';
import { mockCommunities } from './requests';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('https://mockUrl.com/api/Communities', (req, res, ctx) =>
    res(ctx.json(mockCommunities)),
  ),
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
