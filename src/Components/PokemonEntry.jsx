export default function PokemonEntry(props) {
    return (
        <div className="pokemon-entry">
            <p>{props.pokemon.name.english}</p>
            <img
                style={{marginLeft:"10px"}}
                src={props.pokemon.sprite}
                alt={props.pokemon.name.english}
            />
        </div>
    )
}