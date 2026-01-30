import { useState } from "react";
import PokemonEntry from "./PokemonEntry";
import pokeballLoading from "./Images/pokeballLoadingV4.gif";
import pokeballLoadingStillFrame from "./Images/frame_00_delay-0.12s.gif";

export default function DisplayPokemon({ results, loading }) {
    const [isHovering, setIsHovering] = useState(false);
    
    const displayList = results || [];
    const pokeball = isHovering ? pokeballLoading : pokeballLoadingStillFrame;

    const toDisplay = !loading
        ? displayList.map((pokemon, index) => (
              <PokemonEntry key={pokemon.slug} pokemon={pokemon} index={index} />
          ))
        : [];

    const filler = (
        <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="loading-pokeball"
                src={pokeball}
                alt="loading"
            />
            <p style={{ textAlign: "center" }}>results will be displayed here!</p>
        </section>
    );

    return (
        <section className="display-pokemon">
            <section className={toDisplay.length > 0 ? "display-pokemon-container" : "display-pokemon-container centered"}>
                {loading && <p style={{ textAlign: "center" }}>loading...</p>}
                {toDisplay.length === 0 && !loading && filler}
                {toDisplay.length > 0 && toDisplay}
            </section>
        </section>
    );
}