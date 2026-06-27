import type { Answer, Question, User, QuestionDescription, ResponseSummary } from "./types"

export type Theme = "New to this" | "Dirty" | "Roleplay" | "Threesome" | "Non-sexual" | "BDSM"

export const allThemes: Theme[] = ["New to this", "Dirty", "Roleplay", "Threesome", "Non-sexual", "BDSM"]

type RawQuestion = Omit<Question, 'themes' | 'id'> & {
    theme: Theme[]
}

const rawQuestions: RawQuestion[] = [
    { prompt: "Engaging in roleplay", theme: ["New to this"], suggestedTheme: "Roleplay" },
    { prompt: "Giving a massage", promptReceiver: "Getting a massage", theme: ["New to this", "Non-sexual"] },
    { prompt: "playing the other's teacher", promptReceiver: "playing the other's student", theme: ["Roleplay"] },
    { prompt: "Playing another gender", promptReceiver: "Having the other play another gender", theme: ["Roleplay"] },
    { prompt: "peeing on the other", promptReceiver: "Getting peed on", theme: ["Dirty"] },
    { prompt: "exploring kinks that people may consider unhygienic", theme: ["New to this"], suggestedTheme: "Dirty" },
    { prompt: "eating the other's ass", promptReceiver: "the other eating your ass", theme: ["Dirty"] },
    { prompt: "having sex after a heavy workout", theme: ["Dirty", "New to this"]},
    { prompt: "Eating food from the other's body", promptReceiver: "Having the other eat food off you", theme: ["New to this"] },
    { prompt: "Having sex in a public place", theme: ["New to this"] },
    { prompt: "Having your climax controlled", promptReceiver: "controlling the other's climax", theme: ["New to this"] },
    { prompt: "Performing a strip tease", promptReceiver: "Having the other perform a strip tease", theme: ["New to this"] },
    { prompt: "Watching porn together", theme: ["New to this"] },
    { prompt: "Using toys on the other", promptReceiver: "Have the other use toys on you", theme: ["New to this"] },
    { prompt: "Playing a sex game", theme: ["New to this"] },
    { prompt: "Going to a sexs club", theme: ["New to this"] },
    { prompt: "Having a threesome", theme: ["New to this"] },
    { prompt: "Having a threesome with someone you both know", theme: ["Threesome"] },
    { prompt: "Having a threesome with someone you know", promptReceiver: "Having a threesome with someone the other knows", theme: ["Threesome"] },
    { prompt: "Having a threesome with someone with a penis", theme: ["Threesome"] },
    { prompt: "Having a threesome with someone with a vagina", theme: ["Threesome"] },
    { prompt: "Buying lingerie for the other", promptReceiver: "the other buying lingerie for you", theme: ["New to this"] },
    { prompt: "Going to a sex shop", theme: ["New to this"] },
    { prompt: "Going to a nudist beach", theme: ["New to this", "Non-sexual"] },
    { prompt: "Picking out an outfit for the other", promptReceiver: "the other picking out an outfit for you", theme: ["Non-sexual"] },
    { prompt: "Styling the other's hair", promptReceiver: "the other styling your hair", theme: ["Non-sexual"] },
    { prompt: "Getting a dog together", theme: ["Non-sexual"] },
    { prompt: "Tying the other up", promptReceiver: "Getting tied up", theme: ["BDSM"] },
    { prompt: "Being the dominant partner", promptReceiver: "Being the submissive partner", theme: ["BDSM", "New to this"] },
    { prompt: "Wearing a chastity belt/cage", promptReceiver: "the other wearing a chastity cage", theme: ["BDSM"]},
    { prompt: "Pegging the other", promptReceiver: "Getting pegged", theme: ["New to this"] },
    { prompt: "Recording a sextape", theme: ["New to this"]},
    { prompt: "Sexting", theme: ["New to this"]},
    { prompt: "Taking a nude photshoot of the other", promptReceiver: "Having the other take a nude photoshoot of you", theme: ["New to this"]},
    { prompt: "performing oral sex", promptReceiver: "receiving oral sex", theme: ["New to this"]},
    { prompt: "Having the other watch you while you please yourself", promptReceiver: "Watching the other while you please yourself", theme: ["New to this"]},
    { prompt: "69-ing", theme: ["New to this"]},
    { prompt: "Using a glory hole", theme: ["New to this"]},
]

const all_questions: Set<Question> = new Set(
    rawQuestions.map(({ theme: themes, ...rest }, id) => ({ ...rest, themes: new Set(themes), id }))
)

export const questionIds = (themes: any) => {
    return [...all_questions].filter(({ themes: questionThemes }) => themes.intersection(questionThemes).size > 0).map(({ id: id }) => id)
}

export const summariseResponses = (answers: Answer[]): ResponseSummary => {
    var common: QuestionDescription[] = [];
    var user1: QuestionDescription[] = [];
    var user2: QuestionDescription[] = [];
    var commonOpen: QuestionDescription[] = [];

    var allQuestions = [...new Set(answers.map((a) => a.question))]

    for (const question of allQuestions ) {
        if (!question.promptReceiver) {
            const a1 = answers.find((a) => a.question == question && a.user == 1)
            const a2 = answers.find((a) => a.question == question && a.user == 2)

            if (!(a1 && a2)) {
                continue
            }
            const qd = { question: question }


            if (a1.attitude == 'excited' && a2.attitude == 'excited') {
                common.push(qd)
            }
            else if (a1.attitude == 'excited' && a2.attitude == 'open') {
                user1.push(qd)
            }
            else if (a1.attitude == 'open' && a2.attitude == 'excited') {
                user2.push(qd)
            }
            else if (a1.attitude == 'open' && a2.attitude == 'open') {
                commonOpen.push(qd)
            }
        } else {
            const receivers: User[] = [1, 2]
            for (const receiver of receivers) {
                const [a1Role, a2Role] = receiver == 1 ? ["Receiver", "Giver"] : ["Giver", "Receiver"]
                const a1 = answers.find((a) => a.question == question && a.user == 1 && a.asRole == a1Role)
                const a2 = answers.find((a) => a.question == question && a.user == 2 && a.asRole == a2Role)
                const qd = { question: question, Receiver: receiver }

                if (!(a1 && a2)) {
                    continue
                }

                if (a1.attitude == 'excited' && a2.attitude == 'excited') {
                    common.push(qd)
                }
                else if (a1.attitude == 'excited' && a2.attitude == 'open') {
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