import { rest } from 'msw';

const mockCommunities = {
  communities: [
    {
      id: 'idValue1',
      name: 'nameValue1',
      slug: 'slug-value-1',
      location: 'locationValue1',
      description: 'descriptionValue1',
      path: 'pathValue1',
    },
    {
      id: 'idValue2',
      name: 'nameValue2',
      slug: 'slug-value-2',
      location: 'locationValue2',
      description: 'descriptionValue2',
      path: 'pathValue2',
    },
  ],
};

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
