import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import Blog from './Blog';

test('<Blog /> renders content', () => {
  const user = {
    username: 'nicklatcham',
    name: 'Nick Latcham',
    id: '5f9d4a3b1c9d440000b6d9b5',
  };

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Vitest',
    url: 'vitest.dev',
    name: 'Vitest',
    user: {
      ...user,
    },
  };

  const { container } = render(<Blog blog={blog} user={user} />);

  const title = screen.findByText(
    'Component testing is done with react-testing-library'
  );
  expect(title).toBeDefined();

  const author = screen.findByText('Vitest');
  expect(author).toBeDefined();

  const togglable = container.querySelector('.togglable');
  expect(togglable).not.toBeVisible();
  screen.debug(container);
});
