import { useDispatch, useSelector } from '@services/store'
import * as burgerConstructor from '@slices/burger-constructor'
import * as order from '@slices/order'
import { BurgerConstructorUI } from '@ui'
import { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export const BurgerConstructor: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isAuthorized = useSelector((state) => state.user.isAuth)
    const constructorItems = useSelector((state) => state.burgerConstructor)
    const orderRequest = useSelector((state) => state.order.isOrderLoading)
    const orderModalData = useSelector((state) => state.order.order)

    const onOrderClick = async () => {
        if (!isAuthorized) {
            navigate('/login')
            return
        }

        if (!constructorItems.bun || orderRequest) {
            return
        }

        await dispatch(
            order.orderBurger([
                constructorItems.bun._id,
                ...constructorItems.ingredients.map(({ _id }) => _id),
                constructorItems.bun._id,
            ])
        )
        dispatch(burgerConstructor.burgerConstructorSlice.actions.clear())
    }

    const closeOrderModal = () => {
        dispatch(order.orderSlice.actions.clearOrder())
        dispatch(burgerConstructor.burgerConstructorSlice.actions.clear())
        navigate('/', { replace: true })
    }

    const price = useMemo(
        () =>
            (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
            constructorItems.ingredients.reduce((s, v) => s + v.price, 0),
        [constructorItems]
    )

    return (
        <BurgerConstructorUI
            price={price}
            orderRequest={orderRequest}
            constructorItems={constructorItems}
            orderModalData={orderModalData}
            onOrderClick={onOrderClick}
            closeOrderModal={closeOrderModal}
        />
    )
}
