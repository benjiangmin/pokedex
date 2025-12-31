import { useState, useEffect } from "react"
import pokemonData from "../../pokedex.json"

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

                const results = pokemonData.filter(pokemon => {
                    if (rules.types?.length > 0) {
                        const hasType = rules.types.some(t => pokemon.type.includes(t))
                        if (!hasType) return false
                    }
                    if (rules.minStats) {
                        for (const [stat, value] of Object.entries(rules.minStats)) {
                            if (pokemon.base[stat] < value) return false
                        }
                    }
                    return true
                })
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
        <p key={pokemon.id}>{pokemon.name.english}</p>
    ))

    return (
        <section className="display-pokemon">
            {loading && <p>loading</p>}
            {toDisplay}
        </section>
    )
}