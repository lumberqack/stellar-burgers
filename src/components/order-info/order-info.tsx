import { useDispatch, useSelector } from '@services/store'
import * as feed from '@slices/feed'
import { OrderInfoUI } from '@ui/order-info'
import { Preloader } from '@ui/preloader'
import { TIngredient } from '@utils-types'
import { FC, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

export const OrderInfo: FC = () => {
    const dispatch = useDispatch()
    const { number } = useParams()

    useEffect(() => {
        dispatch(feed.getOrderInfo(parseInt(number ?? '0')))
    }, [])

    const orderData = useSelector((state) => state.feeds.orderInfo)
    const ingredients = useSelector((state) => state.ingredients.ingredients)

    const orderInfo = useMemo(() => {
        if (!orderData || !ingredients.length) return null

        const date = new Date(orderData.createdAt)

        type TIngredientsWithCount = {
            [key: string]: TIngredient & { count: number }
        }

        const ingredientsInfo = orderData.ingredients.reduce(
            (acc: TIngredientsWithCount, item) => {
                if (!acc[item]) {
                    const ingredient = ingredients.find(
                        (ing) => ing._id === item
                    )
                    if (ingredient) {
                        acc[item] = {
                            ...ingredient,
                            count: 1,
                        }
                    }
                } else {
                    acc[item].count++
                }

                return acc
            },
            {}
        )

        const total = Object.values(ingredientsInfo).reduce(
            (acc, item) => acc + item.price * item.count,
            0
        )

        return {
            ...orderData,
            ingredientsInfo,
            date,
            total,
        }
    }, [orderData, ingredients])

    if (!orderInfo) {
        return <Preloader />
    }

    return <OrderInfoUI orderInfo={orderInfo} />
}
