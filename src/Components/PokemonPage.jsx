import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Header from "./PageComponents/Header"
import InformationBody from "./PageComponents/InformationBody"

export default function PokemonPage({ allPokemon }) {
    const { slug } = useParams()

    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const originalColor = document.body.style.backgroundColor
        document.body.style.backgroundColor = "#2a2a2a"

        setLoading(true)
        Promise.all([
            fetch(`/pokemon-data/${slug}.json`).then(res => res.json()),
            fetch(`/pokemon-data/custom-data/custom-data.json`).then(res => res.json())
        ])
            .then(([standardData, allCustomData]) => {
                const override = allCustomData[slug.toLowerCase()] || {}
                console.log("Merging Override:", override); 

                const mergedPokemon = {
                    ...standardData,
                    ...override
                }

                setPokemon(mergedPokemon)
                setLoading(false)
            })
            .catch(err => {
                console.error("error fetching pokemon details.", err)
                setLoading(false)
            })

        return () => {
            document.body.style.backgroundColor = originalColor
        }
    }, [slug])

    if (!pokemon) {
        return <p style={{ color: "white" }}>Pokemon not found.</p>
    }

    return (
        <section style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            minHeight: "100vh",
            gap: "40px",
        }}>
            <Link to="/" className="home-button">home</Link>
            <Header pokemon={pokemon} allPokemon={allPokemon} />
            <InformationBody pokemon={pokemon} />
        </section>
    )
}