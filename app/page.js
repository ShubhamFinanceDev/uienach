"use client"

import React, { useEffect } from 'react'

import useAuthHooks from '@/hooks/useAuthHooks'
import Link from 'next/link';

const HomePage = () => {

    const { userLoginHandler } = useAuthHooks();


    useEffect(() => {
        userLoginHandler()
    }, [])

    return (
        <div>
            <h2>Online eNACH (eMandate)</h2>

            <Link href="/client">
                <button className='btn btn-primary mt-5'>Click to proceed</button>
            </Link>
        </div>
    )
}

export default HomePage