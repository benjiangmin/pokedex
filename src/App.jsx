import InputBar from "./Components/InputBar"
import DisplayPrompt from "./Components/DisplayPrompt"
import DisplayPokemon from "./Components/DisplayPokemon"
import PokemonPage from "./Components/PokemonPage"

import { applyFilters } from "./Components/applyFilters"
import pokemonData from "../public/pokedex-master.json"
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"


export default function App() {
  const [query, setQuery] = useState()
  const [aiResults, setAiResults] = useState(null)
  const [currentFilter, setCurrentFilter] = useState("")
  const [ascending, setAscending] = useState(true)
  const [loading, setLoading] = useState(false)

  const performSearch = async (userPrompt) => {
    if (!userPrompt) return;

    setLoading(true)
    console.log("Calling OpenAI for:", userPrompt)

    const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:3001" 
    : "https://pokedex-11k9.onrender.com";

    try {
      const response = await fetch(`${API_BASE_URL}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery: userPrompt })
      })
      const rules = await response.json()
      console.log(rules)

      const results = applyFilters(pokemonData, rules)
      setAiResults(results)
    } catch (err) {
      console.error("Search failed", err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setQuery("")
    setAiResults([])
    setCurrentFilter("")
  }

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <InputBar
                setQuery={setQuery}
                results={aiResults}
                setResults={setAiResults}
                resetSearch={handleReset}
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
                ascending={ascending}
                setAscending={setAscending}
                performSearch={performSearch}
                prompt={query}
              />

              <section className="display-prompt-and-pokemon" >
                <DisplayPrompt prompt={query} results={aiResults} />
                <DisplayPokemon results={aiResults} loading={loading} />
              </section>
            </>
          } />

          <Route path="/pokemon/:slug" element={<PokemonPage allPokemon={pokemonData}/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}





// features i need to add:
// fix minioir
// add website icon
// find out how to get better location data
// fix sorting button spacing

