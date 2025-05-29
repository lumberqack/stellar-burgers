import { MOCK_ORDER } from '@mocks'

import { initialState, orderBurger, orderSlice } from './order'

describe('orderSlice', () => {
    it('should return initial state', () => {
        const state = orderSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    })
})

describe('orderBurger', () => {
    it('should set loading on pending', () => {
        const nextState = orderSlice.reducer(initialState, {
            type: orderBurger.pending.type,
        })

        expect(nextState).toEqual({
            ...initialState,
            isOrderLoading: true,
        })
    })

    it('should set state on fulfilled', () => {
        const nextState = orderSlice.reducer(initialState, {
            type: orderBurger.fulfilled.type,
            payload: {
                name: 'some name',
                order: MOCK_ORDER,
            },
        })

        expect(nextState).toEqual({
            ...initialState,
            order: MOCK_ORDER,
        })
    })

    it('should set error on rejected', () => {
        const nextState = orderSlice.reducer(initialState, {
            type: orderBurger.rejected.type,
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
