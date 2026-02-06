import allAbilities from "../../../abilities.json"

export default function AbilitiesLogic({ pokemon }) {
    return (
        <section className="abilities-logic-container">
            <h2>abilities</h2>
            {pokemon.abilities.map((ability) => {
                const abilityDetails = allAbilities.find((a) => (
                    a.name.toLowerCase() === ability.toLowerCase()
                ))

                return (
                    <div key={ability} className="ability-row">
                        <h3>{ability}</h3>
                        <p>{abilityDetails?.description}</p>
                    </div>
                )
            })}
        </section>
    )
}