"use client"
import React from 'react'
import { useSelector } from "react-redux"

const userDetailsPage = () => {
const enacCancel = useSelector(state => state.enacCancelation.enacCancel)

  return (
    <div>
      {JSON.stringify(enacCancel)}
    </div>
  )
}

export default userDetailsPage
