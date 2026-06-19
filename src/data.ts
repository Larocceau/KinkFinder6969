import type {Answer, Question, QuestionId, User} from "./types" 

export const questions: Question[] = [
    {
        id: 1,
        prompt: "Make out"
    },
    {
        id: 2,
        prompt: "Give a handjob",
        promptReceiver: "Receive a handjob"
    }
]

type QuestionDescription = {
    QuestionId: QuestionId,
    Receiver?: User
}

type ResponseSummary =  {
    Common: QuestionDescription[],
    User1: QuestionDescription[],
    User2: QuestionDescription[],
    CommonOpen: QuestionDescription[],
}



const summariseResponses = (questions: Question[], answers: Answer[]): ResponseSummary => {
    var common: QuestionDescription[] = [];
    var user1: QuestionDescription[] = [];
    var user2: QuestionDescription[] = [];
    var commonOpen: QuestionDescription[] = [];

    for (const question of questions){
        if(!question.promptReceiver){
            const a1 = answers.find((a) => a.questionId == question.id && a.user == 1)
            const a2 = answers.find((a) => a.questionId == question.id && a.user == 2)
            const qd = {QuestionId: question.id}

            if (a1.attitude == 'excited' && a2.attitude == 'excited') {
                common.push(qd)
            }
            else if(a1.attitude == 'excited' && a2.attitude == 'open') {
                user1.push(qd)
            }
            else if (a1.attitude == 'open' && a2.attitude == 'excited') {
                user2.push(qd)
            }
            else if (a1.attitude == 'open' && a2.attitude == 'open') {
                commonOpen.push(qd)
            }
        } else {
            for (const receiver of [1,2]){
            const receiverForReals = receiver as User
            const [a1Role, a2Role] = receiver == 1 ? ["receiver", "giver"] : ["giver", "receiver"]
            const a1 = answers.find((a) => a.questionId == question.id && a.user == 1 && a.asRole == a1Role)
            const a2 = answers.find((a) => a.questionId == question.id && a.user == 2 && a.asRole == a2Role)
            const qd = {QuestionId: question.id, Receiver: receiverForReals}

            if (a1.attitude == 'excited' && a2.attitude == 'excited') {
                common.push(qd)
            }
            else if(a1.attitude == 'excited' && a2.attitude == 'open') {
                user1.push(qd)
            }
            else if (a1.attitude == 'open' && a2.attitude == 'excited') {
                user2.push(qd)
            }
            else if (a1.attitude == 'open' && a2.attitude == 'open') {
                commonOpen.push(qd)
            }

            }
        }
    }

    return {
        Common: common,
        User1: user1,
        User2: user2,
        CommonOpen: commonOpen
    }

}