"use client"

import Link from 'next/link'
import React, { useEffect } from 'react'
import { AES256Encryptor, SHA256Hash } from '@/utils/AESEncryption'

const UTIL_CODE = process.env.UTIL_CODE
const SHORT_CODE = process.env.SHORT_CODE
const MERCHANT_CATEGORY_CODE = process.env.MERCHANT_CATEGORY_CODE






const formInput = [
    { type: 'text', info: 'Aesencrypted', id: 'UtilCode', label: 'Util Code', name: 'UtilCode' },
    { type: 'text', info: 'Aesencrypted', id: 'Short_Code', label: 'Short Code', name: 'Short_Code' },
    { type: 'text', info: '', id: 'Merchant_Category_Code', label: 'Merchant Category Code', name: 'Merchant_Category_Code' },
    { type: 'text', info: ' Sha256Hash ', id: 'CheckSum', label: 'Check Sum', name: 'CheckSum' },
    { type: 'text', info: 'plaintext', id: 'MsgId', label: 'MsgId', name: 'MsgId' },
    { type: 'text', info: 'Aesencrypted', id: 'Customer_Name', label: 'Customer Name', name: 'Customer_Name' },
    { type: 'text', info: 'Aesencrypted', id: 'Customer_EmailId', label: 'Customer Email', name: 'Customer_EmailId' },
    { type: 'text', info: 'Aesencrypted', id: 'Customer_Mobile', label: 'Customer Mobile', name: 'Customer_Mobile' },
    { type: 'text', info: 'Aesencrypted', id: 'Customer_AccountNo', label: 'Customer Account No', name: 'Customer_AccountNo' },
    { type: 'date', info: 'yyyy-MM-dd', id: 'Customer_StartDate', label: 'Customer Start Date', name: 'Customer_StartDate' },
    { type: 'date', info: 'yyyy-MM-dd', id: 'Customer_ExpiryDate', label: 'Customer Expiry Date', name: 'Customer_ExpiryDate' },
    { type: 'number', info: 'decimal', id: 'Customer_DebitAmount', label: 'Customer Debit Amount', name: 'Customer_DebitAmount' },
    { type: 'number', info: 'decimal', id: 'Customer_MaxAmount', label: 'Customer Max Amount', name: 'Customer_MaxAmount' },
    { type: 'text', info: 'plaintext', id: 'Customer_DebitFrequency', label: 'Customer Debit Frequency', name: 'Customer_DebitFrequency' },
    { type: 'text', info: 'plaintext', id: 'Customer_SequenceType', label: 'Customer Sequence Type', name: 'Customer_SequenceType' },
    { type: 'text', info: 'plaintext', id: 'Customer_InstructedMemberId', label: 'Customer Instructed Member Id', name: 'Customer_InstructedMemberId' },
    { type: 'text', info: 'Aesencrypted', id: 'Customer_Reference1', label: 'Customer Reference 1', name: 'Customer_Reference1' },
    { type: 'text', info: 'Aesencrypted', id: 'Customer_Reference2', label: 'Customer Reference 2', name: 'Customer_Reference2' },
    { type: 'text', info: 'plaintext', id: 'Channel', label: 'Channel', name: 'Channel' },
    { type: 'text', info: 'plaintext', id: 'Filler1', label: 'Filler 1', name: 'Filler1' },
    { type: 'text', info: 'plaintext', id: 'Filler2', label: 'Filler 2', name: 'Filler2' },
    { type: 'text', info: 'plaintext', id: 'Filler3', label: 'Filler 3', name: 'Filler3' },
    { type: 'text', info: 'plaintext', id: 'Filler4', label: 'Filler 4', name: 'Filler4' },
    { type: 'text', info: 'plaintext', id: 'Filler5', label: 'Filler 5', name: 'Filler5' },
    { type: 'text', info: 'plaintext', id: 'Filler6', label: 'Filler 6', name: 'Filler6' },
    { type: 'text', info: 'plaintext', id: 'Filler7', label: 'Filler 7', name: 'Filler7' },
    { type: 'text', info: 'plaintext', id: 'Filler8', label: 'Filler 8', name: 'Filler8' },
    { type: 'text', info: 'plaintext', id: 'Filler9', label: 'Filler 9', name: 'Filler9' },
    { type: 'text', info: 'plaintext', id: 'Filler10', label: 'Filler 10', name: 'Filler10' },
]

const state = {
    UtilCode: UTIL_CODE,
    Short_Code: SHORT_CODE,
    Merchant_Category_Code: MERCHANT_CATEGORY_CODE,

    CheckSum: "",


    MsgId: "1",
    Customer_Name: "Abhishek Kumar",
    Customer_EmailId: "",
    Customer_Mobile: "9661329042",
    Customer_StartDate: "2024-03-01",
    Customer_ExpiryDate: "2025-03-01",
    Customer_DebitAmount: "100.00",
    Customer_MaxAmount: "",
    Customer_DebitFrequency: "MNTH",
    Customer_SequenceType: "RCUR",
    Customer_AccountNo: "50200003144866",       //c
    Customer_InstructedMemberId: "HDFC0003354", // IFSC Code        cc
    Customer_Reference1: "",
    Customer_Reference2: "",
    Channel: "Net",     // Debit || Net
    Filler1: "",
    Filler2: "",
    Filler3: "",
    Filler4: "",
    Filler5: "S",       // “S” for Savings , “C” for Current or “O” “Other”
    Filler6: "",
    Filler7: "",
    Filler8: "",
    Filler9: "",
    Filler10: "",
}


const EnachClient = () => {
    const { Customer_AccountNo, Customer_StartDate, Customer_ExpiryDate, Customer_DebitAmount, Customer_MaxAmount } = state
    useEffect(() => {
        console.log('+++ AES256Encryptor("abhinay")', AES256Encryptor("abhinay"));
        console.log('+++ SHA256Hash', SHA256Hash([Customer_AccountNo, Customer_StartDate, Customer_ExpiryDate, Customer_DebitAmount, Customer_MaxAmount]));
    }, [])
    return (
        <div className='container'>

            {/* logo */}

            <div className="row">
                {formInput.map((d, idx) => {
                    return (
                        <div className="col-md-6 col-12 mt-3" key={`form_input__${d.name + d.idx}`}>
                            <label htmlFor={d.id}>{d.label}</label>
                            <input type={d.type} id={d.id} name={d.name} className='form-control' />
                            <p className='info'>Output: {d.info}</p>
                        </div>
                    )
                })}
            </div>
            <Link href="/client/success">
                <button className='btn btn-primary mt-3 mb-3'>Submit</button>
            </Link>
        </div>
    )
}

export default EnachClient

// "\\x0d074fa502751940dddcf51e86b7ba01"
// U2FsdGVkX1/atodxuvDZSBonUOJvZ3DKyAxVe93XyS0=