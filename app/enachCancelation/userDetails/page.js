"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import useLogicHooks from '@/hooks/useLogicHooks';
import InputWithLabel from '@/components/input/InputWithLabel';
import Branding from '@/components/core/Branding';
import SelectWithLabel from '@/components/input/SelectWithLabel';
import { useSelector } from 'react-redux';
 
 
const UserDetailsPage = () => {
    const {applicationDetails = {}, loansDetails = []} = useSelector(state => state.enacCancelationSlice)
    return (
        <>
        <Branding/>
          <div className='container'>
          <div className='heading mt-5'>
              <h2 className='mb-1'>E-Nach Cancelation</h2>
               <p className='mb-3'>Create or modify mandate for future payment.</p>
            </div>
            <form onSubmit={() => {}} className='w-100'>

                <InputWithLabel
                    feild={{
                        name : "customerName",
                        label : "customerName",
                    }}
                    state={applicationDetails}
                />

                <InputWithLabel
                    feild={{
                        name : "applicationNo",
                        label : "applicationNo",
                    }}
                    state={applicationDetails}
                />

                <InputWithLabel
                    feild={{
                        name : "mobileNo",
                        label : "mobileNo"
                    }}
                    state={applicationDetails}
                />


                <div className='mt-4'></div>
                {loansDetails.map((d, idx) => (
                    <div key={`loan_detail_${idx}`}>
                        <InputWithLabel
                            feild={{
                                label : "Loan No",
                                name : "loanNo"
                            }}
                            state={d}
                            />
                        <InputWithLabel
                            feild={{
                                label : "Status",
                                name : "status_text"
                            }}
                            state={d}
                            />
                            

                            <button className='btn btn-primary' disabled={d.status == "A"}>Mandate Cancel</button>
                        {/* <SelectWithLabel
                            feild={{
                                name : "status",
                                label : "status",
                                options: [
                                    {name : "Loan Cancelled", value : "A"},
                                    {name : "Loan Closed", value : "K"},
                                ]
                            }}
                            state={d}
                        
                        /> */}

                    </div>

                ))}

            </form>
        </div>
        </>
    );
};
 
export default UserDetailsPage;
