import InputBar from "./Components/InputBar"
import DisplayPrompt from "./Components/DisplayPrompt"
import DisplayPokemon from "./Components/DisplayPokemon"
import { useState } from "react"

export default function App() {
  const [query, setQuery] = useState()
  const [aiResults, setAiResults] = useState(null)
  const [currentFilter, setCurrentFilter] = useState("")

  const handleReset = () => {
    setQuery("")
    setAiResults([])
    setCurrentFilter("")
  }

  return (
    <main>
      <InputBar 
        setQuery={setQuery} 
        results={aiResults} 
        setResults={setAiResults}
        resetSearch={handleReset} 
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />

      <section className="display-prompt-and-pokemon" >
        <DisplayPrompt prompt={query} results={aiResults}/>
        <DisplayPokemon prompt={query} fetchResults={setAiResults} results={aiResults} />
      </section>
    </main>
  )
}