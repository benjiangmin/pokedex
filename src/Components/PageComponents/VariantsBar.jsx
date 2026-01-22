import { Link } from "react-router-dom"

export default function VariantsBar({ pokemon, allPokemon }) {
    const variants = allPokemon.filter(p => {
        const isSameId = p.id === pokemon.id
        const isNotSpecialForm = !p.slug.includes("-mega") && !p.slug.includes("-gmax")

        return isSameId && isNotSpecialForm
    })

    if (variants.length === 1) return null

    return (
        <div className="variants-container">
            <div className="variants-row">
                {variants.map((variant) => (
                    <Link
                        key={variant.slug}
                        to={`/pokemon/${variant.slug}`}
                        className={`variant-card ${pokemon.slug === variant.slug ? "active-variant" : ""}`}
                    >
                        <h3>{variant.name.english}</h3>
                    </Link>
                ))}
            </div>
        </div>
    )
}