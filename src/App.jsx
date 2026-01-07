import InputBar from "./Components/InputBar"
import DisplayPrompt from "./Components/DisplayPrompt"
import DisplayPokemon from "./Components/DisplayPokemon"
import { useState } from "react"

export default function App() {
  const [query, setQuery] = useState()
  const [aiResults, setAiResults] = useState(null)

  return (
    <main>
      <InputBar setQuery={setQuery} aiResults={aiResults}/>

      <section className="display-prompt-and-pokemon" >
        <DisplayPrompt prompt={query} results={aiResults}/>
        <DisplayPokemon prompt={query} fetchResults={setAiResults} />
      </section>
    </main>
  )
}