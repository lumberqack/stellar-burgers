import { useSelector } from '@services/store'
import { AppHeaderUI } from '@ui'
import { FC } from 'react'

export const AppHeader: FC = () => {
    const userName = useSelector((state) => state.user.user?.name)
    return <AppHeaderUI userName={userName} />
}
