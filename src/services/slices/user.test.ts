import { MOCK_ORDER, MOCK_USER } from '@mocks'
import {
    getOrders,
    getUser,
    initialState,
    loginUser,
    logoutUser,
    registerUser,
    updateUser,
    userSlice,
} from './user'

describe('userSlice', () => {
    it('should return initial state', () => {
        const state = userSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    })
})

describe('loginUser', () => {
    it('should set loading on pending', () => {
        const nextState = userSlice.reducer(initialState, {
            type: loginUser.pending.type,
        })

        expect(nextState).toEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should set state on fulfilled', () => {
        const nextState = userSlice.reducer(initialState, {
            type: loginUser.fulfilled.type,
            payload: MOCK_USER,
        })

        expect(nextState).toEqual({
            ...initialState,
            user: MOCK_USER,
            isAuth: true,
        })
    })

    it('should set error on rejected', () => {
        const nextState = userSlice.reducer(initialState, {
            type: loginUser.rejected.type,
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

describe('registerUser', () => {
    it('should set loading on pending', () => {
        const nextState = userSlice.reducer(initialState, {
            type: registerUser.pending.type,
        })

        expect(nextState).toEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should set state on fulfilled', () => {
        const nextState = userSlice.reducer(initialState, {
            type: registerUser.fulfilled.type,
            payload: MOCK_USER,
        })

        expect(nextState).toEqual({
            ...initialState,
            user: MOCK_USER,
            isAuth: true,
        })
    })

    it('should set error on rejected', () => {
        const nextState = userSlice.reducer(initialState, {
            type: registerUser.rejected.type,
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

describe('logoutUser', () => {
    it("shouldn't set loading on pending", () => {
        const nextState = userSlice.reducer(initialState, {
            type: logoutUser.pending.type,
        })

        expect(nextState).toEqual({
            ...initialState,
        })
    })

    it('should set state on fulfilled', () => {
        const nextState = userSlice.reducer(initialState, {
            type: logoutUser.fulfilled.type,
        })

        expect(nextState).toEqual({
            ...initialState,
        })
    })
})

describe('getUser', () => {
    it('should set loading on pending', () => {
        const nextState = userSlice.reducer(initialState, {
            type: getUser.pending.type,
        })

        expect(nextState).toEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should set state on fulfilled', () => {
        const nextState = userSlice.reducer(initialState, {
            type: getUser.fulfilled.type,
            payload: { user: MOCK_USER },
        })

        expect(nextState).toEqual({
            ...initialState,
            user: MOCK_USER,
            isAuth: true,
        })
    })

    it('should set error on rejected', () => {
        const nextState = userSlice.reducer(initialState, {
            type: getUser.rejected.type,
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

describe('updateUser', () => {
    it('should set loading on pending', () => {
        const nextState = userSlice.reducer(initialState, {
            type: updateUser.pending.type,
        })

        expect(nextState).toEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should set state on fulfilled', () => {
        const nextState = userSlice.reducer(initialState, {
            type: updateUser.fulfilled.type,
            payload: { user: MOCK_USER },
        })

        expect(nextState).toEqual({
            ...initialState,
            user: MOCK_USER,
            isAuth: true,
        })
    })

    it('should set error on rejected', () => {
        const nextState = userSlice.reducer(initialState, {
            type: updateUser.rejected.type,
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

describe('getOrders', () => {
    it('should set loading on pending', () => {
        const nextState = userSlice.reducer(initialState, {
            type: getOrders.pending.type,
        })

        expect(nextState).toEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should set state on fulfilled', () => {
        const nextState = userSlice.reducer(initialState, {
            type: getOrders.fulfilled.type,
            payload: [MOCK_ORDER],
        })

        expect(nextState).toEqual({
            ...initialState,
            orders: [MOCK_ORDER],
        })
    })

    it('should set error on rejected', () => {
        const nextState = userSlice.reducer(initialState, {
            type: getOrders.rejected.type,
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
