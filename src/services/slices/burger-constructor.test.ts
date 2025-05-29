import {
    MOCK_CTOR_BUN,
    MOCK_CTOR_INGREDIENT,
    MOCK_CTOR_INGREDIENT2,
} from '@mocks'

import { burgerConstructorSlice, initialState } from './burger-constructor'

function omit<T extends object, K extends keyof T>(
    obj: T,
    ...keys: K[]
): Omit<T, K> {
    const result = { ...obj }
    for (const key of keys) {
        delete result[key]
    }
    return result
}

describe('burgerConstructorSlice', () => {
    it('should return initial state', () => {
        const state = burgerConstructorSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    })

    it('should add bun', () => {
        const nextState = burgerConstructorSlice.reducer(
            initialState,
            burgerConstructorSlice.actions.addIngredient(MOCK_CTOR_BUN)
        )

        expect(omit(nextState.bun!, 'id')).toEqual(omit(MOCK_CTOR_BUN, 'id'))
    })

    it('should add ingredient', () => {
        const nextState = burgerConstructorSlice.reducer(
            initialState,
            burgerConstructorSlice.actions.addIngredient(MOCK_CTOR_INGREDIENT)
        )

        expect(omit(nextState.ingredients[0], 'id')).toEqual(
            omit(MOCK_CTOR_INGREDIENT, 'id')
        )
    })

    it('should move ingredient up', () => {
        const nextState = burgerConstructorSlice.reducer(
            {
                ...initialState,
                ingredients: [MOCK_CTOR_INGREDIENT, MOCK_CTOR_INGREDIENT2],
            },
            burgerConstructorSlice.actions.upIngredient(1)
        )

        expect(nextState.ingredients).toEqual([
            MOCK_CTOR_INGREDIENT2,
            MOCK_CTOR_INGREDIENT,
        ])
    })

    it("shouldn't move first ingredient up", () => {
        const nextState = burgerConstructorSlice.reducer(
            {
                ...initialState,
                ingredients: [MOCK_CTOR_INGREDIENT, MOCK_CTOR_INGREDIENT2],
            },
            burgerConstructorSlice.actions.upIngredient(0)
        )

        expect(nextState.ingredients).toEqual([
            MOCK_CTOR_INGREDIENT,
            MOCK_CTOR_INGREDIENT2,
        ])
    })

    it('should move ingredient down', () => {
        const nextState = burgerConstructorSlice.reducer(
            {
                ...initialState,
                ingredients: [MOCK_CTOR_INGREDIENT, MOCK_CTOR_INGREDIENT2],
            },
            burgerConstructorSlice.actions.downIngredient(0)
        )

        expect(nextState.ingredients).toEqual([
            MOCK_CTOR_INGREDIENT2,
            MOCK_CTOR_INGREDIENT,
        ])
    })

    it("shouldn't move last ingredient down", () => {
        const nextState = burgerConstructorSlice.reducer(
            {
                ...initialState,
                ingredients: [MOCK_CTOR_INGREDIENT, MOCK_CTOR_INGREDIENT2],
            },
            burgerConstructorSlice.actions.downIngredient(1)
        )

        expect(nextState.ingredients).toEqual([
            MOCK_CTOR_INGREDIENT,
            MOCK_CTOR_INGREDIENT2,
        ])
    })

    it('should remove ingredient', () => {
        const nextState = burgerConstructorSlice.reducer(
            {
                ...initialState,
                ingredients: [MOCK_CTOR_INGREDIENT, MOCK_CTOR_INGREDIENT2],
            },
            burgerConstructorSlice.actions.removeIngredient(
                MOCK_CTOR_INGREDIENT
            )
        )

        expect(nextState.ingredients).toEqual([MOCK_CTOR_INGREDIENT2])
    })

    it('should clear state', () => {
        const nextState = burgerConstructorSlice.reducer(
            {
                bun: MOCK_CTOR_BUN,
                ingredients: [MOCK_CTOR_INGREDIENT, MOCK_CTOR_INGREDIENT2],
                error: 'some error',
            },
            burgerConstructorSlice.actions.clear()
        )

        expect(nextState).toEqual({
            bun: null,
            ingredients: [],
            error: null,
        })
    })
})
