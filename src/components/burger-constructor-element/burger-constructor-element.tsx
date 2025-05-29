import { useDispatch } from '@services/store'
import { burgerConstructorSlice } from '@slices/burger-constructor'
import { BurgerConstructorElementUI } from '@ui'
import { FC, memo } from 'react'

import { BurgerConstructorElementProps } from './type'

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
    ({ ingredient, index, totalItems }) => {
        const dispatch = useDispatch()

        const handlers = {
            moveDown() {
                dispatch(burgerConstructorSlice.actions.downIngredient(index))
            },
            moveUp() {
                dispatch(burgerConstructorSlice.actions.upIngredient(index))
            },
            close() {
                dispatch(
                    burgerConstructorSlice.actions.removeIngredient(ingredient)
                )
            },
        }

        return (
            <BurgerConstructorElementUI
                ingredient={ingredient}
                index={index}
                totalItems={totalItems}
                handleMoveUp={handlers.moveUp}
                handleMoveDown={handlers.moveDown}
                handleClose={handlers.close}
            />
        )
    }
)
