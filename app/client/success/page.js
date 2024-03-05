"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Success = () => {
    const searchParams = useSearchParams()
    const [params, setParams] = useState({})

    useEffect(() => {
        const para = Object.fromEntries(searchParams.entries())
        setParams(para)
    }, [])


    return (
        <div>
            <h1>Success page</h1>

            <p>Response: {JSON.stringify(params)}</p>
        </div>
    )
}

export default Success
