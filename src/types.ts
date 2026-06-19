export type Role = 'Giver' | 'Receiver';
export type User = 1 | 2 
export type QuestionId = number
export type Attitude = "excited" | "open" | "uninterested"

export type Question = {
    id: QuestionId,
    prompt: string,
    promptReceiver?: string,
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