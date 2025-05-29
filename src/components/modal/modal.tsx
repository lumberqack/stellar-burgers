import { ModalUI } from '@ui'
import { FC, memo, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { TModalProps } from './type'

const modalRoot = document.getElementById('modals')

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
    useEffect(() => {
        const handleKbClose = (e: KeyboardEvent) => {
            e.key === 'Escape' && onClose()
        }

        document.addEventListener('keydown', handleKbClose)
        return () => {
            document.removeEventListener('keydown', handleKbClose)
        }
    }, [onClose])

    return ReactDOM.createPortal(
        <ModalUI title={title} onClose={onClose}>
            {children}
        </ModalUI>,
        modalRoot as HTMLDivElement
    )
})
