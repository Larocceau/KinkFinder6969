import type { QuestionDescription, Config, User, DescriptionsAndResponses } from './types'
import { allThemes, summariseResponses, type Theme } from './data'
import { useState } from 'react'

type ReportingProps = {
    answers: DescriptionsAndResponses,
    startNewRound: (themes: Set<Theme>) => void
    config: Config,
    roundNumber: number
}

function questionDescription(q: QuestionDescription, perspective: User | undefined, player_1: string, player_2: string) {

    // going to the beach
    if (!q.Receiver) return q.question.prompt

    const [receiver_name, actor_name] = q.Receiver == 1 ? [player_1, player_2] : [player_2, player_1]


    const basePrompt = (q.Receiver === perspective ? q.question.promptReceiver : undefined) || q.question.prompt;
    const [you, the_other] = q.Receiver === perspective ? [receiver_name, actor_name] : [actor_name, receiver_name];
    const prepend_name = !perspective && !(basePrompt.includes("your") || basePrompt.includes("you"));

    const finalPrompt = basePrompt.replace("the other", the_other).replace("the other's", `${the_other}'s`).replace("your", `${you}'s`).replace("you", you)

    if (prepend_name) {
        return `${you} ${finalPrompt}`
    }

    return finalPrompt
}

function QuestionBlock({ qd, perspective, config, startNewRound }: { qd: QuestionDescription, perspective?: User, config: Config, startNewRound: (t: Set<Theme>) => void }) {
    const suggestedTheme = qd.question.suggestedTheme
    return <div>
        {questionDescription(qd, perspective, config.player_1, config.player_2)}
        {suggestedTheme && <button onClick={() => startNewRound(new Set([suggestedTheme]))}>Further explore the topic {qd.question.suggestedTheme}</button>}
    </div>

}

type CategorySectionProps = {
    config: Config,
    startNewRound: (themes: Set<Theme>) => void,
    items: QuestionDescription[],
    name: string
    afterText?: string
    perspective?: User
}

function CategorySection(props: CategorySectionProps) {
    if (props.items.length > 0) {
        return (
            <>
                <h2>{props.name}</h2>
                <ul>
                    {props.items.map((qd, i) => <li key={`c-${i}`}><QuestionBlock config={props.config} qd={qd} startNewRound={props.startNewRound} perspective={props.perspective} /></li>)}
                </ul>
                {props.afterText && <p>{props.afterText}</p>}
            </>
        )
    }
    return <></>
}

export default function Reporting(props: ReportingProps) {
    const { startNewRound, answers } = props
    const [onlyCurrentRound, setOnlyCurrentRound] = useState(false)
    const [selectedThemes, setSelectedThemes] = useState(new Set(allThemes))


    const toggleTheme = (theme: Theme) => {
        setSelectedThemes((currentSelection) => {
            const nextSelection = new Set(currentSelection)

            if (nextSelection.has(theme)) {
                nextSelection.delete(theme)
            } else {
                nextSelection.add(theme)
            }

            return nextSelection
        })
    }

    const answersMaybeFilteredByRound = [...answers].filter(([_, responses]) => (!onlyCurrentRound || responses.round_number == props.roundNumber))
    const relevantThemes = ([...new Set(answersMaybeFilteredByRound.map(([description, _]) => [...description.question.themes]).flat())])

    const themeToggles = relevantThemes.map((theme) =>
        <label>
            <input type="checkbox" checked={selectedThemes.has(theme)} onChange={() => toggleTheme(theme)} />
            {theme}
        </label>
    )

    const relevantAnswers = answersMaybeFilteredByRound.filter(([description, outcome]) => {
        const inSelectedThemes = [...description.question.themes].some((theme) => selectedThemes.has(theme))

        return inSelectedThemes && (!onlyCurrentRound || outcome.round_number == props.roundNumber)

    }

    )

    const summary = summariseResponses(new Map(relevantAnswers))

    return (
        <div>
            <label>

                <input type="checkbox" checked={onlyCurrentRound} onChange={(_) => setOnlyCurrentRound(!onlyCurrentRound)} />
                only show questions from the last round
            </label>

            <section>
                <p>Select the themes you want to see</p>
                {themeToggles}
            </section>

            <CategorySection name="You both are excited about" items={summary.Common} config={props.config} startNewRound={startNewRound} />
            <CategorySection perspective={1} name={`${props.config.player_1} is excited about`} afterText={`And ${props.config.player_2} is open to that!`} items={summary.User1} config={props.config} startNewRound={startNewRound} />
            <CategorySection perspective={2} name={`${props.config.player_2} is excited about`} afterText={`And ${props.config.player_1} is open to that!`} items={summary.User2} config={props.config} startNewRound={startNewRound} />
            <CategorySection name={`You are both open to`} afterText='Maybe give it a try!' items={summary.CommonOpen} startNewRound={startNewRound} config={props.config} />

            <button onClick={() => startNewRound(new Set())}>Click here to go back to the main menu</button>
        </div>
    )
}
