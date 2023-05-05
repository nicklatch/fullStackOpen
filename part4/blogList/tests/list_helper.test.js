const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('Total Likes', () => {
  const emptyList = [];
  const biggerList = listHelper.biggerList;
  const listWithOneBlog = listHelper.listWithOneBlog;

  test('should equal zero, as it\'s empty', () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });

  test('should only equal the likes from the single blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(7);
  });

  test('should equal the sum of all biggerList object\'s likes', () => {
    const result = listHelper.totalLikes(biggerList);
    expect(result).toBe(29);
  });
});
