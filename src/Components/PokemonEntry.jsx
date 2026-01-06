import { useState } from "react"
import ExtraDetails from "./ExtraDetails"

export default function PokemonEntry(props) {
    const [showDetails, setShowDetails] = useState(false)
    const handleMouseClick = () => setShowDetails(true)
    const handleMouseLeave = () => setShowDetails(false)

    return (
        <div 
            className="pokemon-entry" 
            style={{animationDelay: `${props.index * 0.1}s`}}
            onClick={handleMouseClick}
            onMouseLeave={handleMouseLeave}
        >
            <p>{props.pokemon.name.english}</p>
            <section>{showDetails && <ExtraDetails pokemon={props.pokemon}/>}</section>
            <img
                style={{marginLeft:"10px"}}
                src={props.pokemon.sprite}
                alt={props.pokemon.name.english}
            />
        </div>
    )
}