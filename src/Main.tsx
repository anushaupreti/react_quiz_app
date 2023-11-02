import * as React from 'react';
import styled from 'styled-components';

import QuizImg from './assets/quiz.avif';
import QuestionCard from './components/QuestionCard';
import { DifficultyLevel, QuestionState, fetchQuestions } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Total_Questions = 10;

const Main = () => {
  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionState[]>([]);
  const [number, setNumber] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([]);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const questionsData = await fetchQuestions(
      Total_Questions,
      DifficultyLevel.EASY,
    );
    setQuestions(questionsData);
    setNumber(0);
    setUserAnswers([]);
    setScore(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      console.log('clicked', answer);

      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore((previousScore) => previousScore + 1);
      }
      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (number === Total_Questions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <Wrapper className='top' style={{ backgroundImage: `url(${QuizImg})` }}>
      <h1>Quiz App</h1>
      {gameOver || userAnswers.length === Total_Questions ? (
        <Button onClick={startQuiz}>Start</Button>
      ) : null}
      {!gameOver && <p>Score: {score} </p>}
      {loading ? <p>Loading Questions</p> : ''}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!loading && !gameOver && (
          <QuestionCard
            questionNum={number + 1}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            totalQuestions={Total_Questions}
            callback={checkAnswer}
          />
        )}
      </div>
      {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== Total_Questions - 1 && (
          <Next onClick={nextQuestion}>Next</Next>
        )}
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  height: 100vh;
  text-align: center;
`;

const Button = styled.button`
  border: none;
  outline: none;
  padding: 5px;
  background-color: green;
  min-width: 100px;
  font-size: 1.2rem;
  border-radius: 10px;
`;

const Next = styled(Button)`
  margin: 10px 0px;
`;
