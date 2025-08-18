import { LineChart, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'

const DashboardView  = ({insights}) => {
    // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  const getDemgetMarketOutlookInfo  = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return {icon: TrendingUp ,color:"bg-green-500"};
      case "neutral":
        return {icon: LineChart ,color:"bg-yellow-500"};
      case "negative":
        return {icon: TrendingDown ,color:"bg-red-500"};
      default:
        return {icon: LineChart ,color:"bg-gray-500"};
    }
  };
  const OutlookIcon =getDemgetMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor  =getDemgetMarketOutlookInfo(insights.marketOutlook).color
 


  return (
    <div>DashboardView </div>
  )
}

export default DashboardView 
