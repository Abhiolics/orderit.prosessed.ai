"use client"
import React from 'react'
import Home from './components/LandingPage'
import IntegrationComponent from './components/integration'
import PricingPlans from './components/pricing-plans'

const page = () => {
  return (
    <div>
    <Home/>
    <IntegrationComponent/>
    <PricingPlans/>
    </div>
  )
}

export default page
