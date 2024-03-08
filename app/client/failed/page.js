import React from 'react'

const Failed = ({ searchParams }) => {
    return (

        <div className='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'red', fontSize: '36px' }}>Failed </h1>
                <p>Enach registration failed due to {JSON.stringify(searchParams)}</p>
            </div>
        </div>

    )
}

export default Failed
