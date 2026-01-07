import { useState } from "react"
import ExtraDetails from "./ExtraDetails"

import bug from "./TypeImages/bug.png"
import dark from "./TypeImages/dark.png"
import dragon from "./TypeImages/dragon.png"
import electric from "./TypeImages/electric.png"
import fairy from "./TypeImages/fairy.png"
import fighting from "./TypeImages/fighting.png"
import fire from "./TypeImages/fire.png"
import flying from "./TypeImages/flying.png"
import ghost from "./TypeImages/ghost.png"
import grass from "./TypeImages/grass.png"
import ground from "./TypeImages/ground.png"
import ice from "./TypeImages/ice.png"
import normal from "./TypeImages/normal.png"
import poison from "./TypeImages/poison.png"
import psychic from "./TypeImages/psychic.png"
import rock from "./TypeImages/rock.png"
import steel from "./TypeImages/steel.png"
import water from "./TypeImages/water.png"

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