import { useSelector } from '@services/store'
import { IngredientsCategoryUI } from '@ui/ingredients-category'
import { TIngredient } from '@utils-types'
import { forwardRef, useMemo } from 'react'

import { TIngredientsCategoryProps } from './type'

export const IngredientsCategory = forwardRef<
    HTMLUListElement,
    TIngredientsCategoryProps
>((props, ref) => {
    const burgerConstructor = useSelector((state) => state.burgerConstructor)

    const ingredientsCounters = useMemo(() => {
        const { bun, ingredients } = burgerConstructor
        const counters: { [key: string]: number } = {}
        ingredients.forEach((ingredient: TIngredient) => {
            if (!counters[ingredient._id]) counters[ingredient._id] = 0
            counters[ingredient._id]++
        })
        if (bun) counters[bun._id] = 2
        return counters
    }, [burgerConstructor])

    return (
        <IngredientsCategoryUI
            title={props.title}
            titleRef={props.titleRef}
            ingredients={props.ingredients}
            ingredientsCounters={ingredientsCounters}
            ref={ref}
        />
    )
})
