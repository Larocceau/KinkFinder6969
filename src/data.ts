import type { Question, QuestionDescription, ResponseSummary, DescriptionsAndResponses } from "./types"

export type Theme = "New to this" | "Dirty" | "Roleplay" | "Threesome" | "Non-sexual" | "BDSM" | "feet" | "genitals" | "toes" | "ears" | "hands" | "asshole" | "arm pits" |
    "chest" | "nipples"  | "mouth" | "Getting others involved" | "Creative" | "Places" | "Clothing"


const bodyParts: Theme[] = ["feet", "genitals", "ears", "hands", "arm pits", "asshole", "chest", "nipples", "mouth"]


export const allThemes: Theme[] = ["New to this", "Places", "Roleplay", "Threesome", "Non-sexual", "BDSM", ...bodyParts, "Getting others involved", "Creative", "Dirty", "Clothing", "Places"]

type RawQuestion = Omit<Question, 'themes' | 'id'> & {
    theme: Theme[]
}

const actions = ["sucking on", "kissing", "licking", "worshipping", "stroking", "fucking", "smelling", "biting"]

const rawQuestions: RawQuestion[] = [
    ...bodyParts.map((part) => { return { prompt: `fetishising the other's ${part}`, promptReceiver: `the other fetishising your ${part}`, theme: ["New to this" as const], suggestedTheme: [part] } }),
    ...bodyParts.flatMap((part) => actions.map((action => { return { prompt: `${action} the other's ${part}`, promptReceiver: `the other ${action} your ${part}`, theme: [part] } }))),
    { prompt: "getting fucked anally", promptReceiver: "fucking the other anally", theme: ["New to this", "Dirty", "asshole"], suggestedTheme: "asshole" },
    { prompt: "vanilla sex", theme: ["New to this"] },
    { prompt: "giving a hand job", promptReceiver: "receiving a hand job", theme: ["New to this"] },
    { prompt: "engaging in roleplay", theme: ["New to this", "Creative"], suggestedTheme: "Roleplay" },
    { prompt: "giving a massage", promptReceiver: "getting a massage", theme: ["New to this", "Non-sexual"] },
    { prompt: "playing the other's teacher", promptReceiver: "playing the other's student", theme: ["Roleplay"] },
    { prompt: "playing another gender", promptReceiver: "having the other play another gender", theme: ["Roleplay"] },
    { prompt: "playing rescueing the other", promptReceiver: "playing getting rescued by the other", theme: ["Roleplay"] },
    { prompt: "peeing on the other", promptReceiver: "getting peed on", theme: ["Dirty"] },
    { prompt: "exploring kinks that people may consider unhygienic", theme: ["New to this"], suggestedTheme: "Dirty" },
    { prompt: "having sex after a heavy workout", theme: ["Dirty", "New to this"] },
    { prompt: "eating food from the other's body", promptReceiver: "having the other eat food off you", theme: ["New to this"] },
    { prompt: "having sex in a public place", theme: ["New to this", "Places"], suggestedTheme: "Places" },
    { prompt: "having your climax controlled", promptReceiver: "controlling the other's climax", theme: ["New to this"] },
    { prompt: "performing a strip tease", promptReceiver: "having the other perform a strip tease", theme: ["New to this"] },
    { prompt: "watching porn together", theme: ["New to this"] },
    { prompt: "using toys on the other", promptReceiver: "having the other use toys on you", theme: ["New to this"] },
    { prompt: "playing a sex game", theme: ["New to this"] },
    { prompt: "going to a sex club", theme: ["New to this"] },
    { prompt: "having a threesome", theme: ["New to this", "Getting others involved"] },
    { prompt: "having a threesome with someone you both know", theme: ["Threesome"] },
    { prompt: "having a threesome with someone you know", promptReceiver: "having a threesome with someone the other knows", theme: ["Threesome"] },
    { prompt: "having a threesome with someone with a penis", theme: ["Threesome"] },
    { prompt: "having a threesome with someone with a vagina", theme: ["Threesome"] },
    { prompt: "having a threesome with a prostitute", theme: ["Threesome"] },
    { prompt: "buying lingerie for the other", promptReceiver: "the other buying lingerie for you", theme: ["New to this"] },
    { prompt: "going to a sex shop", theme: ["New to this"] },
    { prompt: "going to a nudist beach", theme: ["New to this", "Non-sexual"] },
    { prompt: "picking out an outfit for the other", promptReceiver: "the other picking out an outfit for you", theme: ["Non-sexual"] },
    { prompt: "styling the other's hair", promptReceiver: "the other styling your hair", theme: ["Non-sexual"] },
    { prompt: "getting a dog together", theme: ["Non-sexual"] },
    { prompt: "tying the other up", promptReceiver: "getting tied up", theme: ["BDSM"] },
    { prompt: "being the dominant partner", promptReceiver: "being the submissive partner", theme: ["BDSM", "New to this"], suggestedTheme: "BDSM" },
    { prompt: "spanking the other", promptReceiver: "getting spanked", theme: ["BDSM"] },
    { prompt: "being put in a cage", promptReceiver: "putting the other in a cage", theme: ["BDSM"] },
    { prompt: "wearing a collar", promptReceiver: "the other wearing a collar", theme: ["BDSM"] },
    { prompt: "wearing a chastity belt/cage", promptReceiver: "the other wearing a chastity belt/cage", theme: ["BDSM"] },
    { prompt: "being gagged", promptReceiver: "the other being gagged", theme: ["BDSM"] },
    { prompt: "feeding the other", promptReceiver: "being fed by the other", theme: ["BDSM"] },
    { prompt: "wearing handcuffs", promptReceiver: "putting handcuffs on the other", theme: ["BDSM"] },
    { prompt: "wearing leather", promptReceiver: "the other wearing leather", theme: ["Clothing"] },
    { prompt: "wearing latex", promptReceiver: "the other wearing latex", theme: ["Clothing"] },
    { prompt: "wearing a skirt/dress during sex", promptReceiver: "having sex while the other wears a skirt/dress", theme: ["Clothing"] },
    { prompt: "having sex (almost) fully clothed", theme: ["New to this", "Clothing"] },
    { prompt: "diy-ing a sexy/kinky outfit", theme: ["Creative"] },
    { prompt: "wearing fetishwear", promptReceiver: "the other wearing fetishwear", theme: ["New to this"], suggestedTheme: "Clothing" },
    { prompt: "pegging the other", promptReceiver: "getting pegged", theme: ["New to this", "asshole"] },
    { prompt: "recording a sex tape", theme: ["New to this", "Creative"] },
    { prompt: "sexting", theme: ["New to this"] },
    { prompt: "taking a nude photshoot of the other", promptReceiver: "the other taking a nude photoshoot of you", theme: ["New to this", "Creative"] },
    { prompt: "performing oral sex", promptReceiver: "receiving oral sex", theme: ["New to this"] },
    { prompt: "having the other watch you while you please yourself", promptReceiver: "playing with yourself while the other watches", theme: ["New to this"] },
    { prompt: "masturbating together", theme: ["New to this"] },
    { prompt: "69-ing", theme: ["New to this"] },
    { prompt: "using a glory hole", promptReceiver: "the other using a gloryhole", theme: ["New to this"] },
    { prompt: "watching the other have sex with someone else", promptReceiver: "having sex with someone else with the other watches", theme: ["Getting others involved"] },
    { prompt: "doing a partner swap with another couple", theme: ["New to this", "Getting others involved"] },
    { prompt: "reading or watching instructions on a new position/act", theme: ["New to this"] },
    { prompt: "reading smut to the other", promptReceiver: "the other reading smut to you", theme: ["New to this"] },
    { prompt: "painting on the other", promptReceiver: "getting painted on", theme: ["New to this", "Creative"] },
    { prompt: "describing what you find sexy about the other", promptReceiver: "the other describing what they find sexy about you", theme: ["New to this", "Creative"] },
    { prompt: "sitting on the other's face", promptReceiver: "the other sitting on your face", theme: ["New to this"] },
    { prompt: "fingering the other vaginally", promptReceiver: "getting fingered by  vaginally", theme: ["New to this"] },
    { prompt: "fingering the other anally", promptReceiver: "getting fingered anally", theme: ["Dirty"] },
    { prompt: "having sex in a car", theme: ["Places"] },
    { prompt: "having sex in a public bathroom", theme: ["Places"] },
    { prompt: "joining the mile-high club", theme: ["Places"] },
    { prompt: "having sex on a train", theme: ["Places"] },
    { prompt: "having sex in the shower", theme: ["Places", "New to this"] },
    { prompt: "being waken up using sex", promptReceiver: "waking the other up using sex", theme: ["New to this"] },
    { prompt: "being waken up for sex", promptReceiver: "waking the other up for sex", theme: ["New to this"] },
    { prompt: "using a sex swing", theme: ["New to this", "BDSM"] },
    { prompt: "being loud during sex", promptReceiver: "the other being loud during sex", theme: ["New to this"]},
    { prompt: "dripping wax on the other", promptReceiver: "the other dripping wax on you", theme: ["BDSM", "New to this"]}

]

export const all_questions: Set<QuestionDescription> = new Set(
    rawQuestions.map(({ theme: themes, ...rest }, id) => ({ ...rest, themes: new Set(themes), id })).flatMap((question) => question.promptReceiver ? [{ question, Receiver: 1 }, { question, Receiver: 2 }] : { question })
)

export const filteredQuestions = (themes: Set<Theme>, questions?: QuestionDescription[]) => {
    const questionsToFilter = questions || all_questions
    return [...questionsToFilter].filter(({ question: { themes: questionThemes } }) => (themes as any).intersection(questionThemes).size > 0)
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