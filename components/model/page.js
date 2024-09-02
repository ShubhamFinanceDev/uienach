'use client'

import React, { useEffect, useState } from 'react'
import InputWithLabel from '../input/InputWithLabel'
import SelectWithLabel from '../input/SelectWithLabel'
import UseLogicHooks from '@/hooks/useLogicHooks'

const StatusModel = (props) => {
    const { loanStatus, loanStatusChangeHandler, loanStatusSubmitHandler, StatusDefaultStateHandler } = UseLogicHooks()
    const { closeModel, applicationNo, loanNo } = props

    useEffect(() => {
        StatusDefaultStateHandler({ applicationNo, loanNo })
    }, [props])

    return (
        <div className='model-container'>
            <p className='mb-3'>Loan Cancelation Acknowledgement</p>
            <form onSubmit={loanStatusSubmitHandler} className='row'>
                <InputWithLabel
                    feild={{
                        label: "applicationNo",
                        name: "applicationNo",
                        isDisabled: true
                    }}
                    state={loanStatus}
                />

                <InputWithLabel
                    feild={{
                        label: "Loan No.",
                        name: "loanNo",
                        isDisabled: true
                    }}
                    state={loanStatus}
                    isDisabled
                />
                <SelectWithLabel
                    feild={{
                        label: "Loan Status",
                        name: "cancelCause",
                        type: "select",
                        options: [
                            { name: "Loan Cancelled", value: "loancancelled" },
                            { name: "Loan Cancel", value: "Loancancel" },
                        ],
                        isRequired: true,
                    }}
                    state={loanStatus}
                    onChangeHandler={loanStatusChangeHandler}

                />


                <div className='mt-2 d-flex justify-content-end'>
                    <button className='btn' onClick={closeModel}>Cancel</button>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </div>
            </form>
        </div >
    )
}

export default StatusModel