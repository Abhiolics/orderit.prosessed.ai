"use client"
import React from 'react'
import Home from './components/LandingPage'
import IntegrationComponent from './components/integration'
import PricingPlans from './components/pricing-plans'
import LoginPage from './components/login'

const page = () => {
  return (
    <div>
    {/* <Home/>
    <IntegrationComponent/>
    <PricingPlans/> */}
    <LoginPage/>
    </div>
  )
}

export default page
