import React from 'react'
import { getUserOnboardingStatus, updateUser } from '@/actions/user'
import { redirect } from "next/navigation";
import DashboardView from './_components/dashboard-view';
import { getIndustryInsights } from '@/actions/dashboard';

const Dashboard = async () => {
  const insights = await getIndustryInsights();
  
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) {
    redirect('/onboarding');
  }
  return (
    <DashboardView insights={insights}/>
  )
}

export default Dashboard