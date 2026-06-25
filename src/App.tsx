import { useEffect, useState } from 'react'
import './App.css'
import type { Answer, Config } from './types'
import { SetupForm } from './setup'
import { QuestionsPhase } from './questionForm'
import Reporting from './Reporting'
import type { Theme } from './data'
import safe1 from './assets/safe_for_work1.gif'
import safe2 from './assets/safe_for_work2.gif'
// import sexy1 from './assets/sexy_1.webp'
// import sexy2 from './assets/sexy_2.gif'

type Setup = { kind: "setup", preselection: Set<Theme> }
type Collecting = { kind: "collecting", config: Config }
type ReportingPhase = { kind: "reporting", answers: Answer[], config: Config }

type Phase = Setup | Collecting | ReportingPhase

function App() {
  const [currentPhase, setCurrentPhase] = useState<Phase>({ kind: "setup", preselection: new Set(["New to this"]) })

  const startNewRound = (themes: Theme[]) => setCurrentPhase({ kind: "setup", preselection: new Set(themes) })

  const setImages = (image1: string, image2: string): void => {
    const elements = Array.from(document.querySelectorAll<HTMLImageElement>(".sidebar img"))
    elements.forEach((elem, i) => {
      const newSrc = i % 2 === 0 ? image1 : image2

      const pre = new Image()
      pre.onload = () => {
        elem.src = newSrc
      }
      pre.onerror = () => {
        elem.src = newSrc
      }
      pre.src = newSrc
    })
  }

  useEffect(() => setImages(safe1, safe2))

  const saveConfig = (config: Config) => {
    setCurrentPhase({ kind: "collecting", config })

    // if (config.themes.has("Kinky")) {
    //   console.log("updating the images")
    //   setImages(sexy1, sexy2)
    // }


  }

  return (
    <div className="ticks">
      {currentPhase.kind == "setup" && <SetupForm initialSelection={currentPhase.preselection} onSubmit={saveConfig}></SetupForm>}
      {currentPhase.kind == "collecting" && <QuestionsPhase config={currentPhase.config} onEverythingCollected={(answers) => setCurrentPhase({ kind: "reporting", answers, config: currentPhase.config })}></QuestionsPhase>}
      {currentPhase.kind == 'reporting' && (
        <Reporting config={currentPhase.config} answers={currentPhase.answers} startNewRound={startNewRound} />
      )}

    </div>
  )

}

export default App
