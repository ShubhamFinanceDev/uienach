"use client"

import React, { useEffect } from 'react'

import Link from 'next/link';
import Branding from '@/components/core/Branding';

const HomePage = () => {



    return (
        <div>
            <Branding />
            <h2>E-Nach Registration</h2>
            <p>eNACH stands for electronic NACH and utilizes the services of NPCI’s National Automated Clearing House (NACH)</p>

            <Link href="/client">
                <button className='btn btn-primary mt-5'>Click to proceed</button>
            </Link>
        </div>
    )
}

export default HomePage