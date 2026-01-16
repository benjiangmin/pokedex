import { useState, useEffect } from "react";
import allMoves from "../../../moves.json";

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

import special from "../Images/move-special.png"
import physical from "../Images/move-physical.png"
import status from "../Images/move-status.png"

export default function MovesLogicEgg({ pokemon }) {
    const typeImages = {
        Bug: bug, Dark: dark, Dragon: dragon, Electric: electric, Fairy: fairy,
        Fighting: fighting, Fire: fire, Flying: flying, Ghost: ghost, Grass: grass,
        Ground: ground, Ice: ice, Normal: normal, Poison: poison, Psychic: psychic,
        Rock: rock, Steel: steel, Water: water
    };
    const categoryImages = {
        special: special, physical: physical, status: status
    }

    const generations = Object.keys(pokemon.moves)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
        .filter(gen => pokemon.moves[gen].some(move => move.learn_method === "egg"));

    const [genIndex, setGenIndex] = useState(generations.length - 1);

    useEffect(() => {
        setGenIndex(generations.length - 1);
    }, [pokemon.slug, generations.length]);

    if (generations.length === 0) {
        return (
            <section className="moves-logic-container">
                <section className="moves-logic-header">
                    <h2>moves learnt from egg</h2>
                </section>
                <p style={{ textAlign: "center", margin: "20px", fontFamily: "Sour Gummy" }}>No egg moves found for this form.</p>
            </section>
        );
    }

    const currentGenName = generations[genIndex] || generations[generations.length - 1];
    const rawMoves = pokemon.moves[currentGenName] || [];

    const processedMoves = (() => {
        const seen = new Set();
        return [...rawMoves]
            .filter(move => move.learn_method === "egg")
            .filter(move => {
                const moveName = move.name.toLowerCase();
                if (seen.has(moveName)) return false;
                seen.add(moveName);
                return true;
            });
    })();

    const handleCycleGen = () => {
        setGenIndex((prevIndex) => (prevIndex + 1) % generations.length);
    };

    return (
        <section className="moves-logic-container">
            <section onClick={handleCycleGen} className="moves-logic-header">
                <h2 title="click to cycle generations" style={{ cursor: 'pointer' }}>
                    moves learnt by egg
                </h2>
                <h3>{currentGenName}</h3>
            </section>

            <div className="moves-list">
                {processedMoves.length > 0 ? (
                    processedMoves.map((move, index) => {
                        const moveDetails = allMoves.find(
                            (m) => m.name.toLowerCase() === move.name.toLowerCase()
                        );

                        return (
                            <section className="move-row" key={`${currentGenName}-${move.name}-${index}`}>
                                <section className="move-and-level">
                                    <h4 style={{ paddingLeft: "20px" }}>{move.name}</h4>
                                </section>

                                <section className="type-and-category">
                                    <img className="move-type-icons" src={typeImages[moveDetails?.type]} />
                                    <img className="status-icons" src={categoryImages[moveDetails?.damage_class]} />
                                </section>

                                <section className="power-and-accuracy">
                                    <section className="pow-acc-wrapper">
                                        <p>pow</p>
                                        <h4>{moveDetails?.power || "-"}</h4>
                                    </section>
                                    <section className="pow-acc-wrapper">
                                        <p>acc</p>
                                        <h4>{moveDetails?.accuracy || "-"}</h4>
                                    </section>
                                </section>
                            </section>
                        );
                    })
                ) : (
                    <p style={{ textAlign: "center", fontFamily: "Sour Gummy", margin: "3px" }}>no egg moves found for {currentGenName}</p>
                )}
            </div>
        </section>
    );
}