import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { describe, vi } from 'vitest';
import { user } from '../mock/mockData';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('updates parents state and calls on submit', async () => {
    const createBlog = vi.fn();
    const setNotification = vi.fn();

    render(
      <BlogForm
        createBlog={createBlog}
        user={user}
        setNotification={setNotification}
      />
    );

    const titleInput = screen.getByLabelText('Title:');
    const authorInput = screen.getByLabelText('Author:');
    const urlInput = screen.getByLabelText('URL:');
    const createButton = screen.getByText('Create');

    await userEvent.type(titleInput, 'testing a form...');
    await userEvent.type(authorInput, 'vitest');
    await userEvent.type(urlInput, 'vitest.dev');
    await userEvent.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...');
    expect(createBlog.mock.calls[0][0].author).toBe('vitest');
    expect(createBlog.mock.calls[0][0].url).toBe('vitest.dev');

    screen.debug();
  });
});
