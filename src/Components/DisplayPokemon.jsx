import PokemonEntry from "./PokemonEntry"
import pokeballLoading from "./Images/pokeballLoadingV4.gif"

export default function DisplayPokemon({ results, loading }) {
    
    // Define toDisplay based on the results prop
    const displayList = results || [];
    
    const toDisplay = displayList.map((pokemon, index) => (
        <PokemonEntry key={pokemon.slug} pokemon={pokemon} index={index} />
    ));

    const filler = (
        <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>    
            <img className="loading-pokeball" src={pokeballLoading} alt="loading" />
            <p style={{ textAlign: "center" }}>results will be displayed here!</p>
        </section>
    );

    return (
        <section className="display-pokemon">
            <section className={toDisplay.length > 0 ? "display-pokemon-container" : "display-pokemon-container centered"}>
                {/* Check the loading prop passed from App.js */}
                {loading && <p style={{ textAlign: "center" }}>loading...</p>}
                
                {/* Show filler only if not loading and no results */}
                {toDisplay.length === 0 && !loading && filler}
                
                {/* Show results if they exist */}
                {toDisplay.length > 0 && toDisplay}
            </section>
        </section>
    );
}