import { MOCK_INGREDIENT } from '@mocks'

import { getIngredients, ingredientsSlice, initialState } from './ingredients'

describe('ingredientsSlice', () => {
    it('should return initial state', () => {
        const state = ingredientsSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    })
})

describe('getIngredients', () => {
    it('should set loading on pending', () => {
        const nextState = ingredientsSlice.reducer(initialState, {
            type: getIngredients.pending.type,
        })

        expect(nextState).toEqual({
            ...initialState,
            ingredientsLoading: true,
        })
    })

    it('should set state on fulfilled', () => {
        const nextState = ingredientsSlice.reducer(initialState, {
            type: getIngredients.fulfilled.type,
            payload: [MOCK_INGREDIENT],
        })

        expect(nextState).toEqual({
            ...initialState,
            ingredients: [MOCK_INGREDIENT],
        })
    })

    it('should set error on rejected', () => {
        const nextState = ingredientsSlice.reducer(initialState, {
            type: getIngredients.rejected.type,
            error: {
                message: 'some error',
            },
        })

        expect(nextState).toEqual({
            ...initialState,
            error: 'some error',
        })
    })
})
