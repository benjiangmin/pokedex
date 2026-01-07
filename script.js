import fs from "fs"

async function fetchAllPokemon() {
    const allPokemon = []
    const totalCount = 1025

    const getVariant = (slug) => {
        return {
            isMega: slug.includes("-mega"),
            isAlolan: slug.includes("-alola") && !slug.includes("-totem"),
            isHisuian: slug.includes("-hisui"),
            isGalarian: slug.includes("-galar"),
            isPaldean: slug.includes("-paldea"),
            isGmax: slug.includes("-gmax")
        }
    }

    for (let id = 1; id <= totalCount; id++) {
        console.log(`Processing Species #${id}`)

        try {
            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            const speciesData = await speciesRes.json()

            // Shared description for all varieties of this species...
            const allEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === "en")
            const rawEntry = allEntries.length > 0 ? allEntries[allEntries.length - 1].flavor_text : ""
            const desiredEntry = rawEntry
                .replace(/[\n\f]/g, " ")
                .trim();

            for (const variety of speciesData.varieties) {
                console.log(`  - Fetching variety: ${variety.pokemon.name}`)
                
                const pokeRes = await fetch(variety.pokemon.url)
                const pokeData = await pokeRes.json()

                const variants = getVariant(pokeData.name)
                
                const moveNames = pokeData.moves.map(m =>
                    m.move.name
                        .split("-")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")
                )

                const animatedSprite = pokeData.sprites.other.showdown.front_default 
                const staticSprite = pokeData.sprites.front_default

                allPokemon.push({
                    id: id,
                    slug: pokeData.name, 
                    isDefault: variety.is_default,
                    ...variants,
                    name: { 
                        english: pokeData.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                    },
                    type: pokeData.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
                    base: {
                        "HP": pokeData.stats[0].base_stat,
                        "Attack": pokeData.stats[1].base_stat,
                        "Defense": pokeData.stats[2].base_stat,
                        "Special Attack": pokeData.stats[3].base_stat,
                        "Special Defense": pokeData.stats[4].base_stat,
                        "Speed": pokeData.stats[5].base_stat
                    },
                    color: speciesData.color.name,
                    sprite: animatedSprite,
                    weight: pokeData.weight,
                    abilities: pokeData.abilities.map(a => (
                        a.ability.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                    )),
                    moves: moveNames,
                    sprites: {
                        static: staticSprite,
                        animated: animatedSprite
                    },
                    description: desiredEntry
                })
            }
        } catch (err) {
            console.log(`Error for Species #${id}`)
        }
    }

    fs.writeFileSync("./pokedex-enriched.json", JSON.stringify(allPokemon, null, 2))
    console.log("Enrichment complete!")
}

fetchAllPokemon()