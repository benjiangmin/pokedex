import { useParams, useNavigate } from "react-router-dom"
import pokemonData from "../../pokedex-enriched.json"
import { useEffect } from "react"

export default function PokemonPage() {
    const { slug } = useParams()
    const navigate = useNavigate()

    const pokemon = pokemonData.find(pokemon => pokemon.slug === slug)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const moves = pokemon.moves.map(move => (
        <p>{move}</p>
    ))
    
    return (
        <p>{moves}</p>
    )
}