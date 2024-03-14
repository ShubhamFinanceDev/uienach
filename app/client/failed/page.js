import React from 'react';

const Failed = ({ searchParams }) => {
    const { loanNo = ""} = searchParams

    return (
        <div className='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'red', fontSize: '36px' }}>Enach registration has been failed.</h1>
                <p className='mt-3'>for loan no {loanNo}.</p>
                <p className='mt-3'>{searchParams?.reason || ""}</p>

            </div>
        </div>
    );
};

export default Failed;
