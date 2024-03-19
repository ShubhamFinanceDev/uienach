"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import useLogicHooks from '@/hooks/useLogicHooks';
import InputWithLabel from '@/components/input/InputWithLabel';
import Branding from '@/components/core/Branding';
import SelectWithLabel from '@/components/input/SelectWithLabel';
import RadioWithLabel from '@/components/input/RadioWithLabel';
import axios from 'axios';
import { api } from '@/services/endpoint';

const formInput = [
    { isReadOnly: true, type: 'text', info: 'Aesencrypted', id: 'Customer_Name', label: 'Account Holder Name', name: 'Customer_Name' },
    { isReadOnly: true, type: 'text', info: 'Aesencrypted', id: 'Customer_EmailId', label: 'Email', name: 'Customer_EmailId' },
    { isReadOnly: true, type: 'text', info: 'Aesencrypted', id: 'Customer_Mobile', label: 'Mobile No.', name: 'Customer_Mobile' },
];

const formInput2 = [
    { isRequired: true, type: 'text', info: 'Aesencrypted', id: 'Customer_AccountNo', label: 'Bank Account No', name: 'Customer_AccountNo' },
    { isRequired: true, type: 'text', info: 'plain text', id: 'Customer_InstructedMemberId', label: 'IFSC Code', name: 'Customer_InstructedMemberId' },
    { isReadOnly: true, type: 'date', info: 'yyyy-MM-dd', id: 'Customer_StartDate', label: 'Start Date', name: 'Customer_StartDate' },
    { isReadOnly: true, type: 'date', info: 'yyyy-MM-dd', id: 'Customer_ExpiryDate', label: 'Expiry Date', name: 'Customer_ExpiryDate' },
    { isReadOnly: true, type: 'number', info: 'decimal', id: 'Customer_MaxAmount', label: 'Sensation Amount', name: 'Customer_MaxAmount' },
    // {  type: 'number', info: 'decimal', id: 'Customer_DebitAmount', label: 'Sensation Amount', name: 'Customer_DebitAmount' },
];

const selectInput = [
    {
        options: [
            { name: "Saving Account", value: "S" },
            { name: "Current Account", value: "C" }
        ], isRequired: true, info: 'plaintext', id: 'Filler5', label: 'Account Type', name: 'Filler5'
    },
];

const selectPayment = [
    {
        options: [
            { name: "Net-banking", value: "Net" },
            { name: "Debit Card", value: "Debit" }
        ], isRequired: true, info: 'plaintext', id: 'Channel', label: 'Payment Method', name: 'Channel'
    },
];
const selectMandateType = [
    {
        options: [
            { name: "E-Mandate", value: "MNTH" },
            { name: "Security-Mandate", value: "ADHO" }
        ], isRequired: true, info: 'plaintext', id: 'Customer_DebitFrequency', label: 'Mandate Type', name: 'Customer_DebitFrequency'
    },
];
const selectgetLiveBankDtls = [
    {      options: [
        ], isRequired: true, info: 'plaintext', id: 'bankName', label: 'Bank Name', name: 'bankName'
    },
];

const EnachClient = () => {
    const router = useRouter();
    const { enachState, retrieveData, enachChangeHandler, enachSubmitHandler, debitFrequencyChangeHandler } = useLogicHooks()
    const [liveBankData, setLiveBankData] = useState([]);

    const paymentMerchent = async () => {
        try {
            const {data} = await axios.get(api.paymentmerchentType())
            setLiveBankData(data);
            console.log(data);
            
        } catch (error) {
            
        }

    }

    useEffect(() => {
        paymentMerchent()
        retrieveData();
    }, []);

    return (
        <div className='container'>
            {/* {JSON.stringify(liveBankData)} */}
            <Branding />
            <form className="row" onSubmit={enachSubmitHandler}>
                {formInput.map((d) => (
                    <InputWithLabel
                        key={`form_input__${d.name}`}
                        feild={d}
                        state={enachState}
                        onChangeHandler={enachChangeHandler}
                    />
                ))}
                <div style={{ margin: '20px 0' }}></div>
                <hr/>
                {selectgetLiveBankDtls.map((d) => (
                    <SelectWithLabel
                        key={`form_input__${d.name}`}
                        feild={d}
                        state={enachState}
                        onChangeHandler={debitFrequencyChangeHandler}
                    />
                ))}
                {selectMandateType.map((d) => (
                    <SelectWithLabel
                        key={`form_input__${d.name}`}
                        feild={d}
                        state={enachState}
                        onChangeHandler={debitFrequencyChangeHandler}
                    />
                ))}
                {selectPayment.map((d) => (
                    <RadioWithLabel
                        key={`form_input__${d.name}`}
                        feild={d}
                        state={enachState}
                        onChangeHandler={enachChangeHandler}
                    />
                ))}
                {selectInput.map((d) => (
                    <SelectWithLabel
                        key={`form_input__${d.name}`}
                        feild={d}
                        state={enachState}
                        onChangeHandler={enachChangeHandler}
                    />
                ))}
                {formInput2.map((d) => (
                    <InputWithLabel
                        key={`form_input__${d.name}`}
                        feild={d}
                        state={enachState}
                        onChangeHandler={enachChangeHandler}
                        value={enachState.Customer_MaxAmount}
                    />
                ))}
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6 col-12">
                        <button className='btn btn-primary mt-3 mb-3' type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EnachClient;