import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import StatusModel from '@/components/model/page'

const initialState = {
    show: false,
    key: null,
    size: 'md',
    centered: true,
    keyboard: false,
}

const ModelMap = {
    STATUS_MODEL: StatusModel,

}

const ModelHOC = (Component) => {
    return function ModelComponent(props) {
        const [ModelState, setModelState] = useState({ ...initialState })

        const closeModel = () => setModelState({ ...initialState })
        const openModel = (e) => {
            setModelState({ show: true, ...e })
console.log(e)
        }

        const ModelComponent = ModelMap[ModelState.key]

        return (
            <>
                {ModelState.show && <Modal
                    show={ModelState.show}
                    onHide={closeModel}

                    backdrop="static"
                    size={ModelState.size}
                    centered={ModelState.centered}
                    keyboard={ModelState.keyboard}
                >
                    <ModelComponent
                        openModel={openModel}
                        closeModel={closeModel}
                        {...ModelState}
                    />
                </Modal >}
                <Component
                    {...props}
                    openModel={openModel}
                    closeModel={closeModel}
                />
            </>
        )
    }

}

export default ModelHOC

