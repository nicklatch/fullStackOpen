Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
    name,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogUser', JSON.stringify(body));
    cy.visit('http://localhost:5173/');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    body: {
      title,
      author,
      url,
      likes,
    },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedBlogUser')).token
      }`,
    },
  });
  cy.visit('http://localhost:5173/');
});
