

export type Question = {
    category : string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type QuestionState = Question & {answers: string[]}


export enum DifficultyLevel  {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export const fetchQuestions =async (amount:number,difficulty: DifficultyLevel): Promise<QuestionState[]>=> {
    const url =  `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const response = await fetch(url)
    const result = await response.json()
    return result.results.map((question:Question)=>{
        return {
            ...question,
            answers:shuffleArray([...question.incorrect_answers,question.correct_answer])
        }
    })
  }

const shuffleArray = (array:any) => {
    return [...array].sort(()=>Math.random() - 0.5);
}