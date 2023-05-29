export const user = {
  username: 'vitest',
  name: 'Vitest',
  id: '5f9d4a3b2a7b1f1f1c1f1f1f',
};

export const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Vitest',
  url: 'vitest.dev',
  name: 'Vitest',
  likes: 1,
  user: {
    ...user,
  },
};
