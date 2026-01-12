import Header from "./PageComponents/Header"
import InformationBody from "./PageComponents/InformationBody"

export default function PokemonPage() {

    return (
        <section style={{display:"flex", 
            flexDirection:"column", 
            alignItems:"center", 
            width:"100%",
            height:"100%"}}
        >
            <Header />
            <InformationBody />
        </section>
    )
}