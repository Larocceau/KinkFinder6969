import { useState } from "react"
import type { Answer, Attitude, Config, Question, Role, User } from "./types"

type QuestionFormProps = {
  question: Question,
  role: Role,
  doSubmit: (attitude: Attitude) => void
  other_name: string
}

function QuestionForm(props: QuestionFormProps) {


  const [choice, setChoice] = useState<Attitude | undefined>(undefined)
  const [error, setError] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let parsed: Attitude | undefined = undefined

    switch (event.target.value) {
      case "excited":
        parsed = 'excited'
        break
      case "open":
        parsed = 'open'
        break
      case "uninterested":
        parsed = 'uninterested'
        break
      case "does not apply":
        parsed = 'does not apply'
        break
    }

    setError(false)
    setChoice(parsed)
  }

  const handleSubmit = () => {
    if (choice === undefined)
      setError(true)
    else props.doSubmit(choice)

  }

  const prompt = 
    (props.role === 'Giver' ? props.question.prompt : (props.question.promptReceiver ?? props.question.prompt))
    .replace("the other", props.other_name)


  return (
    <div>
      {error && <p>Please make a choice</p>}
      <p>How do you feel about {prompt}?</p>

      <select onChange={handleChange} value={choice ?? ""}>
        <option value="">
        </option>

        <option value="excited">
          I'm excited
        </option>
        <option value="open">
          I'm Open
        </option>
        <option value="uninterested">
          I'm Uninterested
        </option>
        <option value="does not apply">
          Does not work for us
        </option>
      </select>
      <button onClick={handleSubmit}>submit</button>
    </div>
  )

}

export type QuestionPhaseProps = {
  onEverythingCollected: (answers: Answer[]) => void
  questions: Question[]
  roundNumber: number
  config: Config
}

export function QuestionsPhase(props: QuestionPhaseProps) {
  const [currentUser, setCurrentUser] = useState<User>(1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentRole, setCurrentRole] = useState<Role>("Giver")
  const [answers, setAnswers] = useState<Answer[]>([])
  const [handover, sethandover] = useState<boolean>(true)

  
  const question = props.questions[currentQuestionIndex]

  const handleQuestionSubmit = (attitude: Attitude) => {
    const newAnswer = { user: currentUser, asRole: currentRole, question: question, attitude, roundNumber: props.roundNumber }
    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    if (currentRole === "Giver" && question?.promptReceiver) {
      setCurrentRole("Receiver")
      return
    }

    setCurrentRole("Giver")

    if (!props.questions[currentQuestionIndex + 1]) {
      if (currentUser === 1) {
        setCurrentQuestionIndex(0)
        sethandover(true)
        setCurrentUser(2)
      } else {
        props.onEverythingCollected(newAnswers)
      }
    } else {
      setCurrentQuestionIndex((idx) => idx + 1)
    }

  }

  const [me, other] = currentUser == 1 ? [props.config.player_1, props.config.player_2] : [props.config.player_2, props.config.player_1]


  if (handover) {
    return <>
      <p>It's {me}'s turn to fill out the form</p>
      <button onClick={(_) => sethandover(false)}>I'm ready</button>
    </>
  }


  return (
    <div>

      taking answers from  {me}
      <QuestionForm other_name={other} question={question} role={currentRole} doSubmit={handleQuestionSubmit}></QuestionForm>


    </div>
  )


}