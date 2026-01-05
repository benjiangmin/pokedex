export default function PokemonEntry(props) {
    return (
        <div style={{display: "flex"}}>
            <img
                src={props.pokemon.sprite}
                alt={props.pokemon.name.english}
                style={{width: "50px", height: "50px"}}
            />
            <p>{props.pokemon.name.english}</p>
        </div>
    )
}