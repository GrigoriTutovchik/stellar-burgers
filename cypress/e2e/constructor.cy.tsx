describe('Добавление ингредиента в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1440, 800);
    cy.visit('');
  });
  it('Добавление булки в контенер', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-top]').contains('bun 1').should('exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains('bun 1')
      .should('exist');
  });
});

describe('работа модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1440, 800);
    cy.visit('');
  });
  it('открыть модальное окно', () => {
    cy.contains('bun 1').click();
    cy.contains('bun 1').should('exist');
  });
  it('закрыть модальное окно на крестик', () => {
    cy.contains('bun 1').click();
    cy.contains('bun 1').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('закрыть модальное окно на оверлей', function () {
    cy.contains('bun 1').click();
    cy.contains('bun 1').should('exist');
    cy.get('[data-cy=overlay]').click('left', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post-order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem('refreshToken', JSON.stringify('testToken'));
    cy.setCookie('accessToken', 'testToken');
    cy.viewport(1440, 800);
    cy.visit('');
  });

  it('Добавление ингредиентов и создание заказа', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order-button]').click();

    cy.get('[data-cy=order-number]').contains('123456').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor-ingredients]')
      .contains('bun 1')
      .should('not.exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('main 1')
      .should('not.exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('sauce 1')
      .should('not.exist');
  });
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
