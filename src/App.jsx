import InputBar from "./Components/InputBar"
import DisplayPrompt from "./Components/DisplayPrompt"
import DisplayPokemon from "./Components/DisplayPokemon"
import { useState } from "react"

export default function App() {
  const [query, setQuery] = useState()

  return (
    <main>
      <InputBar setQuery={setQuery}/>

      <section className="display-prompt-and-pokemon" >
        <DisplayPrompt prompt={query} />
        <DisplayPokemon prompt={query}/>
      </section>
    </main>
  )
}