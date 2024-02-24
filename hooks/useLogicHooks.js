import React, { useState } from 'react'
import { changeHandlerHelper } from '@/utils/ChangeHandler'
import { ErrorHandler } from '@/utils/ErrorHandler'

const conditionRenderInitialState = {
    error: "",

    showOTPSection: false,

    disableApplicationSection: false,

}

const userDetailsInitialState = {
    applicationNumber: "",
    confirmApplicationNumber: "",
    otp: "",
}

const useLogicHooks = () => {

    const [conditionRender, setConditionRender] = useState({ ...conditionRenderInitialState })
    const [userDetailState, setUserDetailState] = useState({ ...userDetailsInitialState })


    const requestOTPHandler = async (e) => {
        e.preventDefault()
        try {
            console.log('+++ userDetailState', userDetailState);

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
        conditionRender, userDetailState,


        requestOTPHandler, validateOTPHandler,


        userDetailChangeHandler: (e) => changeHandlerHelper(e, userDetailState, setUserDetailState)
    })
}

export default useLogicHooks