import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { BrowserRouter as Router } from 'react-router-dom';
import Photos, { photosUrl, loading } from './Photos';

const photosResponse = rest.get(photosUrl, (req, res, ctx) => {
  return res(
    ctx.json([
      {
        id: 1,
        title: 'test',
        url: 'https://via.placeholder.com/test',
        thumbnailUrl: 'https://via.placeholder.com/test',
      },
      {
        id: 2,
        title: 'test2',
        url: 'https://via.placeholder.com/test2',
        thumbnailUrl: 'https://via.placeholder.com/test2',
      },
    ]),
  );
});

const server = new setupServer(photosResponse);

beforeAll(() => {
  server.listen();
});
beforeEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('api tests', () => {
  test('should fetch photos correctly', async () => {
    render(
      <Router>
        <Photos />
      </Router>,
    );
    const photoTitleItem = await screen.findByText('test');
    expect(photoTitleItem).toBeVisible();
  });
  test('should render 2 images', async () => {
    render(
      <Router>
        <Photos />
      </Router>,
    );
    const images = await screen.findAllByRole('img');
    expect(images.length).toBe(2);
  });
  test('should show image titles', async () => {
    render(
      <Router>
        <Photos />
      </Router>,
    );
    const imageTitleOne = await screen.findByText('test');
    const imageTitleTwo = await screen.findByText('test2');
    expect(imageTitleOne).toBeVisible();
    expect(imageTitleTwo).toBeVisible();
  });
  test('should call setLoading when the Photos component is mounted', () => {
    const setLoading = jest.fn();
    const handleState = jest.spyOn(React, 'useState');
    handleState.mockImplementation((loading) => [loading, setLoading]);
    expect(setLoading).not.toBeCalled();

    render(
      <Router>
        <Photos />
      </Router>,
    );

    expect(setLoading).toBeCalled();
  });
});
