import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import blogService from '../services/blogs';
import Blog from './Blog';
import { user, blog } from '../mock/mockData';

//TODO: Fix this mess

describe('<Blog />', () => {
  vi.spyOn(blogService, 'update').mockResolvedValue({
    ...blog,
    likes: blog.likes + 1,
  });

  const setErrorMessage = vi.fn();

  it('renders content', async () => {
    await render(
      <Blog blog={blog} user={user} setErrorMessage={setErrorMessage} />
    );
    const title = screen.findByText(String(blog.title));
    const author = screen.findByText('Vitest');
    expect(setErrorMessage).not.toHaveBeenCalled();
    expect(title).toBeDefined();
    expect(author).toBeDefined();
  });

  it('does not show toggled content', () => {
    const { container } = render(
      <Blog blog={blog} user={user} setErrorMessage={setErrorMessage} />
    );
    const togglable = container.querySelector('.togglable');
    expect(setErrorMessage).not.toHaveBeenCalled();
    expect(togglable).not.toBeVisible();
  });

  it('shows togglable content with toggle button', async () => {
    const { container } = render(
      <Blog blog={blog} user={user} setErrorMessage={setErrorMessage} />
    );
    const button = container.querySelector('.toggleButton');

    await userEvent.click(button);

    const togglable = container.querySelector('.togglable');
    const url = screen.findByText('vitest.dev');
    const likes = screen.findByText('likes');

    expect(setErrorMessage).not.toHaveBeenCalled();
    expect(togglable).toBeVisible();
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  it('confirms like button is clicked two times', async () => {
    const { container } = render(
      <Blog blog={blog} user={user} setErrorMessage={setErrorMessage} />
    );
    const mockUpdateService = vi.spyOn(blogService, 'update');

    const button = container.querySelector('toggleButton');
    await userEvent.click(button);

    const likeButton = container.querySelector('.likeButton');
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(setErrorMessage).not.toHaveBeenCalled();
    expect(likeButton).toBeDefined();
    expect(mockUpdateService).toHaveBeenCalledTimes(2);
  });
});
