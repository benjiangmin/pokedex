import TypeLogic from "./TypeLogic.jsx"
import AbilitiesLogic from "./AbilitiesLogic.jsx"
import MovesLogicLevelUp from "./MovesLogicLevelUp.jsx"

export default function InformationBody(props) {
    
    return (
        <section className="information-body-container">
            <section className="information-left">
                <TypeLogic pokemon={props.pokemon}/>
                <AbilitiesLogic pokemon={props.pokemon} />
            </section>
            <section className="information-right">
                <MovesLogicLevelUp pokemon={props.pokemon} />
            </section>
        </section>
    )
}