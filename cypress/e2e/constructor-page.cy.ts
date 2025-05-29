const selectors = {
    burger: {
        ctor: {
            top: '[data-cy="burger_constructor_top"]',
            empty_top: '[data-cy="burger_constructor_empty_top"]',
            bottom: '[data-cy="burger_constructor_bottom"]',
            empty_bottom: '[data-cy="burger_constructor_empty_bottom"]',
            root: '[data-cy="burger_constructor_root"]',
            submit_button: '[data-cy="burger_constructor_submit"]',
        },
        bun: '[data-cy="burger_ingredient"]',
        bun_add: '[data-cy="burger_ingredient"] > button',
        ingredient: '[data-cy="burger_ingredient"]:nth-of-type(3)',
        ingredient_add: '[data-cy="burger_ingredient"]:nth-of-type(3) > button',
    },
    modal: {
        self: '[data-cy="modal"]',
        closeButton: '[data-cy="modal_close_button"]',
    },
    modalOverlay: {
        self: '[data-cy="modal_overlay"]',
    },
    ingredientDetails: {
        self: '[data-cy="ingredientDetails"]',
    },
    orderDetails: {
        orderNumber: '[data-cy="order_details_order_number"]',
    },
} as const

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'mockedRefreshToken')
    cy.setCookie('accessToken', 'mockedAccessToken')

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
        'getIngredients'
    )
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('getUser')

    cy.visit('/')

    cy.wait('@getIngredients')
    cy.wait('@getUser')
})

afterEach(() => {
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

it('should add ingredients to burger', () => {
    cy.get(selectors.burger.ctor.empty_top).should('exist')
    cy.get(selectors.burger.ctor.empty_bottom).should('exist')
    cy.get(selectors.burger.ctor.root).should('not.exist')

    cy.get(selectors.burger.bun_add).first().should('exist').click()
    cy.get(selectors.burger.ingredient_add)
        .first()
        .should('exist')
        .click()

    cy.get(selectors.burger.ctor.top).should('exist')
    cy.get(selectors.burger.ctor.bottom).should('exist')
    cy.get(selectors.burger.ctor.root).should('exist')
})

describe('toggle modal', () => {
    it('using overlay click', () => {
        cy.get(selectors.modal.self).should('not.exist')
        cy.get(selectors.burger.bun).first().should('exist').click()

        cy.get(selectors.modal.self).should('be.visible')

        cy.get(selectors.modalOverlay.self).should('exist').click({ force: true })

        cy.get(selectors.modal.self).should('not.exist')
        cy.get(selectors.modalOverlay.self).should('not.exist')
    })

    it('using close button', () => {
        cy.get(selectors.modal.self).should('not.exist')
        cy.get(selectors.burger.bun).first().should('exist').click()

        cy.get(selectors.modal.self).should('be.visible')

        cy.get(selectors.modal.closeButton).click()

        cy.get(selectors.modal.self).should('not.exist')
    })
})

it('should create order', () => {
    cy.get(selectors.burger.bun_add).first().should('exist').click()
    cy.get(selectors.burger.ingredient_add)
        .first()
        .should('exist')
        .click()

    cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('order')

    cy.get(selectors.burger.ctor.submit_button).click()

    cy.wait('@order')

    cy.fixture('order').then((newOrder) => {
        cy.get(selectors.orderDetails.orderNumber).contains(
            newOrder.order.number
        )
    })
})
