"use client"

import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

function Search() {
    const searchParams = useSearchParams()
    const [params, setParams] = useState({})

    useEffect(() => {
        const para = Object.fromEntries(searchParams.entries())
        setParams(para)
    }, [])

    return (
        <p>Response: {JSON.stringify(params)}</p>
    )
}

const Success = () => {


    return (
        <Suspense>
            <h1>Success page</h1>
            <Search />
        </Suspense>
    )
}

export default Success
