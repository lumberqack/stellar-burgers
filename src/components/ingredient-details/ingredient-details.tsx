import { useSelector } from '@services/store'
import { IngredientDetailsUI } from '@ui/ingredient-details'
import { Preloader } from '@ui/preloader'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

export const IngredientDetails: FC = () => {
    const { id } = useParams()
    const ingredients = useSelector((state) => state.ingredients.ingredients)
    const ingredientData = ingredients.find(({ _id }) => _id === id)

    if (!ingredientData) {
        return <Preloader />
    }

    return <IngredientDetailsUI ingredientData={ingredientData} />
}
