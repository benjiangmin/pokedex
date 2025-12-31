import pokemonData from "../../pokedex.json"

export default function DisplayPokemon(props) {
    const matches = pokemonData.filter(pokemon => (
        pokemon.type.includes(props.prompt)
    ))
    .map(pokemon => (
        <p key={pokemon.id}>{pokemon.name.english}</p>
    ))

    return (
        <section className="display-pokemon">
            {matches}
        </section>
    )
}