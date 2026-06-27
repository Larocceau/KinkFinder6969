import type {  Question, QuestionDescription, ResponseSummary, DescriptionsAndResponses } from "./types"

export type Theme = "New to this" | "Dirty" | "Roleplay" | "Threesome" | "Non-sexual" | "BDSM"

export const allThemes: Theme[] = ["New to this", "Dirty", "Roleplay", "Threesome", "Non-sexual", "BDSM"]

type RawQuestion = Omit<Question, 'themes' | 'id'> & {
    theme: Theme[]
}

const rawQuestions: RawQuestion[] = [
    { prompt: "engaging in roleplay", theme: ["New to this"], suggestedTheme: "Roleplay" },
    { prompt: "giving a massage", promptReceiver: "getting a massage", theme: ["New to this", "Non-sexual"] },
    { prompt: "playing the other's teacher", promptReceiver: "playing the other's student", theme: ["Roleplay"] },
    { prompt: "playing another gender", promptReceiver: "having the other play another gender", theme: ["Roleplay"] },
    { prompt: "peeing on the other", promptReceiver: "getting peed on", theme: ["Dirty"] },
    { prompt: "exploring kinks that people may consider unhygienic", theme: ["New to this"], suggestedTheme: "Dirty" },
    { prompt: "eating the other's ass", promptReceiver: "the other eating your ass", theme: ["Dirty"] },
    { prompt: "having sex after a heavy workout", theme: ["Dirty", "New to this"] },
    { prompt: "eating food from the other's body", promptReceiver: "having the other eat food off you", theme: ["New to this"] },
    { prompt: "having sex in a public place", theme: ["New to this"] },
    { prompt: "having your climax controlled", promptReceiver: "controlling the other's climax", theme: ["New to this"] },
    { prompt: "performing a strip tease", promptReceiver: "having the other perform a strip tease", theme: ["New to this"] },
    { prompt: "watching porn together", theme: ["New to this"] },
    { prompt: "using toys on the other", promptReceiver: "have the other use toys on you", theme: ["New to this"] },
    { prompt: "playing a sex game", theme: ["New to this"] },
    { prompt: "going to a sexs club", theme: ["New to this"] },
    { prompt: "having a threesome", theme: ["New to this"] },
    { prompt: "having a threesome with someone you both know", theme: ["Threesome"] },
    { prompt: "having a threesome with someone you know", promptReceiver: "having a threesome with someone the other knows", theme: ["Threesome"] },
    { prompt: "having a threesome with someone with a penis", theme: ["Threesome"] },
    { prompt: "having a threesome with someone with a vagina", theme: ["Threesome"] },
    { prompt: "buying lingerie for the other", promptReceiver: "the other buying lingerie for you", theme: ["New to this"] },
    { prompt: "going to a sex shop", theme: ["New to this"] },
    { prompt: "going to a nudist beach", theme: ["New to this", "Non-sexual"] },
    { prompt: "picking out an outfit for the other", promptReceiver: "the other picking out an outfit for you", theme: ["Non-sexual"] },
    { prompt: "styling the other's hair", promptReceiver: "the other styling your hair", theme: ["Non-sexual"] },
    { prompt: "getting a dog together", theme: ["Non-sexual"] },
    { prompt: "tying the other up", promptReceiver: "getting tied up", theme: ["BDSM"] },
    { prompt: "being the dominant partner", promptReceiver: "being the submissive partner", theme: ["BDSM", "New to this"] },
    { prompt: "wearing a chastity belt/cage", promptReceiver: "the other wearing a chastity belt/cage", theme: ["BDSM"] },
    { prompt: "pegging the other", promptReceiver: "getting pegged", theme: ["New to this"] },
    { prompt: "recording a sextape", theme: ["New to this"] },
    { prompt: "sexting", theme: ["New to this"] },
    { prompt: "taking a nude photshoot of the other", promptReceiver: "having the other take a nude photoshoot of you", theme: ["New to this"] },
    { prompt: "performing oral sex", promptReceiver: "receiving oral sex", theme: ["New to this"] },
    { prompt: "having the other watch you while you please yourself", promptReceiver: "playing with yourself while the other watches", theme: ["New to this"] },
    { prompt: "69-ing", theme: ["New to this"] },
    { prompt: "using a glory hole", theme: ["New to this"] },
]

export const all_questions: Set<QuestionDescription> = new Set(
    rawQuestions.map(({ theme: themes, ...rest }, id) => ({ ...rest, themes: new Set(themes), id })).flatMap((question) => question.promptReceiver? [{question, Receiver: 1}, {question, Receiver: 2}] : {question})
)

export const filteredQuestions = (themes: Set<Theme>, questions?: QuestionDescription[]) => {
    const questionsToFilter = questions || all_questions
    return [...questionsToFilter].filter(({question: { themes: questionThemes }}) => (themes as any).intersection(questionThemes).size > 0)
}

export const summariseResponses = (answers: DescriptionsAndResponses): ResponseSummary => {
    var common: QuestionDescription[] = [];
    var user1: QuestionDescription[] = [];
    var user2: QuestionDescription[] = [];
    var commonOpen: QuestionDescription[] = [];


    for (const [qd, attitudes] of answers) {


        if (attitudes.attitude_user1 == 'excited' && attitudes.attitude_user2 == 'excited') {
            common.push(qd)
        }
        else if (attitudes.attitude_user1 == 'excited' && attitudes.attitude_user2 == 'open') {
            user1.push(qd)
        }
        else if (attitudes.attitude_user1 == 'open' && attitudes.attitude_user2 == 'excited') {
            user2.push(qd)
        }
        else if (attitudes.attitude_user1 == 'open' && attitudes.attitude_user2 == 'open') {
            commonOpen.push(qd)
        }
    }


    return {
        Common: common,
        User1: user1,
        User2: user2,
        CommonOpen: commonOpen
    }

}