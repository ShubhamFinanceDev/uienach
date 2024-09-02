"use client"

import React, { useEffect } from 'react'

import Link from 'next/link';
import Branding from '@/components/core/Branding';

const HomePage = () => {

    return (
       <div>
        <Branding />
        <div className='containermainpage'>
        <h2>E-Nach Registration || E-Nach Cancelation</h2><br/>
        <p>eNACH stands for electronic NACH and utilizes the services of NPCI’s National Automated Clearing House (NACH)</p>
        <div className='d-flex gap-2 mt-4 '>
            <Link href="/client">
                <button className='btn btn-primary'>Enach Registration</button>
            </Link>
            <Link href="/enachCancelation">
                <button className='btn btn-primary'>Enach Cancelation</button>
            </Link>
        </div>
    </div>
</div>
    )
}

export default HomePage