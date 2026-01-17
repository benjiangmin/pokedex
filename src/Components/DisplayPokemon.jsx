import PokemonEntry from "./PokemonEntry"
import pokeballLoading from "./Images/pokeballLoadingV4.gif"

export default function DisplayPokemon({ results, loading }) {
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
                {loading && <p style={{ textAlign: "center" }}>loading...</p>}
                {toDisplay.length === 0 && !loading && filler}
                {toDisplay.length > 0 && toDisplay}
            </section>
        </section>
    );
}