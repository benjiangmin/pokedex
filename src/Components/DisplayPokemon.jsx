import { useState, useEffect } from "react"
import { applyFilters } from "./applyFilters"
import pokemonData from "../../public/pokedex-master.json"
import PokemonEntry from "./PokemonEntry"

import pokeballLoading from "./Images/pokeballLoadingV4.gif"

export default function DisplayPokemon(props) {
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!props.prompt) {
            setFiltered([])
            return
        }

        const search = async () => {
            setFiltered([])
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
                props.fetchResults(results)
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

    useEffect(() => {
        setFiltered(props.results || [])
    }, [props.results])

    const toDisplay = filtered.map((pokemon, index) => (
        <PokemonEntry key={pokemon.slug} pokemon={pokemon} index={index}/>
    ))

    const filler = (
        <section style={{display:"flex", flexDirection:"column", alignItems:"center"}}>    
            <img className="loading-pokeball" src={pokeballLoading}/>
            <p style={{textAlign:"center"}}>results will be displayed here!</p>
        </section>
    )

    return (
        <section className="display-pokemon">
            <section className={toDisplay.length > 0 ? "display-pokemon-container" : "display-pokemon-container centered"}>
                {loading && <p style={{textAlign:"center"}}>loading...</p>}
                {toDisplay.length === 0 && !loading && filler}
                {toDisplay.length > 0 && toDisplay}
            </section>
        </section>
    )
}