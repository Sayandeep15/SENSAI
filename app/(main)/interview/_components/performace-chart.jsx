"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";


export default function PerformanceChart({ assessments }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (assessments) {
            const formattedData = assessments.map((assessment) => ({
                date: format(new Date(assessment.createdAt), "MMM dd"),
                score: assessment.quizScore,
            }));
            setChartData(formattedData);
        }
    }, [assessments]);

    const maxScore = Math.max(...assessments.map(a => a.quizScore));
    const totalScore = (assessments.length > 0) ?(assessments.reduce((sum, a) => sum + a.quizScore, 0)):0;
    const avgScore = (assessments.length > 0) ? (totalScore / assessments.length) : 0;



    return (
        <Card>
            <CardHeader>
                <CardTitle className="gradient-title text-3xl md:text-4xl">
                    Performance Trend
                </CardTitle>
                <CardDescription>Your quiz scores over time</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" className="text-sm " />
                            <YAxis domain={[0, 100]} className="text-sm " />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload?.length) {
                                        return (
                                            <div className="backdrop-blur-md bg-blue-400/20 border rounded-lg p-2 shadow-md">

                                                <p className="text-sm font-medium">
                                                    Score: {payload[0].value}%
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {payload[0].payload.date}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <ReferenceLine y={maxScore} label="Max" stroke="#BEF7FF" />
                            <ReferenceLine y={avgScore} label="Avg" stroke="#458CFF" />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#66ccff"
                                strokeWidth={2.5}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    
                </div>
                <div className="flex-row mt-2">
                    <p className="text-xs flex flex-col "> Max: {maxScore}%</p>
                    <p className="text-xs ">Avg: {avgScore}%</p>
                </div>
                
            </CardContent>
        </Card>
    );
}

// active mean hover on tooltip and payload is the data point info