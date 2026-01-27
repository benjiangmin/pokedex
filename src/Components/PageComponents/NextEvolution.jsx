import { Link } from "react-router-dom"
import pokemonData from "../../../pokedex-master.json" 
import rightArrow from "../Images/right.png"

export default function NextEvolution({ pokemon }) {
    const nextEvos = pokemon.evolutionChain.filter(evo => (
        evo.from === pokemon.name.english
    ))

    if (nextEvos.length === 0) return null

    return (
        <section className="next-evolution-logic-container">
            {nextEvos.map((evo, idx) => {
                const targetSlug = evo.toSlug || pokemonData.find(p => p.name.english === evo.to)?.slug;

                return (
                    <Link
                        key={idx}
                        className="link-to-evo-container next"
                        style={{ textDecoration: "none" }}
                        to={`/pokemon/${targetSlug}`}
                    >
                        <section style={{ display: "flex", gap: "3px", justifyContent: "left", alignItems: "center" }}>
                            <p className="next-evolution-link">{`evolves into ${evo.to}`}</p>
                            <img src={rightArrow} className="right-arrow" alt="arrow" />
                        </section>

                        <div className="next-evolution-requirements">
                            {evo.details.map((detail, dIdx) => (
                                <div style={{ display: "flex", gap: "4px", justifyContent: "left" }} key={dIdx}>
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
                )
            })}
        </section>
    )
}