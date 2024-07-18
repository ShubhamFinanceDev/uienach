import React from 'react';

const Success = ({ searchParams }) => {
    const { applicationNo = "", MsgId = "", mandateType="", amount=""} = searchParams
    return (
        <div className='container success-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>

            <h1
                style={{ color: 'green', fontSize: '25px' }}
            >
                Enach registration successfully completed for {mandateType} of loan amount {amount}.
            </h1>
            <p className='mt-3'>Reference transaction No. {MsgId} for application No. {applicationNo}.</p>
        </div>
    );
}

export default Success;