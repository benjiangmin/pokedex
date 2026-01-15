import { Link } from "react-router-dom"
import pokemonData from "../../../public/pokedex-master.json";

import leftArrow from "../Images/leftArrow.png"

export default function PreviousEvolution({ pokemon }) {
    const prevEvo = pokemon.evolutionChain.find(evo => (
        evo.to === pokemon.name.english
    ))
    if (!prevEvo) return null

    const prevPokemon = pokemonData.find(p => p.name.english === prevEvo.from)

    return (
        <section className="evolution-logic-container">
            <Link style={{textDecoration:"none"}} to={`/pokemon/${prevPokemon?.slug}`}>
            <section style={{display:"flex", gap:"3px", justifyContent:"right"}}>
                <img src={leftArrow} className="left-arrow"/>
                <p className="prev-evolution-link">{`evolves from ${prevEvo.from}`}</p>
            </section>
                <div className="prev-evolution-requirements">
                    {prevEvo.details.map((detail, index) => (
                        <div style={{display:"flex", gap:"4px", justifyContent:"right"}} key={index}>
                            {detail.min_level && <span className="requirements-container">lvl {detail.min_level}</span>}
                            {detail.item && <span className="requirements-container">holding {detail.item}</span>}
                            {detail.held_item && <span className="requirements-container">trade with {detail.held_item}</span>}
                            {detail.known_move && <span className="requirements-container">knows {detail.known_move}</span>}
                            {detail.location && <span className="requirements-container">at {detail.location}</span>}
                            {detail.time_of_day && <span className="requirements-container">({detail.time_of_day})</span>}
                        </div>
                    ))}
                </div>
            </Link>
        </section>
    )
}