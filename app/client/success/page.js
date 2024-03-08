import React from 'react';

const Success = ({ searchParams }) => {
    return (
        <div className='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 style={{ color: 'green', fontSize: '36px' }}>Success</h1>
            <p>Enach registration successfully.</p>
        </div>
    );
}

export default Success;