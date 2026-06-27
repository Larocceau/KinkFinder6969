import { useState } from "react"
import { all_questions, allThemes, filteredQuestions, type Theme } from "./data"
import type { DescriptionsAndResponses, QuestionDescription } from "./types"

export type RoundSetupFormProps = {
    initialSelection: Set<Theme>
    onSubmit: (questions: QuestionDescription[]) => void
    answers: DescriptionsAndResponses 
    toOverview: () => void
}

export function RoundSetupForm(props: RoundSetupFormProps) {
    const [error, setError] = useState(false)


    const rows = allThemes.map((theme: Theme) => {
        const totalQuestions = [...all_questions].filter((qd) => qd.question.themes.has(theme)).length;
        const answeredQuestions = [...props.answers].filter(([qd,_]) => qd.question.themes.has(theme)).length;


       return <label>

            <input type="checkbox" name={theme} defaultChecked={props.initialSelection.has(theme)} disabled={totalQuestions == answeredQuestions } />
            {`${theme} (${answeredQuestions}/${totalQuestions})`}
        </label>})


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const selected =
            allThemes.filter((theme) => fd.get(theme))


        if (selected.length == 0) {
            setError(true)

        } else {
            const usedDefinitions = new Set([...props.answers].map(([qd,_] )=> qd))

            props.onSubmit(filteredQuestions(new Set(selected)).filter( (qd) => !usedDefinitions.has(qd)))


        }


    }

    return <>

        <form className="theme-form" onSubmit={handleSubmit}>
            Select the themes you'd like to explore

            {rows}
            {error && <span className="error">select at least one theme</span>}

            <button >
                Start the Questionnaire!
            </button>
            <button onClick={(e) => {e.preventDefault(); props.toOverview()} }>
                Results so far
            </button>
        </form>
    </>

}