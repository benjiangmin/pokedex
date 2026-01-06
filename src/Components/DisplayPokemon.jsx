import { useState, useEffect } from "react"
import { applyFilters } from "./applyFilters"
import pokemonData from "../../pokedex-enriched.json"
import PokemonEntry from "./PokemonEntry"

export default function DisplayPokemon(props) {
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!props.prompt) return

        const search = async () => {
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3001/api/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userQuery: props.prompt })
                })
                const rules = await response.json()
                console.log(rules)

                const results = applyFilters(pokemonData, rules)
                console.log(`matches found...maybe: ${results.length}`)

                setFiltered(results)
            } catch (err) {
                console.error("awww mannn there was an error, dont give up Ben!", err)
            } finally {
                setLoading(false)
            }
        }

        search()
    }, [props.prompt])

    const toDisplay = filtered.map(pokemon => (
        <PokemonEntry key={pokemon.id} pokemon={pokemon} />
    ))

    return (
        <section className="display-pokemon">
            <section className="display-pokemon-container">
                {loading && <p>loading</p>}
                {toDisplay.length > 0 && toDisplay}
            </section>
        </section>
    )
}