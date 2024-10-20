"use client";
import { backgroundColors } from "@/lib/utils";
import { useQuestionStore } from "@/store/quiz-store";
import Image from "next/image";
import { useState } from "react";


const Score = () => {
  const { selectedQuizz, score} = useQuestionStore();
  const [message, setMessage] = useState('');
  let isPassed = false;
  // if (passScore && score >= passScore) {
  //   isPassed = true;
  // }
  if (!selectedQuizz) return null;
  return (
    <div className="quiz flex flex-col gap-4 rounded-xl bg-[#fff] p-10 dark:bg-[var(--slate)]">
      <div className="quiz flex items-center justify-center gap-x-2">
        {/* <div
          className="quiz rounded-lg p-2 sm:p-1"
          style={{ backgroundColor: backgroundColors[selectedQuizz.title] }}
        >
          <Image src={selectedQuizz.icon} alt="arrow" width={30} height={30} />
        </div> */}
        
        <p className="quiz font-bold text-[var(--dark-blue)] dark:text-[var(--white)] text-xl md:text-2xl">
          {selectedQuizz.title}
        </p>
      </div>

      <div className="quiz flex flex-col items-center justify-center gap-4">
        <span className="quiz text-sm font-thin text-[var(--dark-blue)] dark:text-[var(--white)]">
          {selectedQuizz.questions.length} асуултаас
        </span>
        <p className="quiz text-center  font-bold text-[var(--dark-blue)] dark:text-[var(--white)] text-4xl sm:text-5xl lg:text-4xl">
          {score} зөв хариулт!
        </p>
      </div>
      <div className="quiz flex flex-col items-center justify-center gap-4">
        {isPassed ? (
          <div className="quiz flex flex-col items-center justify-center gap-1">
            {' '}
            <p className="quiz text-sm font-thin text-[var(--green)] dark:text-[var(--green)]">
              Баяр хүргэе! end haana ymr event bolohoo helne
            </p>
            {/* <p className="quiz text-sm font-thin text-[var(--green)] dark:text-[var(--green)]">
              {reward} оноо цуглууллаа.
            </p>{' '} */}
          </div>
        ) : (
          <p className="quiz text-sm font-thin text-[var(--red)] dark:text-[var(--red)]">
            end haana ymr event bolohoo helne
          </p>
        )}
      </div>
    </div>
  );
};

export default Score;
