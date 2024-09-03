"use client"

import React, { useEffect } from 'react'

import Link from 'next/link';

const HomePage = () => {

    return (
        <div className='containermainpage mt-5'>
            <h2>E-Nach Registration || E-Nach Cancellation</h2><br />
            <p>eNACH stands for electronic NACH and utilizes the services of NPCI’s National Automated Clearing House (NACH)</p>
            <div className='d-flex gap-2 mt-4 '>
                <Link href="/client">
                    <button className='btn btn-primary'>Enach Registration</button>
                </Link>
                <Link href="/enach-cancellation">
                    <button className='btn btn-primary'>Enach Cancellation</button>
                </Link>
            </div>
        </div>
    )
}

export default HomePage