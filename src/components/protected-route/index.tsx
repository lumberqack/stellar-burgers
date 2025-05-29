import { useSelector } from '@services/store'
import { Preloader } from '@ui/preloader'
import { Navigate, useLocation } from 'react-router'

export type ProtectedRouteProps = {
    unauthorizedOnly?: boolean | undefined
    children: React.ReactElement
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
    const location = useLocation()

    const isAuthChecked = useSelector((state) => state.user.isAuth)
    const isLoading = useSelector((state) => state.user.isLoading)

    if (!isAuthChecked && isLoading) {
        return <Preloader />
    }

    if (!props.unauthorizedOnly && !isAuthChecked) {
        return <Navigate replace to='/login' state={{ from: location }} />
    }

    if (props.unauthorizedOnly && isAuthChecked) {
        const from = location.state?.from || { pathname: '/' }

        return <Navigate replace to={from} />
    }

    return props.children
}
