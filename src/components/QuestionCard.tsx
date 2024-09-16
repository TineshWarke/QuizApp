import React from "react";
import { AnswerObject } from "../App";
import { ButtonWrapper, Wrapper } from "./QuestionCard.styles";

type Props = {
    question: string
    answers: string[]
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerObject | undefined
    questionNo: number
    totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNo, totalQuestions }) => (
    <Wrapper>
        <p className="number"> Question : {questionNo} / {totalQuestions}</p>
        <p dangerouslySetInnerHTML={{ __html: question }}></p>
        <div>
            {
                answers?.map(ans => (
                    <ButtonWrapper 
                        key={ans}
                        correct={userAnswer?.correctAnswer === ans}
                        userClicked={userAnswer?.answer === ans}
                    >
                        <button disabled={!!userAnswer} value={ans} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: ans }}></span>
                        </button>
                    </ButtonWrapper>
                ))
            }
        </div>
    </Wrapper>
)

export default QuestionCard;