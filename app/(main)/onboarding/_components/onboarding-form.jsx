'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema } from '@/lib/schema';

const OnboardingForm = ({industries}) => {
const router = useRouter();
const [selectedIndustry, setSelectedIndustry] = useState(null);

const {
  register,
  handleSubmit,
  formState:{errors},
  setValue,
  watch
}=useForm({resolver: zodResolver(onboardingSchema)});

  return (
    <div>OnboardingForm</div>
  )
}

export default OnboardingForm