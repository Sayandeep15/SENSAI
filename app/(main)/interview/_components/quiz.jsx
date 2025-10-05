"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
// import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";



export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch(generateQuiz);

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null));
        }
    }, [quizData]); //if quizData changes, initialize answers array 

    const handleAnswer = (answer) => {
    const newAnswers = [...answers]; // Create a copy of the answers array first
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

    // loder
    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray" />;
    }

    // If no quiz data, show start quiz card
    if (!quizData) {
        return (
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Ready to test your knowledge?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This quiz contains 10 questions specific to your industry and
                        skills. Take your time and choose the best answer for each question.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={generateQuizFn} className="w-fit">
                        Start Quiz
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    const question = quizData[currentQuestion]; //contains all generated questions


    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle>Question {currentQuestion + 1} of {quizData.length}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-lg font-medium">{question.question}</p>
                <RadioGroup
                    onValueChange={handleAnswer}
                    value={answers[currentQuestion]}
                    className="space-y-2"
                >
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>

        </Card>
    );
}
