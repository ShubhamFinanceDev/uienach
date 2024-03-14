import React, { useState } from 'react'
import { changeHandlerHelper } from '@/utils/ChangeHandler'
import { ErrorHandler } from '@/utils/ErrorHandler'

import { api } from '@/services/endpoint'
import axios from '@/services/axios'
import { useRouter } from 'next/navigation'


import { AES256Encryptor, SHA256Hash, uniqueMsgID } from '@/utils/AESEncryption'
import { useDispatch, useSelector } from 'react-redux'
import { setEnachValue } from '@/redux/slice/enach.slice'
import Cookies from 'js-cookie'


function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDecimal(numString) {
    const num = parseFloat(numString);
    if (isNaN(num)) {
        return "Invalid number";
    }
    return num.toFixed(2);
}


const conditionRenderInitialState = {
    error: "",

    showOTPSection: false,

    disableApplicationSection: false,

}

const userDetailsInitialState = {
    applicationNumber: "",
    confirmApplicationNumber: "",
    otp: "",

    custName: "",
    loanNo: "",
    mobile: "",
    email: "",
    startDate: "",
    expiryDate: "",
    amount: "",
}



const useLogicHooks = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const enachInitialState = useSelector(state => state.enachSlice)

    const [conditionRender, setConditionRender] = useState({ ...conditionRenderInitialState })
    const [userDetailState, setUserDetailState] = useState({ ...userDetailsInitialState })

    const [enachState, setEnachState] = useState({ ...enachInitialState })

    const conditionRenderHandler = (key, msg = "") => {
        let state = { ...conditionRender }

        const stateModifier = (newStateValue, resetError = true) => {
            state = { ...state, ...newStateValue }
            if (resetError) {
                state.error = ""
            }
        }

        switch (key) {
            case "SHOW_OTP_SECTION":
                stateModifier({ showOTPSection: true })
                break;
            case "ERROR":
                stateModifier({ error: msg }, false)
                break;

            default:
                break;
        }
        setConditionRender(state)
    }

    const requestOTPHandler = async (e) => {
        e?.preventDefault()
        try {
            if (userDetailState.applicationNumber !== userDetailState.confirmApplicationNumber) {
                alert("Application Number should be matched!")
                return
            }

            const { data } = await axios.post(api.requestOTP(), { loanNo: userDetailState.applicationNumber })

            if (data.code === "1111") {
                throw new Error(data.msg);
            } else {
                setUserDetailState(state => ({ ...state, ...data }))
                conditionRenderHandler("SHOW_OTP_SECTION")
                alert("OTP send on registred mobile no.")
            }
        } catch (error) {
            ErrorHandler(error)
        }
    }

    const validateOTPHandler = async (e) => {
        e?.preventDefault()
        try {

            const { mobile: mobileNo, otpCode } = userDetailState
            const { data } = await axios.post(api.validateOTP(), { mobileNo, otpCode })

            if (data.code === "1111") {
                throw new Error(data.msg);
            } else {

                const { custName, loanNo, mobileNo, email, startDate, expiryDate, amount } = data

                const userData = {
                    loanNo: loanNo,
                    Customer_Name: custName,
                    Customer_EmailId: email || "",
                    Customer_Mobile: mobileNo,
                    Customer_StartDate: formatDate(startDate),
                    Customer_ExpiryDate: formatDate(expiryDate),
                    // Customer_MaxAmount: formatDecimal(amount),
                    // Customer_DebitAmount: formatDecimal(amount),
                }

                Cookies.set("user_data", JSON.stringify(userData))
                dispatch(setEnachValue(userData))
                router.push("/client/enach")
            }

        } catch (error) {
            ErrorHandler(error)
        }
    }

    const retrieveData = () => {
        let data = Cookies.get("user_data")
        data = JSON.parse(data || "{}")
        dispatch(setEnachValue(data))
        setEnachState((state) => ({ ...state, ...data }))
    }

    const enachSubmitHandler = async (e) => {
        e?.preventDefault()
        try {
            const body = { ...enachState }
            delete body.loanNo

            const { Customer_AccountNo, Customer_StartDate, Customer_ExpiryDate, Customer_DebitAmount, Customer_MaxAmount } = enachState

            body.CheckSum = SHA256Hash([Customer_AccountNo, Customer_StartDate, Customer_ExpiryDate, Customer_DebitAmount, Customer_MaxAmount])

            body.MsgId = uniqueMsgID()

            const inputForAES256 = ['UtilCode', 'Short_Code', 'Customer_Name', 'Customer_EmailId', 'Customer_Mobile', 'Customer_AccountNo', 'Customer_Reference1', 'Customer_Reference2','Customer_MaxAmount']

            for (const k of inputForAES256) {
                body[k] = AES256Encryptor(body[k])
            }

            const formData = new FormData();

            for (const [k, v] of Object.entries(body)) {
                formData.append(k, v);
            }

            const date = new Date
            await axios.post(api.communicateEnachPayment(), {
                transactionNo: body.MsgId,
                loanNo: enachState.loanNo,
                transactionStartDate: date
            })
            dispatch(setEnachValue(body))
            router.push("/client/form");
        } catch (error) {
            ErrorHandler(error)
        }
    }

    const handleMandateTypeChange = async (selectedMandateType) => {
        try {
            const { loanNo, Customer_DebitFrequency } = enachState;
            await selectedMandateType.value;
    
            const { data } = await axios.get(api.enachmandateType(), {
                params: {
                    mandateType: Customer_DebitFrequency,
                    loanNo: loanNo
                }
            });
            console.log(data);
    
            setEnachState(prevState => ({
                ...prevState,
                Customer_MaxAmount: data.amount
            }));
        } catch (error) {
            console.error('Error fetching mandate type:', error);
        }
    };


    return ({
        conditionRender, userDetailState, enachState,


        requestOTPHandler, validateOTPHandler, enachSubmitHandler,
        retrieveData,handleMandateTypeChange,

        enachChangeHandler: (e) => changeHandlerHelper(e, enachState, setEnachState),
        userDetailChangeHandler: (e) => changeHandlerHelper(e, userDetailState, setUserDetailState)
    })
}

export default useLogicHooks