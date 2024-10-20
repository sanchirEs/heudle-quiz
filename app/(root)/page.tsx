'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Game from '@/components/molecules/game';
import MaxWidthWrapper from '@/components/atoms/max-width-wrapper';
import Score from '@/components/atoms/score';
import Subjects from '@/components/atoms/subjects';
import { useQuestionStore } from '@/store/quiz-store';
import { MotionDiv } from '@/components/animated/motion-div';
import { cn } from '@/lib/utils';

export default function Home() {
  const { fetchQuizzes, quizzes, selectedQuizz, hasCompleteAll, reset } =
    useQuestionStore();
  const [exitButton, setExitButton] = useState('Буцах');
  const router = useRouter();

  const handleExit = () => {
    setExitButton('Уншиж байна...');
    reset();
    router.push('/');
  };

  useEffect(() => {
    reset();
    fetchQuizzes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchQuizzes]);

  return (
    <MaxWidthWrapper
      className={cn(
        selectedQuizz && 'xl:place-content-center',
        'relative z-50 grid h-full grid-cols-1 gap-10 px-6 md:grid-cols-2 lg:px-0 xl:gap-20',
      )}
    >
      {!selectedQuizz && (
        <>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" quiz flex flex-col gap-4 md:gap-10 lg:mt-28 xl:mt-0"
          >
            <h1 className=" quiz  font-normal text-[var(--dark-blue)] text-black dark:text-[var(--white)] text-4xl md:text-5xl xl:text-6xl 2xl:text-6xl">
              Тестийн сэдвээ сонгоно уу?
            </h1>
            <p className=" quiz  italic text-[var(--gray-navy)] dark:text-[var(--light-blue)] text-sm xl:text-xl">
              Өдрийн мэнд, <span className=" quiz font-bold">Шалгалт!</span>
            </p>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" quiz flex w-full flex-col justify-center gap-y-4 xl:gap-y-6"
          >
            <Subjects data={quizzes} />
          </MotionDiv>
          <button
            className=" quiz  w-full rounded-xl bg-[var(--red)] px-5 py-4 text-center text-lg font-semibold text-[var(--white)] shadow-lg"
            onClick={handleExit}
          >
            {exitButton}
          </button>
        </>
      )}
      {selectedQuizz && hasCompleteAll === false && <Game />}
      {hasCompleteAll && (
        <>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" quiz flex h-full flex-col gap-3 md:gap-6 lg:mt-20"
          >
            <h1 className=" quiz  font-normal text-[var(--dark-blue)] dark:text-[var(--white)] text-4xl md:text-5xl xl:text-6xl">
              Тест бөглөж дууслаа!
            </h1>
            <p className=" quiz  font-bold text-[var(--dark-blue)] dark:text-[var(--white)] text-4xl md:text-5xl xl:text-6xl">
              Таны оноо...
            </p>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" quiz flex flex-col justify-center gap-y-4"
          >
            <Score />
            <button
              className=" quiz  w-full rounded-xl bg-[var(--purple)] px-5 py-4 text-center text-lg font-semibold text-[var(--white)] shadow-lg"
              onClick={reset}
            >
              Буцах
            </button>
          </MotionDiv>
        </>
      )}
    </MaxWidthWrapper>
  );
}