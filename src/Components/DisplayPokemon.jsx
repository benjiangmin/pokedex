import pokemonData from "../../pokedex.json"

export default function DisplayPokemon() {
    const allPokemon = pokemonData.map(pokemon => {
        return <p>{pokemon.name.english}</p>
    })
    
    return (
        <section className="display-pokemon">
            {allPokemon}
        </section>
    )
}