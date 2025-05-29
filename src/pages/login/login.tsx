import { useDispatch, useSelector } from '@services/store'
import * as user from '@slices/user'
import { LoginUI } from '@ui-pages'
import { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Login: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        dispatch(user.userSlice.actions.clearErrors())
    }, [])

    const error = useSelector((state) => state.user.error)

    const { from } = location.state ?? { from: { pathname: '/' } }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        dispatch(user.loginUser({ email, password }))
        navigate(from.pathname, { replace: true })
    }

    return (
        <LoginUI
            errorText={error!}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    )
}
