import '../../index.css'

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components'
import {
    ConstructorPage,
    Feed,
    ForgotPassword,
    Login,
    NotFound404,
    Profile,
    ProfileOrders,
    Register,
    ResetPassword,
} from '@pages'
import { useDispatch } from '@services/store'
import * as ingredients from '@slices/ingredients'
import * as user from '@slices/user'
import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { ProtectedRoute } from '../protected-route'
import styles from './app.module.css'

const App = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ingredients.getIngredients())
        dispatch(user.getUser())
    }, [])

    const background = location.state?.background
    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={background}>
                <Route path='/' element={<ConstructorPage />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/feed/:number' element={<OrderInfo />} />
                <Route
                    path='/login'
                    element={
                        <ProtectedRoute unauthorizedOnly>
                            <Login />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/register'
                    element={
                        <ProtectedRoute unauthorizedOnly>
                            <Register />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/forgot-password'
                    element={
                        <ProtectedRoute unauthorizedOnly>
                            <ForgotPassword />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/reset-password'
                    element={
                        <ProtectedRoute unauthorizedOnly>
                            <ResetPassword />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/profile/orders'
                    element={
                        <ProtectedRoute>
                            <ProfileOrders />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/ingredients/:id'
                    element={<IngredientDetails />}
                />
                <Route path='/profile/orders/:number' element={<OrderInfo />} />
                <Route path='*' element={<NotFound404 />} />
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path='/feed/:number'
                        element={
                            <Modal title={''} onClose={() => navigate(-1)}>
                                <OrderInfo />
                            </Modal>
                        }
                    />
                    <Route
                        path='/ingredients/:id'
                        element={
                            <Modal
                                title={'Детали ингредиента'}
                                onClose={() => navigate(-1)}
                            >
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path='/profile/orders/:number'
                        element={
                            <Modal title={''} onClose={() => navigate(-1)}>
                                <OrderInfo />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    )
}

export default App
