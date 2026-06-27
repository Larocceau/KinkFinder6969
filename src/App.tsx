import { useMemo, useState } from 'react'
import './App.css'
import type { Config, QuestionDescription, Responses } from './types'
import { SetupForm } from './setup'
import { QuestionsPhase } from './questionForm'
import Reporting from './Reporting'
import type { Theme } from './data'
import { About } from './About'
import { RoundSetupForm } from './roundSetup'


type ReportingPhase = { kind: "reporting" }
type Collecting = { kind: "collecting", questions: QuestionDescription[] }
type RoundSetup = { kind: "round-setup", preselection: Set<Theme> }

type PostSetupPhase = RoundSetup | Collecting | ReportingPhase

type About = { kind: "about" }

type Setup = { kind: "setup" }
type PostSetup = {
  kind: "post-setup"
  phase: PostSetupPhase
  config: Config
  answers: Map<QuestionDescription, Responses>
}

type Phase = About | Setup | PostSetup

type PostSetupPhaseProps = {
  phase: PostSetup,
  setPhase: (phase: Phase) => void
}


function PostSetupPhase({ phase: phase, setPhase }: PostSetupPhaseProps) {
  const { phase: innerPhase, config, answers } = phase

  const startNewRound = (questions: QuestionDescription[]) => {
    setPhase(
      {
        ...phase,
        kind: "post-setup",
        phase: {
          kind: "collecting",
          questions
        },
      }
    )
  }

  const submitAnswers = (newAnswers: Map<QuestionDescription, Responses>) => {
    setPhase(
      {
        ...phase,
        kind: "post-setup",
        phase: {
          kind: "reporting",
        },
        answers: new Map([...answers, ...newAnswers])
      }
    )
  }

  const toOverview = () => {
    setPhase(
      {
        ...phase,
        kind: "post-setup",
        phase: {
          kind: "reporting",
        }
      })
  }

  const startNewSetup = (themes: Set<Theme>) => {
    setPhase(
      {
        ...phase,
        kind: "post-setup",
        phase: {
          kind: "round-setup",
          preselection: themes
        }
      }
    )
  }

  const currentRound = useMemo(() => {
    const previous = Math.max(...[...phase.answers].map(([_, responses]) => responses.round_number))
    if (isFinite(previous)) {
      return previous + 1
    } else {
      return 0
    }


  }, [phase.answers])

  if (innerPhase.kind == "round-setup") {
    return <RoundSetupForm initialSelection={innerPhase.preselection} onSubmit={startNewRound} answers={answers} toOverview={toOverview} />
  } else if (innerPhase.kind == "reporting") {
    return <Reporting config={config} answers={answers} startNewRound={startNewSetup} roundNumber={currentRound - 1} />
  } else if (innerPhase.kind == "collecting") {
    return <QuestionsPhase config={config} onEverythingCollected={submitAnswers} questions={innerPhase.questions} roundNumber={currentRound}></QuestionsPhase>
  }


}


function App() {
  const [currentPhase, setCurrentPhase] = useState<Phase>({ kind: "about" })


  const saveConfig = (config: Config) => {
    setCurrentPhase({ kind: "post-setup", config: config, answers: new Map(), phase: { kind: "round-setup", preselection: new Set(["New to this"]) } })
  }


  return (
    <div className="ticks">
      {currentPhase.kind == "about" && <About continue={() => setCurrentPhase({ kind: "setup" })}></About>}
      {currentPhase.kind == "setup" && <SetupForm onSubmit={saveConfig}></SetupForm>}
      {currentPhase.kind == "post-setup" &&
        <PostSetupPhase phase={currentPhase} setPhase={setCurrentPhase}></PostSetupPhase>
      }

    </div>
  )

}

export default App
