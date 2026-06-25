import type { QuestionDescription, Question, Answer, Config, User } from './types'
import { questionsMap, summariseResponses, type Theme } from './data'

type ReportingProps = {
    answers: Answer[],
    startNewRound: (themes: Theme[]) => void
    config: Config
}

function questionDescription(q: Question | undefined , perspective: User | undefined, receiver: User| undefined, player_1: string, player_2: string) {

    const [receiver_name, actor_name] = receiver == 1 ? [player_1, player_2] : [player_2, player_1]

    // going to the beach
    if (!q?.promptReceiver) return q?.prompt 

    const basePrompt =  receiver === perspective ? q.promptReceiver : q.prompt;
    const [you, the_other] = receiver === perspective ? [receiver_name, actor_name] : [actor_name, receiver_name];
    const prepend_name = !perspective && !(basePrompt.includes("your") || basePrompt.includes("you") );

    const finalPrompt = basePrompt.replace("the other", the_other).replace("the other's", `${the_other}'s`).replace("your", `${you}'s`).replace("you", you)

    if (prepend_name) {
        return `${you} ${finalPrompt}`
    }

    return finalPrompt
}

function QuestionBlock({ qd, perspective, config, startNewRound }: { qd: QuestionDescription, perspective?: User, config: Config, startNewRound: (t: Theme[]) => void }) {
    const question = questionsMap.get(qd.QuestionId)
    const suggestedTheme = question?.suggestedTheme
    return question && <div>
        {questionDescription(question, perspective, qd.Receiver, config.player_1, config.player_2)}
        {suggestedTheme && <button onClick={() => startNewRound([suggestedTheme])}>Further explore the topic {question.suggestedTheme}</button>}
    </div> || <></>

}

type CategorySectionProps = {
    config: Config,
    startNewRound: (themes: Theme[]) => void,
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
    const summary = summariseResponses(answers)
    console.log(answers)
    console.log(summary)

    return (
        <div>
            <CategorySection name="You both are excited about" items={summary.Common} config={props.config} startNewRound={startNewRound} />
            <CategorySection perspective={1} name={`${props.config.player_1} is excited about`} afterText={`And ${props.config.player_2} is open to that!`} items={summary.User1} config={props.config} startNewRound={startNewRound} />
            <CategorySection perspective={2} name={`${props.config.player_2} is excited about`} afterText={`And ${props.config.player_1} is open to that!`} items={summary.User2} config={props.config} startNewRound={startNewRound} />
            <CategorySection name={`You are both open to`} afterText='Maybe give it a try!' items={summary.CommonOpen} startNewRound={startNewRound} config={props.config} />

            <button onClick={() => startNewRound([])}>Click here to go back to the main menu</button>
        </div>
    )
}
