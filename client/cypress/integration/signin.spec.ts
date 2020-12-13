describe('승객 로그인 페이지 테스트', () => {
  before(() => {
    cy.visit('/user');
    cy.clearCookies();
    cy.wait(3000);
  });

  it('회원가입 버튼을 클릭한다', () => {
    cy.get("[data-test-id='sign-up-btn']").click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/user/signup`);
  });

  it('로그인 버튼을 클릭한다', () => {
    cy.go('back');
    cy.get("[data-test-id='sign-in-btn']").click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/user/signin`);
  });

  it('잘못된 아이디 비밀번호를 입력하면 로그인에 실패한다.', () => {
    cy.get("[data-test-id='id-input']").clear().type(Cypress.env('user_id'));
    cy.get("[data-test-id='pw-input']")
      .clear()
      .type(Cypress.env('user_pw') + 's');

    const stub = cy.stub();

    cy.on('window:alert', stub);

    cy.get('a')
      .contains('로그인')
      .click()
      .then(() => {
        cy.wait(1000);
      })
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('잘못된 비밀번호입니다.');
      });
  });

  it('올바른 아이디 비밀번호를 입력하면 로그인에 성공한다.', () => {
    cy.get("[data-test-id='id-input']").clear().type(Cypress.env('user_id'));
    cy.get("[data-test-id='pw-input']").clear().type(Cypress.env('user_pw'));
    cy.get('a').contains('로그인').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/user/map`);
  });
});
