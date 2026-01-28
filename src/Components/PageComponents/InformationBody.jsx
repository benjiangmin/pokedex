import TypeLogic from "./TypeLogic.jsx"
import AbilitiesLogic from "./AbilitiesLogic.jsx"
import MovesLogicLevelUp from "./MovesLogicLevelUp.jsx"
import MovesLogicMachine from "./MovesLogicMachine.jsx"
import MovesLogicEgg from "./MovesLogicEgg.jsx"
import Locations from "./Locations.jsx"

export default function InformationBody(props) {
    const background = props.pokemon.sprites.background
    const backup = props.pokemon.sprites.backup_background
    const finalBackground = background != null ? background : backup

    const isUsingBackup = !props.pokemon.sprites.background && props.pokemon.sprites.backup_background;
    const showBackupClass = isUsingBackup ? "show-backup" : "";

    return (
        <section className="information-body-container">
            <section className="information-left">
                <TypeLogic pokemon={props.pokemon} />
                <AbilitiesLogic pokemon={props.pokemon} />
                <Locations pokemon={props.pokemon} />
                <img className={`background-sprite ${showBackupClass}`} src={finalBackground} />
            </section>
            <section className="information-right">
                <MovesLogicLevelUp pokemon={props.pokemon} />
                <MovesLogicMachine pokemon={props.pokemon} />
                <MovesLogicEgg pokemon={props.pokemon} />
            </section>
        </section>
    )
} 