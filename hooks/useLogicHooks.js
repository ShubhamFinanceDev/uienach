import React, { useState } from 'react'
import { changeHandlerHelper } from '@/utils/ChangeHandler'
import { ErrorHandler } from '@/utils/ErrorHandler'

const conditionRenderInitialState = {
    error: "",

    showOTPSection: false,

    disableApplicationSection: false,

}

const useLogicHooks = () => {

    const [conditionRender, setConditionRender] = useState({ ...conditionRenderInitialState })
    const [userDetailsState, setUserDetailsState] = useState({})


    const requestOTPHandler = async (e) => {
        e.preventDefault()
        try {

        } catch (error) {
            ErrorHandler(error)
        }
    }

    const validateOTPHandler = async (e) => {
        try {

        } catch (error) {
            ErrorHandler(error)
        }
    }



    return ({
        conditionRender, userDetailsState,


        requestOTPHandler, validateOTPHandler,


        userDetailsChangeHandler: (e) => changeHandlerHelper(e, userDetailsState, setUserDetailsState)
    })
}

export default useLogicHooks