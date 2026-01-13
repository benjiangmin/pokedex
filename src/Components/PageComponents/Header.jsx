import { useParams } from "react-router-dom"
import { useEffect } from "react"

import pokemonData from "../../../pokedex-enriched.json"
import DetailedStatsBar from "./DetailedStatsBar"
import PokemonModel from "./PokemonModel"

export default function Header() {
    const { slug } = useParams()
    const pokemon = pokemonData.find(pokemon => pokemon.slug === slug)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const toFeet = (pokemon.height*3.28).toFixed(2)
    const toPounds = (pokemon.weight*2.205).toFixed(2)

    return (
        <section className="header-container">
            <div className="name-index-container">
                <img src={pokemon.sprites.static}/>
                <h3>{pokemon.name.english}</h3>
                <p>#{pokemon.id}</p>
                <h4 className="category-text">The {pokemon.category}</h4>
            </div>

            <PokemonModel pokemon={pokemon}/>

            <div className="stats-container">
                <DetailedStatsBar stats={pokemon.base}/>    
                <div className="weights-heights-container">
                    <p>{pokemon.weight} kg/{toPounds} lb</p>            
                    <p>{pokemon.height} m/{toFeet} ft</p>            
                </div>
            </div>
        </section>
    )
}