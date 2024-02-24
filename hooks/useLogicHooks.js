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

    const conditionRenderHandler = (key) => {
        let state = { ...conditionRender }

        const stateModifier = (newStateValue) => {
            state = { ...state, ...newStateValue }
        }

        switch (key) {
            case "SHOW_OTP_SECTION":
                stateModifier({ showOTPSection: true })
                break;

            default:
                break;
        }
        setConditionRender(state)
    }


    const requestOTPHandler = async (e) => {
        e?.preventDefault()
        try {
            console.log('+++ userDetailState', userDetailState);
            conditionRenderHandler("SHOW_OTP_SECTION")

        } catch (error) {
            ErrorHandler(error)
        }
    }

    const validateOTPHandler = async (e) => {
        e?.preventDefault()
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