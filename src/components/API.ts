import { shuffleArray } from "./utils"

export type Question = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionState = Question & {answers: string[]}

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export enum Category {
    SPORTS = 21,
    POLITICS = 24,
    ANIME = 31,
    GENERALKNOWLEDGE = 9,
    COMPUTERS = 18,
    MYTHOLOGY = 20,
    HISTORY = 23
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty, category: Category) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endPoint)).json();
    console.log(data);
    return data?.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ))
}