describe('Blog App', () => {
  beforeEach(function () {
    cy.visit('');
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      username: 'testing',
      password: 'testing',
      name: 'testing',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
  });
  it('Login form is shown', function () {
    cy.contains('Blogs');
    cy.contains('Please Login');
    cy.get('form').should('contain', 'Username').and('contain', 'Password');
    cy.get('button').contains(/Login/);
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testing');
      cy.get('#password').type('testing');
      cy.get('button').click();
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('creds');
      cy.get('button').click();

      cy.get('.error')
        .should('contain', 'Invalid Username or Password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testing', password: 'testing' });
    });

    it('a blog can be created', function () {
      cy.get('button').contains('New Blog').click();
      cy.get('#title').type('Testing Title');
      cy.get('#author').type('The Testing Dude');
      cy.get('#url').type('nicklatcham.dev');
      cy.get('button').contains('Create').click();

      cy.get('.notification')
        .should('contain', 'Testing Title by The Testing Dude has been added!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('.blog')
        .should('contain', 'Testing Title, The Testing Dude')
        .and('contain', 'View');
    });

    describe('once a blog is added', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'First Blog Guy',
          url: 'nicklatcham.dev',
          likes: 1,
        });
      });

      it('a blog can be expanded and liked', function () {
        cy.get('.blog').contains('View').click();
        cy.get('.likeButton').click();
        cy.get('#likes').contains(/1/);
      });
      it('a blog can be deleted by user who added it', function () {
        cy.get('.blog').contains('View').click();
        cy.get('#remove-button').click();

        cy.get('.notification')
          .should('contain', 'Succesfully removed')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid');
      });
      it('a blog CANNOT be deleted by a user who didnt add it', function () {
        cy.get('header').find('button').click();
        const user = {
          username: 'not',
          password: 'user',
          name: 'other',
        };
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
        cy.login({ username: 'not', password: 'user' });
        cy.get('.blog').contains('View').click();
        cy.get('.blog').should('not.contain', 'Remove');
      });
      describe('once multiple blogs are added', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'second blog',
            author: 'Second Blog Guy',
            url: 'nicklatcham.dev',
            likes: 2,
          });
          cy.createBlog({
            title: 'third blog',
            author: 'third Blog Guy',
            url: 'nicklatcham.dev',
            likes: 3,
          });
          cy.createBlog({
            title: 'fourth blog',
            author: 'fourth Blog Guy',
            url: 'nicklatcham.dev',
            likes: 4,
          });
        });
        it('there should be four total blogs ordered from most to least likes', function () {
          cy.get('#blog-list').children().should('have.length', 4);
          cy.get('.blog').eq(0).should('contain', 'fourth blog');
          cy.get('.blog').eq(1).should('contain', 'third blog');
          cy.get('.blog').eq(2).should('contain', 'second blog');
          cy.get('.blog').eq(3).should('contain', 'first blog');
        });

        it.only('as likes acumulate, blogs will reorder', function () {
          cy.get('.blog').contains('third').as('third');
          cy.get('@third').contains('View').click();
          cy.get('@third').parent('').contains('like').click();
          cy.wait(1000);
          cy.get('@third').parent('').contains('like').click();
          cy.wait(1000);
          cy.get('@third').parent('').contains('like').click();
          cy.visit('');
          cy.get('.blog').eq(0).should('contain', 'third blog');
        });
      });
    });
  });
});
