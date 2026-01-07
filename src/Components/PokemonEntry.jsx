import { useState } from "react"
import ExtraDetails from "./ExtraDetails"

import bug from "./Images/bug.png"
import dark from "./Images/dark.png"
import dragon from "./Images/dragon.png"
import electric from "./Images/electric.png"
import fairy from "./Images/fairy.png"
import fighting from "./Images/fighting.png"
import fire from "./Images/fire.png"
import flying from "./Images/flying.png"
import ghost from "./Images/ghost.png"
import grass from "./Images/grass.png"
import ground from "./Images/ground.png"
import ice from "./Images/ice.png"
import normal from "./Images/normal.png"
import poison from "./Images/poison.png"
import psychic from "./Images/psychic.png"
import rock from "./Images/rock.png"
import steel from "./Images/steel.png"
import water from "./Images/water.png"

export default function PokemonEntry(props) {
    const [showDetails, setShowDetails] = useState(false)
    const handleMouseClick = () => setShowDetails(true)
    const handleMouseLeave = () => setShowDetails(false)

    const typeImages = {
        Bug: bug,
        Dark: dark,
        Dragon: dragon,
        Electric: electric,
        Fairy: fairy,
        Fighting: fighting,
        Fire: fire,
        Flying: flying,
        Ghost: ghost,
        Grass: grass,
        Ground: ground,
        Ice: ice,
        Normal: normal,
        Poison: poison,
        Psychic: psychic,
        Rock: rock,
        Steel: steel,
        Water: water
    };

    const currentImage = showDetails 
        ? props.pokemon.sprites.animated
        : props.pokemon.sprites.static

    return (
        <div
            className="pokemon-entry"
            style={{ animationDelay: `${props.index * 0.1}s` }}
            onClick={handleMouseClick}
            onMouseLeave={handleMouseLeave}
        >

            <div className="entry-left">
                {!showDetails && <p style={{marginLeft:`${!showDetails ? "20px" : "0px"}`}}>{props.pokemon.name.english}</p>}
                {showDetails && <ExtraDetails pokemon={props.pokemon} />}
            </div>

            <div className="entry-right">
                <img
                    className={showDetails ? "animated-image" : ""}
                    src={currentImage}
                    alt={props.pokemon.name.english}
                />
                <div className="type-icon-bar">
                    {showDetails && props.pokemon.type.map(type => (
                        <img key={type} src={typeImages[type]} alt={type} />
                    ))}
                </div>
            </div>
        </div>
    )
}