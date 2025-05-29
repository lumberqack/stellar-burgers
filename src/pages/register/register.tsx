import { useDispatch, useSelector } from '@services/store'
import * as user from '@slices/user'
import { RegisterUI } from '@ui-pages'
import { FC, SyntheticEvent, useEffect, useState } from 'react'

export const Register: FC = () => {
    const dispatch = useDispatch()
    const error = useSelector((state) => state.user.error)

    useEffect(() => {
        dispatch(user.userSlice.actions.clearErrors())
    }, [dispatch])

    //

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        dispatch(
            user.registerUser({
                name: userName,
                email,
                password,
            })
        )
    }

    return (
        <RegisterUI
            errorText={error!}
            email={email}
            userName={userName}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            setUserName={setUserName}
            handleSubmit={handleSubmit}
        />
    )
}
