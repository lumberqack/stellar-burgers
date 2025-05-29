import { useSelector } from '@services/store'
import { FeedInfoUI } from '@ui/feed-info'
import { TOrder } from '@utils-types'
import { FC } from 'react'

const getOrders = (orders: TOrder[], status: string): number[] =>
    orders
        .filter((item) => item.status === status)
        .map((item) => item.number)
        .slice(0, 20)

export const FeedInfo: FC = () => {
    const orders = useSelector((state) => state.feeds.orders)
    const total = useSelector((state) => state.feeds.total)
    const totalToday = useSelector((state) => state.feeds.totalToday)

    const readyOrders = getOrders(orders, 'done')
    const pendingOrders = getOrders(orders, 'pending')

    return (
        <FeedInfoUI
            readyOrders={readyOrders}
            pendingOrders={pendingOrders}
            feed={{ total, totalToday }}
        />
    )
}
