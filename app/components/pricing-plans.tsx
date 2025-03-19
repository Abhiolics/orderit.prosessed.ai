"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly")

  const pricingPlans = [
    {
      name: "Pro",
      badge: "Pro",
      description:
        "Ideal for those who've already got their website up and running and are seeking assistance to enhance and update it further.",
      price: billingCycle === "monthly" ? 2500 : 2250,
      features: [
        "3-5 day turnaround",
        "Native Development",
        "Task delivered one-by-one",
        "Dedicated dashboard",
        "Updates via Dashboard & Slack",
      ],
      cta: "Get started",
      ctaAction: () => console.log("Pro plan selected"),
      highlighted: false,
    },
    {
      name: "Pro Plus",
      badge: "Pro Plus",
      description: "Ideal if you want to build or scale your website fast, with the strategy calls included.",
      price: billingCycle === "monthly" ? 3800 : 3420,
      features: [
        "1-3 day turnaround",
        "Monthly strategy call",
        "Commercial license",
        "Native Development",
        "Tasks delivered one-by-one",
        "Dedicated dashboard",
        "Updates via Dashboard & Slack",
      ],
      cta: "Get started",
      ctaAction: () => console.log("Pro Plus plan selected"),
      highlighted: false,
    },
    {
      name: "Custom",
      badge: "Custom",
      description:
        "If these plans don't fit, let's create one that suits. Customize your subscription for a perfect fit, bigger or smaller!",
      price: null,
      priceLabel: "Let's Talk!",
      features: [
        "Everything in design & development",
        "Strategy workshop",
        "Priority support",
        "Multiple tasks at once",
        "Ongoing autonomous A/B testing",
        "Advanced custom development",
      ],
      cta: "Book a Call",
      ctaAction: () => console.log("Custom plan selected"),
      highlighted: true,
    },
  ]

  return (
    <div className="relative">
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Choose your right plan!</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from best plans, ensuring a perfect match. Need more or less?
            <br className="hidden sm:block" />
            Customize your subscription for a seamless fit!
          </p>
        </div>

        {/* SVG Wave Divider */}
      <div className="relative w-full overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-32 text-white"
          viewBox="0 0 1440 320"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,160L60,149.3C120,139,240,117,360,112C480,107,600,117,720,149.3C840,181,960,235,1080,234.7C1200,235,1320,181,1380,154.7L1440,128V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
          ></path>
        </svg>
      </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 inline-flex shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                billingCycle === "monthly" ? "bg-purple-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("quarterly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                billingCycle === "quarterly" ? "bg-purple-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Quarterly (save 10%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 ${
                plan.highlighted ? "bg-purple-50 border border-purple-100" : ""
              }`}
            >
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-purple-500 text-white rounded-full">
                    {plan.badge}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 min-h-[80px]">{plan.description}</p>
                <div className="mb-6">
                  {plan.price ? (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900 transition-all duration-500">
                        ${plan.price}
                      </span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-purple-700 transition-all duration-500">
                      {plan.priceLabel}
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start group">
                      <div className="flex-shrink-0 transition-all duration-300 transform group-hover:scale-110 group-hover:text-purple-500">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={plan.ctaAction}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                    plan.highlighted
                      ? "bg-gray-800 text-white hover:bg-gray-900 hover:shadow-lg"
                      : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

