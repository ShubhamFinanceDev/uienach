"use client"

import Link from 'next/link'
import React, { useEffect } from 'react'
import { AES256Encryptor, SHA256Hash } from '@/utils/AESEncryption'
import useLogicHooks from '@/hooks/useLogicHooks'
import InputWithLabel from '@/components/input/InputWithLabel'
import Branding from '@/components/core/Branding'
import SelectWithLabel from '@/components/input/SelectWithLabel'


const formInput = [
    { isReadOnly: true, type: 'text', info: 'Aesencrypted', id: 'Customer_Name', label: 'Name', name: 'Customer_Name' },
    { isReadOnly: true, type: 'text', info: 'Aesencrypted', id: 'Customer_EmailId', label: 'Email', name: 'Customer_EmailId' },
    { isReadOnly: true, type: 'text', info: 'Aesencrypted', id: 'Customer_Mobile', label: 'Mobile', name: 'Customer_Mobile' },
]

const formInput2 = [
    { isRequired: true, type: 'text', info: 'Aesencrypted', id: 'Customer_AccountNo', label: 'Account No', name: 'Customer_AccountNo' },
    { isReadOnly: true, type: 'date', info: 'yyyy-MM-dd', id: 'Customer_StartDate', label: 'Start Date', name: 'Customer_StartDate' },
    { isReadOnly: true, type: 'date', info: 'yyyy-MM-dd', id: 'Customer_ExpiryDate', label: 'Expiry Date', name: 'Customer_ExpiryDate' },
    { isReadOnly: true, type: 'number', info: 'decimal', id: 'Customer_DebitAmount', label: 'Debit Amount', name: 'Customer_DebitAmount' },
]

const selectInput = [{ options: [{ name: "Saving Account", value: "S" }, { name: "Current Account", value: "C" }], isRequired: true, info: 'plaintext', id: 'Filler5', label: 'Account Type', name: 'Filler5' }]



const EnachClient = () => {

    const { enachState, retrieveData, enachChangeHandler, enachSubmitHandler } = useLogicHooks()

    useEffect(() => {
        retrieveData()
    }, [])

    return (
        <div className='container'>
            <Branding />
            <form className="row" onSubmit={enachSubmitHandler}>
                {formInput.map((d) => {
                    return (
                        <InputWithLabel
                            key={`form_input__${d.name}`}
                            feild={d}
                            state={enachState}
                            onChangeHandler={enachChangeHandler}
                        />
                    )
                })}

                {selectInput.map((d) => {
                    return (
                        <SelectWithLabel
                            key={`form_input__${d.name}`}
                            feild={d}
                            state={enachState}
                            onChangeHandler={enachChangeHandler}
                        />
                    )
                })}

                {formInput2.map((d) => {
                    return (
                        <InputWithLabel
                            key={`form_input__${d.name}`}
                            feild={d}
                            state={enachState}
                            onChangeHandler={enachChangeHandler}
                        />
                    )
                })}
                <button className='btn btn-primary mt-3 mb-3' type='submit'>Submit</button>
            </form>
            {/* <Link href="/client/success">
            </Link> */}
        </div>
    )
}

export default EnachClient
