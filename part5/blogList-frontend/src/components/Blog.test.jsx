import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import blogService from '../services/blogs';
import Blog from './Blog';

//TODO: Fix this mess

describe('<Blog />', () => {
  const user = {
    username: 'vitest',
    name: 'Vitest',
    id: '5f9d4a3b2a7b1f1f1c1f1f1f',
  };

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Vitest',
    url: 'vitest.dev',
    name: 'Vitest',
    likes: 1,
    user: {
      ...user,
    },
  };

  vi.spyOn(blogService, 'update').mockResolvedValue({
    ...blog,
    likes: blog.likes + 1,
  });

  const setErrorMessage = () => {
    console.log(null);
  };

  test('renders content', () => {
    render(<Blog blog={blog} user={user} />);

    const title = screen.findByText(
      'Component testing is done with react-testing-library'
    );
    expect(title).toBeDefined();

    const author = screen.findByText('Vitest');
    expect(author).toBeDefined();
  });

  test('does not show toggled content', () => {
    const { container } = render(<Blog blog={blog} user={user} />);

    const togglable = container.querySelector('.togglable');
    expect(togglable).not.toBeVisible();
  });

  test('shows togglable content with toggle button', async () => {
    const { container } = render(<Blog blog={blog} user={user} />);
    const button = container.querySelector('.toggleButton');

    await userEvent.click(button);

    const togglable = container.querySelector('.togglable');
    expect(togglable).toBeVisible();

    const url = screen.findByText('vitest.dev');
    expect(url).toBeDefined();

    const likes = screen.findByText('likes');
    expect(likes).toBeDefined();
  });

  test('likes button is clicked two times', async () => {
    const { container } = render(
      <Blog blog={blog} user={user} setErrorMessage={setErrorMessage} />
    );
    const mockUpdateService = vi.spyOn(blogService, 'update');

    const button = container.querySelector('toggleButton');
    await userEvent.click(button);

    const likeButton = container.querySelector('.likeButton');
    expect(likeButton).toBeDefined();

    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(mockUpdateService).toHaveBeenCalledTimes(2);

    screen.debug();
  });
});
