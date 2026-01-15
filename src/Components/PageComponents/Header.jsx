import bug from "../Images/bug.png"
import dark from "../Images/dark.png"
import dragon from "../Images/dragon.png"
import electric from "../Images/electric.png"
import fairy from "../Images/fairy.png"
import fighting from "../Images/fighting.png"
import fire from "../Images/fire.png"
import flying from "../Images/flying.png"
import ghost from "../Images/ghost.png"
import grass from "../Images/grass.png"
import ground from "../Images/ground.png"
import ice from "../Images/ice.png"
import normal from "../Images/normal.png"
import poison from "../Images/poison.png"
import psychic from "../Images/psychic.png"
import rock from "../Images/rock.png"
import steel from "../Images/steel.png"
import water from "../Images/water.png"

import { useParams } from "react-router-dom"
import { useEffect } from "react"

import pokemonData from "../../../public/pokedex-master.json"
import DetailedStatsBar from "./DetailedStatsBar"
import PokemonModel from "./PokemonModel"
import PreviousEvolution from "./PreviousEvolution"
import NextEvolution from "./NextEvolution"

export default function Header() {
    const { slug } = useParams()
    const pokemon = pokemonData.find(pokemon => pokemon.slug === slug)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const toFeet = (pokemon.height * 3.28).toFixed(2)
    const toPounds = (pokemon.weight * 2.205).toFixed(2)

    const typeImages = {
        Bug: bug, Dark: dark, Dragon: dragon, Electric: electric, Fairy: fairy,
        Fighting: fighting, Fire: fire, Flying: flying, Ghost: ghost, Grass: grass,
        Ground: ground, Ice: ice, Normal: normal, Poison: poison, Psychic: psychic,
        Rock: rock, Steel: steel, Water: water
    };

    return (
        <section className="header-container">
            <div className="name-index-container">
                <img src={pokemon.sprites.static} />
                <h3>{pokemon.name.english}</h3>
                <p>#{pokemon.id}</p>
                <h4 className="category-text">The {pokemon.category}</h4>
                <section style={{ display: "flex" }}>
                    {pokemon.type.map(type => (
                        <img key={type} alt={type} src={typeImages[type]} className="pokemon-types-icons" />
                    ))}
                </section>
                <PreviousEvolution pokemon={pokemon} />
            </div>

            <PokemonModel pokemon={pokemon} />

            <div className="stats-container">
                <DetailedStatsBar stats={pokemon.base} />
                <div className="weights-heights-container">
                    <p>{pokemon.weight} kg/{toPounds} lb</p>
                    <p>{pokemon.height} m/{toFeet} ft</p>
                </div>
                <NextEvolution pokemon={pokemon} />
            </div>

        </section>
    )
}