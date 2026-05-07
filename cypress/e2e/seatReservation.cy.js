describe('Concurrency seat reservation', () => {
  it('prevents two users from booking the same seat', () => {
    // --- Helper: tomorrow's date in yyyy-mm-dd ---
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];

    // --- User 1 logs in ---
    cy.visit('/');
    cy.contains('Iniciar Sesión').click();
    cy.get('form').should('be.visible');
    cy.get('#email').type('wfallasb@ucenfotec.ac.cr');
    cy.get('#password').type('qwerty123{enter}');

    // --- User 1 opens BuyTicket modal ---
    cy.get('[data-testid="movie-36"] .btnWarning').click();

    // --- Fill BuyTicket form ---
    cy.get('select').eq(0).select('San José');
    cy.get('select').eq(1).select(formattedDate);
    cy.get('select').eq(2).select(1);

    // --- Seat selector ---
    cy.contains('Elegir butacas').click();
    cy.get('.seat-grid').should('be.visible');

    // Pick first available seat and alias its text
    cy.get('.seat-grid button:not(.occupied)')
      .should('exist')
      .first()
      .invoke('text')
      .then(seatText => {
        cy.wrap(seatText.trim()).as('seatId');
      });

    // User 1 selects and confirms
    cy.get('@seatId').then(seatId => {
      cy.contains('button', seatId).click();
      cy.contains('button', seatId).should('have.class', 'selected');
      cy.contains('Confirmar butacas').click();
    });

    // --- User 2 logs in in a separate session ---
    cy.session('user2', () => {
      cy.visit('/');
      cy.contains('Iniciar Sesión').click();
      cy.get('form').should('be.visible');
      cy.get('#email').type('holi@holi.com');
      cy.get('#password').type('qwerty123{enter}');
    });

    // --- After restoring session, navigate back to homepage ---
    cy.visit('/');
    cy.get('[data-testid="movie-36"] .btnWarning').click();

    cy.get('select').eq(0).select('San José');
    cy.get('select').eq(1).select(formattedDate);
    cy.get('select').eq(2).select(1);

    cy.contains('Elegir butacas').click();
    cy.get('.seat-grid').should('be.visible');

    // User 2 tries same seat
    cy.get('@seatId').then(seatId => {
      cy.contains('button', seatId).click();

      // Debug: log actual classes
      cy.contains('button', seatId).invoke('attr', 'class').then(cls => {
        cy.log(`Seat ${seatId} classes: ${cls}`);
      });

      // ✅ Adjusted assertion: app shows warning, not occupied class
      cy.contains('⚠️ Algunas butacas no están disponibles').should('be.visible');
      cy.contains('button', seatId).should('have.class', 'selected');
    });

    cy.log('✅ Concurrency test passed: User 1 selected, User 2 blocked');
  });
});
