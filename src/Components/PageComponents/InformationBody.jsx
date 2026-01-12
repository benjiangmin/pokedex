import TypeLogic from "./TypeLogic.jsx"
export default function InformationBody(props) {
    
    return (
        <section className="information-body-container">
            <TypeLogic pokemon={props.pokemon}/>
        </section>
    )
}