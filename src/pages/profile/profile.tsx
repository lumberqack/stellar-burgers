import { useDispatch, useSelector } from '@services/store'
import * as user from '@slices/user'
import { ProfileUI } from '@ui-pages'
import { FC, SyntheticEvent, useEffect, useState } from 'react'

export const Profile: FC = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.user.user)
    const error = useSelector((state) => state.user.error)

    useEffect(() => {
        setFormValue((prevState) => ({
            ...prevState,
            name: currentUser?.name || '',
            email: currentUser?.email || '',
        }))
    }, [currentUser])

    //

    const [formValue, setFormValue] = useState({
        name: currentUser?.name ?? '',
        email: currentUser?.email ?? '',
        password: '',
    })

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        dispatch(user.updateUser(formValue))
    }

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault()
        setFormValue({
            name: currentUser?.name ?? '',
            email: currentUser?.email ?? '',
            password: '',
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        dispatch(user.userSlice.actions.clearErrors())
    }

    const isFormChanged =
        formValue.name !== currentUser?.name ||
        formValue.email !== currentUser?.email ||
        !!formValue.password

    return (
        <ProfileUI
            formValue={formValue}
            isFormChanged={isFormChanged}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            updateUserError={error!}
        />
    )
}
