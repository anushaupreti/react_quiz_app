import * as React from 'react';
import styled from 'styled-components';

import { AnswerObject } from '../Main';

type QuestionCardProps = {
  question: string;
  answers: string[];
  callback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer?: AnswerObject;
  questionNum?: number;
  totalQuestions?: number;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  answers,
  callback,
  question,
  questionNum,
  totalQuestions,
  userAnswer,
}) => {
  console.log(userAnswer);
  return (
    <Card>
      <p>
        Question: {questionNum}/{totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer, index) => (
          <div key={index}>
            <button
              disabled={userAnswer?.answer}
              value={answer}
              onClick={callback}
              style={{
                padding: '5px',
                borderRadius: '10px',
                margin: '5px 0',
                minWidth: '100px',
                backgroundColor:
                  userAnswer === undefined
                    ? 'gray'
                    : userAnswer.correctAnswer === answer
                    ? 'blue'
                    : answer !== userAnswer.answer
                    ? 'gray'
                    : 'red',
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QuestionCard;

const Card = styled.div`
  border-radius: 10px;
  width: 400px;
  height: 300px;
  background-color: white;
  padding: 20px;
  p {
    color: black;
  }
`;
