export default function PokemonEntry(props) {
    return (
        <div className="pokemon-entry">
            <p>{props.pokemon.name.english}</p>
            <img
                src={props.pokemon.sprite}
                alt={props.pokemon.name.english}
            />
        </div>
    )
}