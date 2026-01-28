import TypeLogic from "./TypeLogic.jsx"
import AbilitiesLogic from "./AbilitiesLogic.jsx"
import MovesLogicLevelUp from "./MovesLogicLevelUp.jsx"
import MovesLogicMachine from "./MovesLogicMachine.jsx"
import MovesLogicEgg from "./MovesLogicEgg.jsx"
import Locations from "./Locations.jsx"

import testing from "../Images/wiglettTesting.svg"
import wugtrio from "../Images/wugtrioTesting.svg"

export default function InformationBody(props) {
    const show = props.pokemon.id == 960 || 961 ? true : false;
    const sprite = props.pokemon.id == 960 ? testing : wugtrio;
    
    return (
        <section className="information-body-container">
            <section className="information-left">
                <TypeLogic pokemon={props.pokemon}/>
                <AbilitiesLogic pokemon={props.pokemon} />
                <Locations pokemon={props.pokemon} />
                {show && <img className="background-sprite" src={sprite}/>}
            </section>  
            <section className="information-right">
                <MovesLogicLevelUp pokemon={props.pokemon} />
                <MovesLogicMachine pokemon={props.pokemon} />
                <MovesLogicEgg pokemon={props.pokemon} />
            </section>
        </section>
    )
}