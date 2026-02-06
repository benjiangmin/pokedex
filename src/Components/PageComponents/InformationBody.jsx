import TypeLogic from "./TypeLogic.jsx"
import AbilitiesLogic from "./AbilitiesLogic.jsx"
import MovesLogicLevelUp from "./MovesLogicLevelUp.jsx"
import MovesLogicMachine from "./MovesLogicMachine.jsx"
import MovesLogicEgg from "./MovesLogicEgg.jsx"
import Locations from "./Locations.jsx"
import customData from "../../../public/pokemon-data/custom-data/custom-data.json"

export default function InformationBody(props) {
    const slug = props.pokemon.slug;

    const customBackground = customData[slug]?.custom_background;

    const background = props.pokemon.sprites.background;
    const backup = props.pokemon.sprites.backup_background;

    const finalBackground = customBackground || background || backup;

    const isUsingBackup = !customBackground && !background && backup;
    const showBackupClass = isUsingBackup ? "show-backup" : "";

    return (
        <section className="information-body-container">
            <section className="information-left">
                <TypeLogic pokemon={props.pokemon} />
                <AbilitiesLogic pokemon={props.pokemon} />
                <Locations pokemon={props.pokemon} />
                <img
                    className={`background-sprite ${showBackupClass}`}
                    src={finalBackground}
                    alt={props.pokemon.name}
                />
            </section>
            <section className="information-right">
                <MovesLogicLevelUp pokemon={props.pokemon} />
                <MovesLogicMachine pokemon={props.pokemon} />
                <MovesLogicEgg pokemon={props.pokemon} />
            </section>
        </section>
    )
}