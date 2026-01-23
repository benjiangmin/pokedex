import PokemonEntry from "./PokemonEntry"
import pokeballLoading from "./Images/pokeballLoadingV4.gif"
// import ferrothorn from "./Images/ferrothorn.gif"
// import krokorok from "./Images/krokorok.gif"

export default function DisplayPokemon({ results, loading }) {
    const displayList = results || [];

    const toDisplay = !loading ?
        displayList.map((pokemon, index) => (
            <PokemonEntry key={pokemon.slug} pokemon={pokemon} index={index} />
        )) : []

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
                {/* <img className="ferrothorn" src={ferrothorn} />
                <img className="krokorok" src={krokorok} /> */}
            </section>
        </section>
    );
}