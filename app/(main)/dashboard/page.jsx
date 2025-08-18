import React from 'react'
import { getUserOnboardingStatus, updateUser } from '@/actions/user'
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) {
    redirect('/onboarding');
  }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard