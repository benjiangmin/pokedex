import { useParams } from "react-router-dom"
import { useEffect } from "react"

import pokemonData from "../../pokedex-enriched.json"
import Header from "./PageComponents/Header"
import InformationBody from "./PageComponents/InformationBody"

export default function PokemonPage() {
    const { slug } = useParams()
    const pokemon = pokemonData.find(pokemon => pokemon.slug === slug)

    useEffect(() => {
        const originalColor = document.body.style.backgroundColor
        document.body.style.backgroundColor = "#2a2a2a"

        return () => {
            document.body.style.backgroundColor = originalColor
        }
    }, [])

    return (
        <section style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "40px"
        }}
        >
            <Header />
            <InformationBody pokemon={pokemon} />

        </section>
    )
}