import React, { useState } from 'react'
import { changeHandlerHelper } from '@/utils/ChangeHandler'
import { ErrorHandler } from '@/utils/ErrorHandler'

import { api } from '@/services/endpoint'
import axios from '@/services/axios'
import { useRouter } from 'next/navigation'


import { AES256Encryptor, SHA256Hash, uniqueMsgID } from '@/utils/AESEncryption'
import { useDispatch, useSelector } from 'react-redux'
import { setEnachValue } from '@/redux/slice/enach.slice'
import { setEnacCancel } from '@/redux/slice/enacCancelation.slice'
import Cookies from 'js-cookie'


const MERCHANT_CATEGORY_CODE = process.env.NEXT_PUBLIC_MERCHANT_CATEGORY_CODE
const MERCHANT_SECURITY_CATEGORY_CODE = process.env.NEXT_PUBLIC_MERCHANT_SECURITY_CATEGORY_CODE

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
    applicationNo: "",
    mobile: "",
    email: "",
    startDate: "",
    expiryDate: "",
    amount: "",
}

const loanStatusInitialState = {
    applicationNo: "",
    loanNo: "",
    cancelCause: ''
}



const UseLogicHooks = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const enachInitialState = useSelector(state => state.enachSlice)
    const { applicationDetails = {} } = useSelector((state) => state.enacCancelationSlice);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [conditionRender, setConditionRender] = useState({ ...conditionRenderInitialState })
    const [userDetailState, setUserDetailState] = useState({ ...userDetailsInitialState })
    const [loanStatus, setloanStatus] = useState({ ...loanStatusInitialState })
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

            const { data } = await axios.post(api.requestOTP(), { applicationNo: userDetailState.applicationNumber })

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

            const { mobile: mobileNo, otpCode, applicationNo } = userDetailState
            const { data } = await axios.post(api.validateOTP(), { mobileNo, otpCode, applicationNo: userDetailState.applicationNumber })

            if (data.code === "1111") {
                throw new Error(data.msg);
            } else {

                const { custName, applicationNo, mobileNo, email, startDate, expiryDate, amount, jwtToken } = data

                const userData = {
                    applicationNo: applicationNo,
                    Customer_Name: custName,
                    // Customer_EmailId: email || "",
                    Customer_Mobile: mobileNo,
                    Customer_StartDate: formatDate(startDate),
                    Customer_ExpiryDate: formatDate(expiryDate),
                }

                Cookies.set("user_data", JSON.stringify(userData))
                Cookies.set("token", jwtToken)
                dispatch(setEnachValue(userData))
                router.push("/client/enach")
            }

        } catch (error) {
            ErrorHandler(error)
        }
    }

    const retrieveData = () => {
        let data = Cookies.get("user_data")
        let ec_data = Cookies.get("ec_user_data")

        data = JSON.parse(data || "{}")
        ec_data = JSON.parse(ec_data || "{}")

        dispatch(setEnachValue(data))
        dispatch(setEnacCancel(ec_data))
        setEnachState((state) => ({ ...state, ...data }))
    }

    const enachSubmitHandler = async (e) => {
        e?.preventDefault()
        try {
            const body = { ...enachState }
            body.Customer_Reference2 = body.applicationNo;
            delete body.applicationNo

            const { Customer_AccountNo, Customer_StartDate, Customer_ExpiryDate, Customer_DebitAmount, Customer_MaxAmount } = enachState

            body.CheckSum = SHA256Hash([Customer_AccountNo, Customer_StartDate, Customer_ExpiryDate, Customer_DebitAmount, Customer_MaxAmount])

            body.MsgId = uniqueMsgID()

            const inputForAES256 = ['UtilCode', 'Short_Code', 'Customer_Name', 'Customer_EmailId', 'Customer_Mobile', 'Customer_AccountNo', 'Customer_Reference1', 'Customer_Reference2']

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
                applicationNo: enachState.applicationNo,
                transactionStartDate: date,
                paymentMethod: enachState.Channel,
                mandateType: enachState.Customer_DebitFrequency,
                amount: enachState.Customer_MaxAmount * 1,

                bankName: body.Filler6,
                bankAccountNo: enachState.Customer_AccountNo,
                ifscCode: body.Customer_InstructedMemberId,
                startDate: enachState.Customer_StartDate,
                endDate: enachState.Customer_ExpiryDate
            })
            dispatch(setEnachValue(body))
            router.push("/client/form");
        } catch (error) {
            ErrorHandler(error)
        }
    }
    const paymentMethodChangeHandlerCase = (prevState, { name, value }) => {
        if (name === "Channel") {
            if (value === "Aadhaar") {
                prevState.Filler7 = "OTP"
            } else {
                prevState.Filler7 = ""
            }
        }

    }
    const debitFrequencyChangeHandler = async (e) => {
        try {
            const { value, name } = e.target
            const prevState = { ...enachState }

            const body = {
                params: {
                    mandateType: value,
                    applicationNo: prevState.applicationNo
                }
            }
            const { data } = await axios.get(api.enachmandateType(), body);

            prevState[name] = value
            prevState.Customer_MaxAmount = formatDecimal(data?.amount)

            if (value === 'MNTH') {
                prevState.Merchant_Category_Code = MERCHANT_CATEGORY_CODE
                prevState.Customer_Reference1 = "";

            } else {
                prevState.Merchant_Category_Code = MERCHANT_SECURITY_CATEGORY_CODE
                prevState.Customer_Reference1 = 'Loan amount security';

            }
            setEnachState(prevState);
        } catch (error) {
            ErrorHandler(error)
        }

    }

    // EnachCanelation Handler

    const enacCancelhvalidateOTPHandler = async (e) => {
        e?.preventDefault()
        try {

            const { mobile: mobileNo, otpCode, applicationNumber: applicationNo } = userDetailState

            let { data: { data = {}, loansDetails = [], code = "0000" } } = await axios.post(api.validateOTPENachCancellation(), {
                mobileNo, otpCode, applicationNo
            })
            // {"msg":"Otp send.","code":"0000","otpCode":"260856","mobile":"9922762148"}

            if (data.code === "1111") {
                throw new Error(data.msg);
            } else {

                const status = {
                    A: "Active",
                    X: "Cancel",
                    C: "Close"
                }
                loansDetails = loansDetails.map((d) => {
                    d.status_text = status[d.status]
                    return d
                })

                const payload = { applicationDetails: data, loansDetails }

                dispatch(setEnacCancel(payload))
                Cookies.set("ec_user_data", JSON.stringify(payload))
                router.push("/enach-cancellation/user")
            }

        } catch (error) {
            ErrorHandler(error)
        }
    }


    const loanStatusSubmitHandler = async (e) => {
        e.preventDefault()
        const body = {
              loanNo: selectedLoan.loanNo,
              applicationNo: applicationDetails.applicationNo,
              cancelCause: selectedLoan.status_text
            }
        try {
            const { data } = await axios.post(api.cancellationStatus(), body);
            router.push("/enach-cancellation/success");

        } catch (error) {
            ErrorHandler(error)
        }
    }

      const handleRadioChange = (loan) => {
        setSelectedLoan(loan);
      };
      const handleBackClick = () => {
        debugger
        router.push("/enach-cancellation");
      };
      
      const maskMobileNumber = (mobileNumber) => {
        if (!mobileNumber) return "";
        return mobileNumber.replace(/^(\d{6})(\d{4})$/, "******$2");
      };

    const loanStatusChangeHandler = (e) => changeHandlerHelper(e, loanStatus, setloanStatus)
    const StatusDefaultStateHandler = (e) => setloanStatus(state => ({ ...state, ...e }))

    return ({
        conditionRender, userDetailState, enachState, loanStatus,selectedLoan,


        requestOTPHandler, validateOTPHandler, enachSubmitHandler, enacCancelhvalidateOTPHandler,
        retrieveData, debitFrequencyChangeHandler, loanStatusChangeHandler, StatusDefaultStateHandler,
        handleRadioChange, setSelectedLoan,loanStatusSubmitHandler,maskMobileNumber,handleBackClick,

        enachChangeHandler: (e) => changeHandlerHelper(e, enachState, setEnachState, paymentMethodChangeHandlerCase),
        userDetailChangeHandler: (e) => changeHandlerHelper(e, userDetailState, setUserDetailState),


    })
}

export default UseLogicHooks




