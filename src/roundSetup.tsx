import { useState } from "react"
import { allThemes, filteredQuestions, type Theme } from "./data"
import type { Question } from "./types"

export type RoundSetupFormProps = {
    initialSelection: Set<Theme>
    onSubmit: (questions: Question[]) => void
}

export function RoundSetupForm(props: RoundSetupFormProps) {
    const [error, setError] = useState(false)

    const rows = allThemes.map((theme: Theme) =>
        <label>

            <input type="checkbox" name={theme} defaultChecked={props.initialSelection.has(theme)} />
            {theme}
        </label>)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const selected =
            allThemes.filter((theme) => fd.get(theme))


        if (selected.length == 0) {
            setError(true)

        } else {
            props.onSubmit(filteredQuestions(new Set(selected)))


        }


    }

    return <>

        <form className="theme-form" onSubmit={handleSubmit}>
            {rows}
            {error && <span className="error">select at least one theme</span>}

            <button >
                Start the Questionnaire!
            </button>
        </form>
    </>

}