"use client";
import { cn } from "@/lib/utils";
import { useQuestionStore } from "@/store/quiz-store";
import Image from "next/image";
import { useState, useEffect } from "react";
import Answer from "../atoms/answer";

type AnswersProps = {
  data: string[];
  handleAnswer: (questionId: number, answer: string) => void;
  questionId: number;
  goNextQuestion: () => void;
};

const Answers = ({
  data,
  handleAnswer,
  questionId,
  goNextQuestion,
}: AnswersProps) => {
  const [selectedAns, setSelectedAns] = useState("");
  const { questions, onCompleteQuestions } = useQuestionStore();
  const isCorrectUserAnswer = questions.find(
    (q) => q.id === questionId
  )?.isCorrectUserAnswer;
  const isLastQuestion = questionId === questions.length;

  const answerLabels = ["A", "B", "C", "D"];

  const handleSelectAnswer = (answer: string) => {
    if (selectedAns === answer) {
      setSelectedAns("");
      return;
    }
    setSelectedAns(answer);
  };

  const handleSubmit = () => {
    if (!selectedAns) return;
    
    handleAnswer(questionId, selectedAns);
    
    if (isLastQuestion) {
      onCompleteQuestions();
    } else {
      goNextQuestion();
    }
    
    setSelectedAns("");
  };

  return (
    <>
      <ul className="flex flex-col gap-y-4 justify-center w-full">
        {data.map((answer, index) => (
          <Answer
            key={answer}
            answer={answer}
            selectedAns={selectedAns}
            isCorrectUserAnswer={isCorrectUserAnswer!}
            handleSelectAnswer={handleSelectAnswer}
            index={index}
            answerLabels={answerLabels}
          />
        ))}
      </ul>

      <button
        onClick={handleSubmit}
        disabled={!selectedAns}
        className="w-full bg-purple py-4 px-5 rounded-xl shadow-lg text-white font-semibold text-lg text-center disabled:opacity-50"
      >
        {isLastQuestion ? "Дуусгах" : "Үргэлжлүүлэх"}
      </button>
    </>
  );
};

export default Answers;