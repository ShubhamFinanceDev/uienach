import React from 'react';

const Success = ({ searchParams }) => {
    const { loanNo = "", MsgId = "" } = searchParams
    return (
        <div className='container success-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>

            <h1
                style={{ color: 'green', fontSize: '36px' }}
            >
                Enach registration successfully completed.
            </h1>
            <p className='mt-3'>for Loan No. {loanNo} and generated transaction no is {MsgId}.</p>
        </div>
    );
}

export default Success;