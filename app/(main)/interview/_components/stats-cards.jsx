"use client";
import { Brain, Target, Trophy , Award} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
    const getAverageScore = () => {
        if (!assessments?.length) return 0; //if not null or length 0 
        const total = assessments.reduce(
            (sum, assessment) => sum + assessment.quizScore, 0);
        return (total / assessments.length).toFixed(1);
    };

    const getLatestAssessment = () => {
        if (!assessments?.length) return null;
        return assessments[assessments.length - 1].quizScore.toFixed(1);
    }; //<p className="text-sm text-muted-foreground ">No assessments found.</p>


    const getTotalQuestions = () => {
        if (!assessments?.length) return 0;
        return assessments.reduce(
            (sum, assessment) => sum + assessment.questions.length, 0);
    };

    const Highest = Math.max(...assessments.map(a => a.quizScore));

    return (
        <div className="grid gap-4 md:grid-cols-4">
            <Card className="hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] transition-ease duration-300 ">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Questions Practiced
                    </CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{getTotalQuestions()}</div>
                    <p className="text-xs text-muted-foreground">Total questions</p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] transition-ease duration-300 ">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <Award className="h-4.5 w-4.5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{getAverageScore()}%</div>
                    <p className="text-xs text-muted-foreground">
                        Across all assessments
                    </p>
                </CardContent>
            </Card>



            <Card className="hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] transition-ease duration-300 ">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {getLatestAssessment() || 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">Most recent quiz</p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] transition-ease duration-300 ">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                    <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{Highest}%</div>
                    <p className="text-xs text-muted-foreground">
                        Across all assessments
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}