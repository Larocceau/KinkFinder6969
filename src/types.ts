import type { Theme } from "./data";

export type Role = 'Giver' | 'Receiver';
export type User = 1 | 2 
export type QuestionId = number
export type Attitude = "excited" | "open" | "uninterested" | "does not apply"


export type Question = {
    prompt: string,
    promptReceiver?: string,
    themes: Set<Theme>
    suggestedTheme?: Theme
}

export type Config = {
    player_1: string,
    player_2: string,
}


export type Answer = {
    user: User,
    question: Question,
    asRole: Role,
    attitude: Attitude,
    roundNumber: number,
}


export type QuestionDescription = {
    question: Question,
    Receiver?: User
}

export type ResponseSummary =  {
    Common: QuestionDescription[],
    User1: QuestionDescription[],
    User2: QuestionDescription[],
    CommonOpen: QuestionDescription[],
}