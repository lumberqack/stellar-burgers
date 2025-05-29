import { ModalOverlayUI } from '@ui'
import { CloseIcon } from '@zlden/react-developer-burger-ui-components'
import { FC, memo } from 'react'

import styles from './modal.module.css'
import { TModalUIProps } from './type'

export const ModalUI: FC<TModalUIProps> = memo((props) => (
    <>
        <div className={styles.modal} data-cy='modal'>
            <div className={styles.header}>
                <h3 className={`${styles.title} text text_type_main-large`}>
                    {props.title}
                </h3>
                <button
                    className={styles.button}
                    type='button'
                    data-cy='modal_close_button'
                >
                    <CloseIcon type='primary' onClick={props.onClose} />
                </button>
            </div>
            <div className={styles.content}>{props.children}</div>
        </div>
        <ModalOverlayUI onClick={props.onClose} />
    </>
))
