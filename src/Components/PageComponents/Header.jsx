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

import { useEffect, useState } from "react"

import DetailedStatsBar from "./DetailedStatsBar"
import PokemonModel from "./PokemonModel"
import PreviousEvolution from "./PreviousEvolution"
import NextEvolution from "./NextEvolution"
import VariantsBar from "./VariantsBar"

export default function Header({ pokemon, allPokemon }) {
    const [shiny, setShiny] = useState(false)

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

    const bst = Object.values(pokemon.base).reduce((acc, stat) => acc + stat, 0)
    const generation = (pokemon.generation.split("-")[1]).toUpperCase()

    const currentSprite = shiny ? pokemon.sprites.shiny : pokemon.sprites.static
    function toggleShiny() {
        setShiny(!shiny)
    }

    return (
        <section className="header-container">
            <div className="name-index-container">
                <img src={currentSprite} />
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

            <PokemonModel pokemon={pokemon} toggleShiny={toggleShiny} shiny={shiny}/>

            <div className="stats-container">
                <VariantsBar pokemon={pokemon} allPokemon={allPokemon}/>
                <DetailedStatsBar stats={pokemon.base} />
                <div className="weights-heights-container">
                    <p>introduced in gen {generation}</p>
                    <p>BST: {bst}</p>
                    <p>{pokemon.weight} kg/{toPounds} lb</p>
                    <p>{pokemon.height} m/{toFeet} ft</p>
                </div>
                <NextEvolution pokemon={pokemon} />
            </div>

        </section>
    )
}