'use client'

import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { useAuthContextHook } from '@/context/use-auth-context'
import { Spinner } from '@/components/spinner'
import TypeSelectionForm from './type-selection-form'

// Dynamically import the form components with SSR disabled and a loading spinner
const DetailForm = dynamic(() => import('./account-details-form'), {
  ssr: false,
  loading: () => <Spinner noPadding={true} />,
})

const OTPForm = dynamic(() => import('./otp-form'), {
  ssr: false,
  loading: () => <Spinner noPadding={true} />,
})

type Props = {}

// Main registration form step component
const RegistrationFormStep = (props: Props) => {
  const { register, formState: { errors }, setValue } = useFormContext()
  const { currentStep } = useAuthContextHook()

  const [onOTP, setOnOTP] = useState<string>('')
  const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner')

  // Set OTP value in the form when it updates
  useEffect(() => {
    setValue('otp', onOTP)
  }, [onOTP, setValue])

  // Render the corresponding form component based on the current step
  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      )
    case 2:
      return (
        <DetailForm
          errors={errors}
          register={register}
        />
      )
    case 3:
      return (
        <OTPForm
          onOTP={onOTP}
          setOTP={setOnOTP}
        />
      )
    default:
      return <div>Invalid step. Please refresh the page or try again.</div>
  }
}

export default RegistrationFormStep
