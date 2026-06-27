import type {  Question, QuestionDescription, ResponseSummary, DescriptionsAndResponses } from "./types"

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
    { prompt: "having sex after a heavy workout", theme: ["Dirty", "New to this"] },
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
    { prompt: "Wearing a chastity belt/cage", promptReceiver: "the other wearing a chastity cage", theme: ["BDSM"] },
    { prompt: "Pegging the other", promptReceiver: "Getting pegged", theme: ["New to this"] },
    { prompt: "Recording a sextape", theme: ["New to this"] },
    { prompt: "Sexting", theme: ["New to this"] },
    { prompt: "Taking a nude photshoot of the other", promptReceiver: "Having the other take a nude photoshoot of you", theme: ["New to this"] },
    { prompt: "performing oral sex", promptReceiver: "receiving oral sex", theme: ["New to this"] },
    { prompt: "Having the other watch you while you please yourself", promptReceiver: "Watching the other while you please yourself", theme: ["New to this"] },
    { prompt: "69-ing", theme: ["New to this"] },
    { prompt: "Using a glory hole", theme: ["New to this"] },
]

export const all_questions: Set<QuestionDescription> = new Set(
    rawQuestions.map(({ theme: themes, ...rest }, id) => ({ ...rest, themes: new Set(themes), id })).flatMap((question) => question.promptReceiver? [{question, receiver: 1}, {question, receiver: 2}] : {question})
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