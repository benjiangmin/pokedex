import { Link } from "react-router-dom"
import pokemonData from "../../../pokedex-master.json" 
import leftArrow from "../Images/left.png"

export default function PreviousEvolution({ pokemon }) {
    const prevEvo = pokemon.evolutionChain.find(evo => (
        evo.to === pokemon.name.english
    ))

    if (!prevEvo) return null

    const targetSlug = prevEvo.fromSlug || pokemonData.find(p => p.name.english === prevEvo.from)?.slug;

    return (
        <section className="evolution-logic-container">
            <Link
                className="link-to-evo-container"
                style={{ textDecoration: "none" }}
                to={`/pokemon/${targetSlug}`}
            >
                <section style={{ display: "flex", gap: "3px", justifyContent: "right", alignItems: "center" }}>
                    <img src={leftArrow} className="left-arrow" alt="back" />
                    <p className="prev-evolution-link">{`evolves from ${prevEvo.from}`}</p>
                </section>
                <div className="prev-evolution-requirements">
                    {prevEvo.details.map((detail, index) => (
                        <div style={{ display: "flex", gap: "4px", justifyContent: "right" }} key={index}>
                            {detail.min_level && <span className="requirements-container">lvl {detail.min_level}</span>}
                            {detail.item && <span className="requirements-container">use {detail.item}</span>}
                            {detail.held_item && <span className="requirements-container">holding {detail.held_item}</span>}
                            {detail.trigger === "Trade" && !detail.held_item && <span className="requirements-container">(trade)</span>}
                            {detail.known_move && <span className="requirements-container">knows {detail.known_move}</span>}
                            {detail.location && <span className="requirements-container">in {detail.location}</span>}
                            {detail.time_of_day && <span className="requirements-container">({detail.time_of_day})</span>}
                            {detail.min_happiness && <span className="requirements-container">happiness {detail.min_happiness}</span>}
                        </div>
                    ))}
                </div>
            </Link>
        </section>
    )
}