import { useEffect, useState } from 'react'
import './App.css'
import type { Answer, Config } from './types'
import { SetupForm } from './setup'
import { QuestionsPhase } from './questionForm'
import Reporting from './Reporting'
import type { Theme } from './data'
import { About } from './About'


type Setup = { kind: "setup", preselection: Set<Theme> }
type Collecting = { kind: "collecting", config: Config }
type ReportingPhase = { kind: "reporting", answers: Answer[], config: Config }
type About = { kind: "about" }

type Phase = About | Setup | Collecting | ReportingPhase

function App() {
  const [currentPhase, setCurrentPhase] = useState<Phase>({ kind: "about"})

  const startNewRound = (themes: Theme[]) => setCurrentPhase({ kind: "setup", preselection: new Set(themes) })

  const saveConfig = (config: Config) => {
    setCurrentPhase({ kind: "collecting", config })
  }

  return (
    <div className="ticks">
      {currentPhase.kind == "about" && <About continue={() => startNewRound(["New to this"])}></About>}
      {currentPhase.kind == "setup" && <SetupForm initialSelection={currentPhase.preselection} onSubmit={saveConfig}></SetupForm>}
      {currentPhase.kind == "collecting" && <QuestionsPhase config={currentPhase.config} onEverythingCollected={(answers) => setCurrentPhase({ kind: "reporting", answers, config: currentPhase.config })}></QuestionsPhase>}
      {currentPhase.kind == 'reporting' && (
        <Reporting config={currentPhase.config} answers={currentPhase.answers} startNewRound={startNewRound} />
      )}

    </div>
  )

}

export default App
