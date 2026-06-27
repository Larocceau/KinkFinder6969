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


export type QuestionDescription = {
    question: Question,
    Receiver?: User
}

export type Responses = {
    attitude_user1: Attitude,
    attitude_user2: Attitude,
    round_number: number
}

export type DescriptionsAndResponses = Map<QuestionDescription, Responses>

export type ResponseSummary =  {
    Common: QuestionDescription[],
    User1: QuestionDescription[],
    User2: QuestionDescription[],
    CommonOpen: QuestionDescription[],
}