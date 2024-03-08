import React from 'react'

const Failed = ({ searchParams }) => {
    return (
        <div>
            <h1>Failed page</h1>
            <p>Response: {JSON.stringify(searchParams)}</p>
        </div>
    )
}

export default Failed
