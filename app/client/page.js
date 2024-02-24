"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import useLogicHooks from '@/hooks/useLogicHooks'
import Branding from '@/components/core/Branding'


const formInput = [
    { type: 'text', id: 'ApplicationNumber', label: 'Application Number', name: 'applicationNumber' },
    { type: 'password', id: 'ConfirmApplicationNumber', label: 'Confirm Application Number', name: 'confirmApplicationNumber' },
]
const OTPFormInput = [
    { type: 'text', id: 'otp', label: 'One Time Password (OTP)', name: 'otp' },
]

const ClientAuthPage = () => {
    const router = useRouter()

    const { conditionRender, requestOTPHandler } = useLogicHooks()

    return (
        <div className='container'>

            <Branding />

            <h2 className='mt-5 mb-1'>E-Nach Registration</h2>
            <p className='mb-3'>Create or modify mandate for future payment.</p>

            <form className="row" onSubmit={requestOTPHandler}>
                {formInput.map((d) => {
                    return (
                        <div className="col-md-12 col-12 mt-3" key={`form_input__${d.name}`}>
                            <label htmlFor={d.id}>{d.label}</label>
                            <input type={d.type} id={d.id} name={d.name} className='form-control' />
                        </div>
                    )
                })}

                <div className='mt-4'>
                    <button className='btn btn-primary' type='submit'>{!conditionRender.showOTPSection ? "Request OTP" : "Resend OTP"}</button>
                </div>
            </form>


            {conditionRender.showOTPSection ? <form className="row mt-4">
                {OTPFormInput.map((d, idx) => {
                    return (
                        <div className="col-md-12 col-12 mt-3" key={`form_input__${d.name + d.idx}`}>
                            <label htmlFor={d.id}>{d.label}</label>
                            <input type={d.type} id={d.id} name={d.name} className='form-control' />
                        </div>
                    )
                })}

                <div className="col-12 mt-3">
                    <p className='info'>By clicking Submit, you agree to the <a href="https://shubham.co/terms-and-conditions.php" target="_blank">Terms and Conditions</a> &amp; <a href="https://shubham.co/privacy-policy.php" target="_blank">Privacy Policy</a> of Shubham Housing Development Finance Company Ltd.</p>
                </div>

                <div className='mt-4'>
                    <button className='btn btn-primary' onClick={() => router.push("/client/enach")}>Submit</button>
                    <button className='btn'>Resend OTP</button>
                </div>

            </form> : <></>}
        </div>
    )
}

export default ClientAuthPage