import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { Category, Difficulty, fetchQuizQuestions, QuestionState } from './components/API';
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

function App() {
  const [loading, setLoading] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(10)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY)

  const startQuiz = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)
    setGameOver(false)

    let category = Category.GENERALKNOWLEDGE
    if(e.currentTarget.value === 'sports')
      category = Category.SPORTS
    else if(e.currentTarget.value === 'anime')
      category = Category.ANIME
    else if(e.currentTarget.value === 'computers')
      category = Category.COMPUTERS
    else if(e.currentTarget.value === 'mythology')
      category = Category.MYTHOLOGY
    else if(e.currentTarget.value === 'history')
      category = Category.HISTORY
    
    const newQuestions = await fetchQuizQuestions(
      totalQuestions,
      difficulty,
      category
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const ans = e.currentTarget.value
      const correct = questions[number].correct_answer === ans
      if (correct) setScore(prev => prev + 1)
      const ansObj = {
        question: questions[number].question,
        answer: ans,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, ansObj])
    }
  }

  const nextQuestion = () => {
    const nextQue = number + 1
    if (nextQue === totalQuestions)
      setGameOver(true)
    else
      setNumber(nextQue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let amount = 10;
    if(e.currentTarget.value === '20')
      amount = 20
    else if(e.currentTarget.value === '30')
      amount = 30
    setTotalQuestions(amount);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let diff: Difficulty = Difficulty.EASY;
    if(e.currentTarget.value === 'medium')
      diff = Difficulty.MEDIUM
    else if(e.currentTarget.value === 'hard')
      diff = Difficulty.HARD
    
    setDifficulty(diff);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>QUIZ APP</h1>
        {
          gameOver ? (
            <div className='options'>
              <select className='start select' onChange={handleChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <button className='start' onClick={startQuiz} value={'general knowledge'}> General Knowledge </button>
              <button className='start' onClick={startQuiz} value={'sports'}> Sports </button>
              <button className='start' onClick={startQuiz} value={'anime'}> Anime </button>
              <button className='start' onClick={startQuiz} value={'computers'}> Computers </button>
              <button className='start' onClick={startQuiz} value={'mythology'}> Mythology </button>
              <button className='start' onClick={startQuiz} value={'history'}> History </button>
              <select className='start select' onChange={handleChange2}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>
            </div>
          ) : null}
        {!gameOver ? <p className='score'>Score : {score}</p> : null}
        {loading && <p>Loading Questions......</p>}
        {!gameOver && !loading && <QuestionCard
          questionNo={number + 1}
          totalQuestions={totalQuestions}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== totalQuestions - 1 ? (
          <button className='next' onClick={nextQuestion}> Next </button>
        ) : null}
        {!gameOver && !loading && userAnswers.length === number + 1 && number === totalQuestions - 1 ? (
          <button className='next' onClick={nextQuestion}> Finish </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
