import { type Config } from "./types"
import { useState } from "react"

export type SetupFormProps = {
    onSubmit: (questions: Config) => void
};


function error(fieldname: string, errors: Map<string, string>) {
    const err = errors.get(fieldname)
    if (err) {
        return <span className="error">{err}</span>
    } else {
        return null
    }
}


export function SetupForm(props: SetupFormProps) {
    const [errors, setErrors] = useState<Map<string, string>>(new Map())



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);

        const name1_raw = fd.get("player_one_name")
        const name_1 = typeof name1_raw == "string" && name1_raw || ""
        const name2_raw = fd.get("player_two_name")
        const name_2 = typeof name2_raw == "string" && name2_raw || ""


        let new_errors = new Map()

        if (name_1 == "") {
            new_errors.set("player_one_name", "Please enter a name. Get creative!")
        }

        if (name_2 == "") {
            new_errors.set("player_two_name", "please enter a name. Think of something!")
        }

        if (new_errors.size === 0) {
            props.onSubmit({ player_1: name_1, player_2: name_2 })
        } else {
            setErrors(new_errors)
        }
    }

    return <>

        <form className="theme-form" onSubmit={handleSubmit}>

            Enter your names

            <label>
                Explorer 1
                <input type="text" name="player_one_name" />
                {error("player_one_name", errors)}
            </label>
            <label>
                Explorer 2
                <input type="text" name="player_two_name" />
                {error("player_two_name", errors)}
            </label>


            <button >
                Good to go!
            </button>
            {error("categories", errors)}
        </form>

    </>
}

