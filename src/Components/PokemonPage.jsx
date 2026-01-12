import { useParams, useNavigate } from "react-router-dom"

import pokemonData from "../../pokedex-enriched.json"
import Header from "./PageComponents/Header"
import InformationBody from "./PageComponents/InformationBody"

export default function PokemonPage() {
    const { slug } = useParams()
    const pokemon = pokemonData.find(pokemon => pokemon.slug === slug)

    return (
        <section style={{display:"flex", 
            flexDirection:"column", 
            alignItems:"center", 
            width:"100%",
            height:"100%"}}
        >
            <Header />
            <InformationBody pokemon={pokemon}/>
        </section>
    )
}