import type { Theme } from "./data";

export type Role = 'Giver' | 'Receiver';
export type User = 1 | 2 
export type QuestionId = number
export type Attitude = "excited" | "open" | "uninterested"


export type Question = {
    id: QuestionId,
    prompt: string,
    promptReceiver?: string,
    themes: Set<Theme>
    suggestedTheme?: Theme
}

export type Config = {
    player_1: string,
    player_2: string,
    questions: QuestionId[],
    themes: Set<Theme>
}


export type Answer = {
    user: User,
    questionId: QuestionId,
    asRole: Role,
    attitude: Attitude,
}


export type QuestionDescription = {
    QuestionId: QuestionId,
    Receiver?: User
}

export type ResponseSummary =  {
    Common: QuestionDescription[],
    User1: QuestionDescription[],
    User2: QuestionDescription[],
    CommonOpen: QuestionDescription[],
}