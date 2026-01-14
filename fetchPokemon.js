import fs from "fs"

async function fetchAllPokemon() {
    const allPokemon = []
    const totalCount = 1026

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

    const generationMapping = {
        "red-blue": "Gen 1", "yellow": "Gen 1",
        "gold-silver": "Gen 2", "crystal": "Gen 2",
        "ruby-sapphire": "Gen 3", "emerald": "Gen 3", "firered-leafgreen": "Gen 3",
        "diamond-pearl": "Gen 4", "platinum": "Gen 4", "heartgold-soulsilver": "Gen 4",
        "black-white": "Gen 5", "black-2-white-2": "Gen 5",
        "x-y": "Gen 6", "omega-ruby-alpha-sapphire": "Gen 6",
        "sun-moon": "Gen 7", "ultra-sun-ultra-moon": "Gen 7", "lets-go-pikachu-lets-go-eevee": "Gen 7",
        "sword-shield": "Gen 8", "brilliant-diamond-shining-pearl": "Gen 8",
        "scarlet-violet": "Gen 9",

        "legends-arceus": "Legends: Arceus",
        "legends-za": "Legends: Z-A"
    };

    for (let id = 1; id <= totalCount; id++) {
        console.log(`Processing Species #${id}`)

        try {
            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            const speciesData = await speciesRes.json()

            const allEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === "en")
            const rawEntry = allEntries.length > 0 ? allEntries[allEntries.length - 1].flavor_text : ""
            const desiredEntry = rawEntry
                .replace(/[\n\f]/g, " ")
                .trim();

            for (const variety of speciesData.varieties) {
                if (variety.pokemon.name.includes("-totem") || variety.pokemon.name.includes("-cap")) {
                    console.log(`  - Skipping unwanted variety: ${variety.pokemon.name}`);
                    continue;
                }
                console.log(`  - Fetching variety: ${variety.pokemon.name}`)

                const pokeRes = await fetch(variety.pokemon.url)
                const pokeData = await pokeRes.json()

                const variants = getVariant(pokeData.name)

                const movesByGeneration = {}
                pokeData.moves.forEach(m => {
                    m.version_group_details.forEach(detail => {
                        const apiVersionName = detail.version_group.name
                        const genName = generationMapping[apiVersionName] 

                        if (!genName) return;

                        if (!movesByGeneration[genName]) {
                            movesByGeneration[genName] = []
                        }

                        const moveNameFormatted = m.move.name
                            .split("-")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")

                        const isDuplicate = movesByGeneration[genName].some(
                            existing => existing.name === moveNameFormatted &&
                            existing.learn_method === detail.move_learn_method.name &&
                            existing.level_learned === detail.level_learned_at
                        )

                        if (!isDuplicate) {
                            movesByGeneration[genName].push({
                                name: moveNameFormatted,
                                learn_method: detail.move_learn_method.name,
                                level_learned: detail.level_learned_at
                            })
                        }
                    })
                })

                const specialNames = {
                    "ho-oh": "Ho-Oh",
                    "porygon-z": "Porygon-Z",
                    "type-null": "Type: Null",
                    "jangmo-o": "Jangmo-o",
                    "hakamo-o": "Hakamo-o",
                    "kommo-o": "Kommo-o"
                };
                let nameFormatted
                if (specialNames[pokeData.name]) {
                    nameFormatted = specialNames[pokeData.name]
                } else {
                    const name = pokeData.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    if (name.length <= 1) nameFormatted = name[0]
                    else nameFormatted = `${name[0]} (${name.slice(1).join(" ")})`
                }


                const animatedSprite = pokeData.sprites.other.showdown.front_default
                const staticSprite = pokeData.sprites.front_default

                const genusEntry = speciesData.genera.find(genera => genera.language.name === "en")
                const category = genusEntry.genus

                const heightMeters = pokeData.height / 10
                const weightKilograms = pokeData.weight / 10

                allPokemon.push({
                    id: id,
                    slug: pokeData.name,
                    isDefault: variety.is_default,
                    ...variants,
                    name: {
                        english: nameFormatted
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
                    weight: weightKilograms,
                    height: heightMeters,
                    abilities: pokeData.abilities.map(a => (
                        a.ability.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                    )),
                    moves: movesByGeneration,
                    sprites: {
                        static: staticSprite,
                        animated: animatedSprite
                    },
                    description: desiredEntry,
                    isLegendary: speciesData.is_legendary,
                    isMythical: speciesData.is_mythical,
                    category: category
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