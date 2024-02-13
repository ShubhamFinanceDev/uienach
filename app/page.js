"use client"

import React, { useEffect } from 'react'

import useAuthHooks from '@/hooks/useAuthHooks'

const HomePage = () => {

    const { userLoginHandler } = useAuthHooks();


    useEffect(() => {
        userLoginHandler()
    }, [])

    return (
        <div>HomePage</div>
    )
}

export default HomePage