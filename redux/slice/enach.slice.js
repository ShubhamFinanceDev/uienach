import { createSlice } from '@reduxjs/toolkit'
const UTIL_CODE = process.env.NEXT_PUBLIC_UTIL_CODE
const SHORT_CODE = process.env.NEXT_PUBLIC_SHORT_CODE
// const MERCHANT_CATEGORY_CODE = process.env.NEXT_PUBLIC_MERCHANT_CATEGORY_CODE

const initialState = {
    // Customer_AccountNo: "50200003144866",
    // Customer_InstructedMemberId: "HDFC0003354",

    Customer_AccountNo: "",
    Customer_InstructedMemberId: "",
    Filler5: "",       // “S” for Savings , “C” for Current or “O” “Other”




    UtilCode: UTIL_CODE,
    Short_Code: SHORT_CODE,
    // Merchant_Category_Code:MERCHANT_CATEGORY_CODE,
     Merchant_Category_Code:"",

    CheckSum: "",


    MsgId: "1",
    Customer_Name: "",
    Customer_EmailId: "",
    Customer_Mobile: "",
    Customer_StartDate: "",
    Customer_ExpiryDate: "",
    Customer_DebitAmount: "",
    Customer_MaxAmount: "",
    Customer_DebitFrequency: "",
    Customer_SequenceType: "RCUR",
    Customer_Reference1: "",
    Customer_Reference2: "",
    Channel: "",     // Debit || Net
    Filler1: "",
    Filler2: "",
    Filler3: "",
    Filler4: "",
    Filler6: "",
    Filler7: "",
    Filler8: "",
    Filler9: "",
    Filler10: "",
}

const EnachSlice = createSlice({
    name: "Enach",
    initialState,
    reducers: {
        setEnachValue: (state, action) => {
            Object.assign(state, action.payload);
        },
    },
})

export const { setEnachValue } = EnachSlice.actions
export default EnachSlice.reducer