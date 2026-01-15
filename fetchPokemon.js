import fs from "fs"

async function fetchAllPokemon() {
    const masterList = []
    const totalCount = 1026

    const outputDir = "./public/pokemon-data"
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

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
            const desiredEntry = (allEntries.length > 0 ? allEntries[allEntries.length - 1].flavor_text : "")
                .replace(/[\n\f]/g, " ").trim();

            const genusEntry = speciesData.genera.find(genera => genera.language.name === "en")
            const category = genusEntry ? genusEntry.genus : "Unknown"

            for (const variety of speciesData.varieties) {
                if (variety.pokemon.name.includes("-totem") || variety.pokemon.name.includes("-cap")) {
                    continue;
                }

                const pokeRes = await fetch(variety.pokemon.url)
                const pokeData = await pokeRes.json()
                const variants = getVariant(pokeData.name)

                const movesByGeneration = {}
                pokeData.moves.forEach(m => {
                    m.version_group_details.forEach(detail => {
                        const genName = generationMapping[detail.version_group.name]
                        if (!genName) return;

                        if (!movesByGeneration[genName]) movesByGeneration[genName] = []

                        const moveNameFormatted = m.move.name
                            .split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")

                        if (!movesByGeneration[genName].some(e => e.name === moveNameFormatted && e.level_learned === detail.level_learned_at)) {
                            movesByGeneration[genName].push({
                                name: moveNameFormatted,
                                learn_method: detail.move_learn_method.name,
                                level_learned: detail.level_learned_at
                            })
                        }
                    })
                })

                const specialNames = {
                    "ho-oh": "Ho-Oh", "porygon-z": "Porygon-Z", "type-null": "Type: Null",
                    "jangmo-o": "Jangmo-o", "hakamo-o": "Hakamo-o", "kommo-o": "Kommo-o"
                };
                let nameFormatted;
                if (specialNames[pokeData.name]) {
                    nameFormatted = specialNames[pokeData.name];
                } else {
                    const parts = pokeData.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));

                    if (parts.length > 1) {
                        nameFormatted = `${parts[0]} (${parts.slice(1).join(" ")})`;
                    } else {
                        nameFormatted = parts[0];
                    }
                }

                const animatedSprite = pokeData.sprites.other.showdown.front_default
                const staticSprite = pokeData.sprites.front_default

                const encountersRes = await fetch(pokeData.location_area_encounters)
                const encountersData = await encountersRes.json()
                const locationDataByVersion = {}

                encountersData.forEach(encounter => {
                    const locationName = encounter.location_area.name
                        .split("-")
                        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")

                    encounter.version_details.forEach(vDetail => { 
                        const versionRaw = vDetail.version.name
                        const versionName = versionRaw
                            .split("-")
                            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")

                        if (!locationDataByVersion[versionName]) {
                            locationDataByVersion[versionName] = []
                        }

                        vDetail.encounter_details.forEach(eDetail => { 
                            const methodFormatted = eDetail.method.name
                                .split("-")
                                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                                .join(" ")

                            const entry = {
                                location: locationName,
                                method: methodFormatted,
                                chance: eDetail.chance,
                            }

                            locationDataByVersion[versionName].push(entry)
                        })
                    })
                })

                const fullPokemonData = {
                    id: id,
                    slug: pokeData.name,
                    isDefault: variety.is_default,
                    ...variants,
                    name: { english: nameFormatted },
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
                    weight: pokeData.weight / 10,
                    height: pokeData.height / 10,
                    abilities: pokeData.abilities.map(a => a.ability.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')),
                    sprites: { static: staticSprite, animated: animatedSprite },
                    description: desiredEntry,
                    isLegendary: speciesData.is_legendary,
                    isMythical: speciesData.is_mythical,
                    category: category,
                    moves: movesByGeneration,
                    locations: locationDataByVersion
                }

                fs.writeFileSync(`${outputDir}/${pokeData.name}.json`, JSON.stringify(fullPokemonData, null, 2))

                const flatMoveList = [...new Set(Object.values(movesByGeneration).flat().map(m => m.name))];

                masterList.push({
                    id: id,
                    slug: pokeData.name,
                    isDefault: variety.is_default,
                    ...variants,
                    name: { english: nameFormatted },
                    type: fullPokemonData.type,
                    base: fullPokemonData.base,
                    color: fullPokemonData.color,
                    weight: fullPokemonData.weight,
                    height: fullPokemonData.height,
                    abilities: fullPokemonData.abilities,
                    moves: flatMoveList,
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
            console.log(`Error for Species #${id}:`, err)
        }
    }

    fs.writeFileSync("./public/pokedex-master.json", JSON.stringify(masterList, null, 2))
    console.log("master list updated.")
}

fetchAllPokemon()