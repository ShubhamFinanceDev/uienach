import React from 'react'

const Success = ({ searchParams }) => {
    return (
        <div>
            <h1>Success page</h1>
            <p>Response: {JSON.stringify(searchParams)}</p>
        </div>
    )
}

export default Success
