"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import useLogicHooks from '@/hooks/useLogicHooks'
import Branding from '@/components/core/Branding'
import InputWithLabel from '@/components/input/InputWithLabel'


const formInput = [
    { isRequired: true, type: 'text', id: 'ApplicationNumber', label: 'Application Number', name: 'applicationNumber' },
    { isRequired: true, type: 'password', id: 'ConfirmApplicationNumber', label: 'Confirm Application Number', name: 'confirmApplicationNumber' },
]
const OTPFormInput = [
    { type: 'text', id: 'otp', label: 'One Time Password (OTP)', name: 'otpCode', isRequired: true },
]

const ClientAuthPage = () => {
    const router = useRouter()

    const { userDetailState, conditionRender, userDetailChangeHandler, requestOTPHandler, validateOTPHandler } = useLogicHooks()

    return (
        <div className='container'>
            <Branding />
            <h2 className='mb-1'>E-Nach Registration</h2>
            <p className='mb-3'>Create or modify mandate for future payment.</p>

            <form className="row" onSubmit={requestOTPHandler}>
                {formInput.map((d) => {
                    return (
                        <InputWithLabel
                            key={`form_input__${d.name}`}
                            feild={{ ...d, isDisabled: conditionRender.showOTPSection }}
                            state={userDetailState}
                            onChangeHandler={userDetailChangeHandler}
                            className={[
                                "col-12 mt-3", "", "form-control"
                            ]}
                        />
                    )
                })}

                {!conditionRender.showOTPSection && <div className='mt-4'>
                    <button className='btn btn-primary' type='submit'>Request OTP</button>
                </div>}
            </form>


            {conditionRender.showOTPSection ?
                <form className="row mt-2" onSubmit={validateOTPHandler}>

                    {OTPFormInput.map((d) => {
                        return (
                            <InputWithLabel
                                key={`form_input__${d.name}`}
                                feild={d}
                                state={userDetailState}
                                onChangeHandler={userDetailChangeHandler}
                                className={[
                                    "col-12 mt-3", "", "form-control"
                                ]}
                            />
                        )
                    })}

                    <div className="col-12 mt-3">
                        <p className='info'>By clicking Submit, you agree to the <a href="https://shubham.co/terms-and-conditions.php" target="_blank">Terms and Conditions</a> &amp; <a href="https://shubham.co/privacy-policy.php" target="_blank">Privacy Policy</a> of Shubham Housing Development Finance Company Ltd.</p>
                    </div>

                    <div className='mt-4'>
                        <button className='btn btn-primary' type="submit">Submit</button>
                        <button className='btn' type='button' onClick={requestOTPHandler}>Resend OTP</button>
                    </div>

                </form> : <></>}
        </div>
    )
}

export default ClientAuthPage