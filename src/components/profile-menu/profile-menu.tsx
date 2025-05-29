import { useDispatch } from '@services/store'
import * as user from '@slices/user'
import { ProfileMenuUI } from '@ui'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const ProfileMenu: FC = () => {
    const location = useLocation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(user.logoutUser())
        navigate('/')
    }

    return (
        <ProfileMenuUI
            handleLogout={handleLogout}
            pathname={location.pathname}
        />
    )
}
