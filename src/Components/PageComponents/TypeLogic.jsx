import bug from "../Images/bug.png"
import dark from "../Images/dark.png"
import dragon from "../Images/dragon.png"
import electric from "../Images/electric.png"
import fairy from "../Images/fairy.png"
import fighting from "../Images/fighting.png"
import fire from "../Images/fire.png"
import flying from "../Images/flying.png"
import ghost from "../Images/ghost.png"
import grass from "../Images/grass.png"
import ground from "../Images/ground.png"
import ice from "../Images/ice.png"
import normal from "../Images/normal.png"
import poison from "../Images/poison.png"
import psychic from "../Images/psychic.png"
import rock from "../Images/rock.png"
import steel from "../Images/steel.png"
import water from "../Images/water.png"

export default function TypeLogic(props) {
if (!props.pokemon || !props.pokemon.type) return null;
    const typeImages = {
        Bug: bug, Dark: dark, Dragon: dragon, Electric: electric, Fairy: fairy,
        Fighting: fighting, Fire: fire, Flying: flying, Ghost: ghost, Grass: grass,
        Ground: ground, Ice: ice, Normal: normal, Poison: poison, Psychic: psychic,
        Rock: rock, Steel: steel, Water: water
    };

    const takesSuperEffectiveFrom = {
        Normal: ["Fighting"],
        Fire: ["Water", "Ground", "Rock"],
        Water: ["Electric", "Grass"],
        Electric: ["Ground"],
        Grass: ["Fire", "Ice", "Poison", "Flying", "Bug"],
        Ice: ["Fire", "Fighting", "Rock", "Steel"],
        Fighting: ["Flying", "Psychic", "Fairy"],
        Poison: ["Ground", "Psychic"],
        Ground: ["Water", "Grass", "Ice"],
        Flying: ["Electric", "Ice", "Rock"],
        Psychic: ["Bug", "Ghost", "Dark"],
        Bug: ["Fire", "Flying", "Rock"],
        Rock: ["Water", "Grass", "Fighting", "Ground", "Steel"],
        Ghost: ["Ghost", "Dark"],
        Dragon: ["Ice", "Dragon", "Fairy"],
        Dark: ["Fighting", "Bug", "Fairy"],
        Steel: ["Fire", "Fighting", "Ground"],
        Fairy: ["Poison", "Steel"]
    };

    const takesResistedFrom = {
        Normal: [],
        Fire: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
        Water: ["Fire", "Water", "Ice", "Steel"],
        Electric: ["Electric", "Flying", "Steel"],
        Grass: ["Water", "Electric", "Grass", "Ground"],
        Ice: ["Ice"],
        Fighting: ["Bug", "Rock", "Dark"],
        Poison: ["Grass", "Fighting", "Poison", "Bug", "Fairy"],
        Ground: ["Poison", "Rock"],
        Flying: ["Grass", "Fighting", "Bug"],
        Psychic: ["Fighting", "Psychic"],
        Bug: ["Grass", "Fighting", "Ground"],
        Rock: ["Normal", "Fire", "Poison", "Flying"],
        Ghost: ["Poison", "Bug"],
        Dragon: ["Fire", "Water", "Electric", "Grass"],
        Dark: ["Ghost", "Dark"],
        Steel: ["Normal", "Grass", "Ice", "Flying", "Psychic", "Bug", "Rock", "Dragon", "Steel", "Fairy"],
        Fairy: ["Fighting", "Bug", "Dark"]
    };

    const isImmuneTo = {
        Normal: ["Ghost"],
        Fire: [],
        Water: [],
        Electric: [],
        Grass: [],
        Ice: [],
        Fighting: [],
        Poison: [],
        Ground: ["Electric"],
        Flying: ["Ground"],
        Psychic: [],
        Bug: [],
        Rock: [],
        Ghost: ["Normal", "Fighting"],
        Dragon: [],
        Dark: ["Psychic"],
        Steel: ["Poison"],
        Fairy: ["Dragon"]
    };

    const calculateEffectiveness = (types) => {
        const effectiveness = {};
        const allTypes = [
            "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting",
            "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost",
            "Dragon", "Dark", "Steel", "Fairy"
        ];

        allTypes.forEach(t => effectiveness[t] = 1);

        types.forEach(pType => {
            takesSuperEffectiveFrom[pType]?.forEach(weak => effectiveness[weak] *= 2);
            takesResistedFrom[pType]?.forEach(res => effectiveness[res] *= 0.5);
            isImmuneTo[pType]?.forEach(imm => effectiveness[imm] *= 0);
        });

        return effectiveness;
    }

    const effectiveness = calculateEffectiveness(props.pokemon.type)
    const weaknesses4x = Object.keys(effectiveness).filter(t => effectiveness[t] === 4)
    const weaknesses2x = Object.keys(effectiveness).filter(t => effectiveness[t] === 2)
    const immunities = Object.keys(effectiveness).filter(t => effectiveness[t] === 0)

    return (
        <section className="type-logic-wrapper">
            <div className="types-container">
                <h2>{`type effectiveness`}</h2> 
            </div>

            <div className="effectiveness-summary">
                {weaknesses4x.length > 0 && (
                    <section className="display-type-effectiveness-row">
                        <p>takes 4x from</p>
                        <div className="type-list">
                            {weaknesses4x.map(weakness => (
                                <img key={weakness} src={typeImages[weakness]} alt={weakness} className="type-icon-small" />
                            ))}
                        </div>
                    </section>
                )}

                {weaknesses2x.length > 0 && (
                    <section className="display-type-effectiveness-row">
                        <p>takes 2x from</p>
                        <div className="type-list">
                            {weaknesses2x.map(weakness => (
                                <img key={weakness} src={typeImages[weakness]} alt={weakness} className="type-icon-small" />
                            ))}
                        </div>
                    </section>
                )}
                {immunities.length > 0 && (
                    <section className="display-type-effectiveness-row">
                        <p>immune to</p>
                        <div className="type-list">
                            {immunities.map(weakness => (
                                <img key={weakness} src={typeImages[weakness]} alt={weakness} className="type-icon-small" />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </section>
    );
}