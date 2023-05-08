const listHelper = require('../utils/list_helper');

describe('Dummy', () => {
  test('should returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('Total Likes', () => {
  test("should equal zero, as it's empty", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('should only equal the likes from the single blog', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog);
    expect(result).toBe(7);
  });

  test("should equal the sum of all biggerList object's likes", () => {
    const result = listHelper.totalLikes(listHelper.biggerList);
    expect(result).toBe(29);
  });
});

describe('Most Likes', () => {
  test('should return blog with most likes', () => {
    const result = listHelper.favoriteBlog(listHelper.biggerList);
    expect(result).toEqual(listHelper.biggerList[1]);
  });
});
