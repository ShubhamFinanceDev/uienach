'use client'

import React, { useEffect, useState } from 'react'
import InputWithLabel from '../input/InputWithLabel'
import SelectWithLabel from '../input/SelectWithLabel'
import useLogicHooks from '@/hooks/useLogicHooks'

const StatusModel = (props) => {
    const { loanStatus, loanStatusChangeHandler, loanStatusSubmitHandler, StatusDefaultStateHandler } = useLogicHooks()
    const { closeModel, applicationNo, loanNo } = props

    useEffect(() => {
        StatusDefaultStateHandler({ applicationNo, loanNo })
    }, [applicationNo, loanNo])

    return (
        <div className='model-container'>
            {JSON.stringify(props)}
            <p className='mb-3'>Loan Cancelation Acknowledgement</p>
            <form onSubmit={loanStatusSubmitHandler} className='row'>
                <InputWithLabel
                feild={{
                    name: "applicationNo",
                    label: "applicationNo",
                  }}
                  state={loanStatus}
                  isDisabled
                />

               <InputWithLabel
                feild={{
                    name: "loan No",
                    label: "loanNo",
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
                    // className={['col-12 mb-2', 'col-12', 'col-12']}

                />


                <div className='mt-2 d-flex justify-content-end'>
                    <button className='btn'onClick={closeModel}>Cancel</button>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </div>
            </form>
        </div >
    )
}

export default StatusModel