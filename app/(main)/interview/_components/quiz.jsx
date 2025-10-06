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
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";



export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0); //track current question index
    const [answers, setAnswers] = useState([]); //store user's answers 
    const [showExplanation, setShowExplanation] = useState(false);

    // fetching from generateQuiz  functions in interview.js
    const {
        loading: generatingQuiz, //boolean
        fn: generateQuizFn,
        data: quizData, //array of questions that contains question, options, correctAnswer, explanation that came from interview.js
    } = useFetch(generateQuiz);

    // fetching from  saveQuizResult functions in interview.js
    const {
        loading: savingResult,
        fn: saveQuizResultFn,
        data: resultData,
        setData: setResultData,
    } = useFetch(saveQuizResult);

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null));
        }
    }, [quizData]); //if quizData changes, initialize answers array 


    //----------------------Functions---------------------- 

    //Handle answer  
    const handleAnswer = (answer) => {
        const newAnswers = [...answers]; // Create a copy of the answers array first
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    };


    //handle next question or finish quiz
    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowExplanation(false);
        } else {
            finishQuiz();
        }
    };

    // Calculate score (answer contains the selected answers and the quizData contains the correct answers that came from interview.js)
    const calculateScore = () => {
        let correct = 0;
        answers.forEach((answer, index) => {
            if (answer === quizData[index].correctAnswer) {
                correct++;
            }
        });
        return (correct / quizData.length) * 100;
    };

    const finishQuiz = async () => {
        const score = calculateScore();
        try {
            await saveQuizResultFn(quizData, answers, score);
            toast.success("Quiz completed!");
        } catch (error) {
            toast.error(error.message || "Failed to save quiz results");
        }
    };

    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        generateQuizFn();
        setResultData(null);
    };

    // loder
    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray" />;
    }

    // Show results if quiz is completed
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

    // If no quiz data, show start quiz card
    if (!quizData) {
        return (
            <Card className="mx-2 hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] transition-ease duration-300 ">
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

                {showExplanation && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-medium">Explanation:</p>
                        <p className="text-muted-foreground">{question.explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">

                {!showExplanation && (
                    <Button
                        onClick={() => setShowExplanation(true)}
                        variant="outline"
                        disabled={!answers[currentQuestion]}
                    >
                        Show Explanation
                    </Button>
                )}

                <Button onClick={handleNext} disabled={!answers[currentQuestion] || savingResult} className="ml-auto">
                    {savingResult && (<BarLoader className="mt-4" width={"100%"} color="gray" />)}
                    {currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
            </CardFooter>

        </Card>
    );
}
