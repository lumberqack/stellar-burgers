import { useDispatch, useSelector } from '@services/store'
import * as user from '@slices/user'
import { ProfileOrdersUI } from '@ui-pages'
import { TOrder } from '@utils-types'
import { FC, useEffect } from 'react'

export const ProfileOrders: FC = () => {
    const dispatch = useDispatch()

    const orders: TOrder[] = useSelector((state) => state.user.orders)

    useEffect(() => {
        dispatch(user.getOrders())
    }, [])

    return <ProfileOrdersUI orders={orders} />
}
