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
        const answeredQuestions = [...props.answers].filter(([qd, _]) => qd.question.themes.has(theme)).length;


        return <label>

            <input type="checkbox" name={theme} defaultChecked={props.initialSelection.has(theme)} disabled={totalQuestions == answeredQuestions} />
            {`${theme} (${answeredQuestions}/${totalQuestions})`}
        </label>
    })


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const selected =
            allThemes.filter((theme) => fd.get(theme))


        if (selected.length == 0) {
            setError(true)

        } else {
            const usedDefinitions = new Set([...props.answers].map(([qd, _]) => qd))

            const questions = filteredQuestions(new Set(selected)).filter((qd) => !usedDefinitions.has(qd))
            shuffle(questions)

            props.onSubmit(questions)
        }
    }

    // Source - https://stackoverflow.com/a/2450976
    // Posted by ChristopheD, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-06-28, License - CC BY-SA 4.0

    function shuffle<T>(array: Array<T>) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
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
            <button onClick={(e) => { e.preventDefault(); props.toOverview() }}>
                Results so far
            </button>
        </form>
    </>

}