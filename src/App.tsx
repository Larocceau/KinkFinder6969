import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import type { Question, Role, User, Attitude, Answer } from './types'
import { questions } from './data'

type QuestionFormProps = {
  question: Question,
  role: Role,
  doSubmit: (attitude: Attitude) => void
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
    }

    setError(false)
    setChoice(parsed)
  }

  const handleSubmit = () => {
    if (choice === undefined)
      setError(true)
    else props.doSubmit(choice)

  }

  return (
    <div>
      {error && <p>Please make a choice</p>}
      <p>{props.role === 'Giver' ? props.question.prompt : (props.question.promptReceiver ?? props.question.prompt)}</p>

      <select onChange={handleChange} value={choice ?? ""}>
        <option value="">
        </option>

        <option value="excited">
          Interested
        </option>
        <option value="open">
          Open
        </option>
        <option value="uninterested">
          Uninterested
        </option>
      </select>
      <button onClick={handleSubmit}>submit</button>
    </div>
  )

}

type QuestionPhaseProps = {
  saveResponse: (answer: Answer) => void,
  onEverythingCollected: () => void

}

function QuestionsPhase(props: QuestionPhaseProps) {
  const [currentUser, setCurrentUser] = useState<User>(1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentRole, setCurrentRole] = useState<Role>("Giver")

  const question = questions[currentQuestionIndex]

  const handleQuestionSubmit = (attitude: Attitude) => {
    props.saveResponse({ user: currentUser, asRole: currentRole, questionId: question.id, attitude })


    if (currentRole === "Giver" && questions[currentQuestionIndex].promptReceiver) {
      setCurrentRole("Receiver")
      return
    }

    setCurrentRole("Giver")

    if (!questions[currentQuestionIndex + 1]) {
      if (currentUser === 1) {
        setCurrentQuestionIndex(0)
        setCurrentUser(2)
      } else {
        props.onEverythingCollected()
      }
    } else {
      setCurrentQuestionIndex((idx) => idx + 1)
    }

  }


  return (
    <div>

      taking answers from user {currentUser}
          <QuestionForm question={question} role={currentRole} doSubmit={handleQuestionSubmit}></QuestionForm>


    </div>
  )


}

type Phase = "collecting" | "reporting"

function App() {
  const [answers, setAnswers ] = useState<Answer[]>([])
  const [currentPhase, setCurrentPhase] = useState<Phase>("collecting")

  const takeAnswer = (answer: Answer) => {
    setAnswers([...answers, answer])
  }


  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        
      </section>

      <div className="ticks">
        {currentPhase == 'collecting' && <QuestionsPhase saveResponse={takeAnswer} onEverythingCollected={() => setCurrentPhase("reporting")}></QuestionsPhase>}

      </div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
