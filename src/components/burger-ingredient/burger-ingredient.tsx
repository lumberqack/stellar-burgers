import { useDispatch } from '@services/store'
import { burgerConstructorSlice } from '@slices/burger-constructor'
import { BurgerIngredientUI } from '@ui'
import { FC, memo } from 'react'
import { useLocation } from 'react-router-dom'

import { TBurgerIngredientProps } from './type'

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo((props) => {
    const location = useLocation()
    const dispatch = useDispatch()

    const handleAdd = () =>
        dispatch(burgerConstructorSlice.actions.addIngredient(props.ingredient))

    return (
        <BurgerIngredientUI
            ingredient={props.ingredient}
            count={props.count}
            locationState={{ background: location }}
            handleAdd={handleAdd}
        />
    )
})
