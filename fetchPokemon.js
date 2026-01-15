import fs from "fs";

async function fetchAllPokemon() {
    const masterList = [];
    const totalCount = 20;

    const outputDir = "./public/pokemon-data";
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const formatName = (name) => {
        const specialNames = {
            "ho-oh": "Ho-Oh", "porygon-z": "Porygon-Z", "type-null": "Type: Null",
            "jangmo-o": "Jangmo-o", "hakamo-o": "Hakamo-o", "kommo-o": "Kommo-o",
            "great-tusk": "Great Tusk", "scream-tail": "Scream Tail", "brute-bonnet": "Brute Bonnet",
            "flutter-mane": "Flutter Mane", "slither-wing": "Slither Wing", "sandy-shocks": "Sandy Shocks",
            "roaring-moon": "Roaring Moon", "walking-wake": "Walking Wake", "gouging-fire": "Gouging Fire", "raging-bolt": "Raging Bolt",
            "iron-treads": "Iron Treads", "iron-bundle": "Iron Bundle", "iron-hands": "Iron Hands",
            "iron-jugulis": "Iron Jugulis", "iron-moth": "Iron Moth", "iron-thorns": "Iron Thorns",
            "iron-valiant": "Iron Valiant", "iron-leaves": "Iron Leaves", "iron-crown": "Iron Crown", "iron-boulder": "Iron Boulder"
        };
        if (specialNames[name]) return specialNames[name];
        return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const getVariant = (slug) => {
        return {
            isMega: slug.includes("-mega"),
            isAlolan: slug.includes("-alola") && !slug.includes("-totem"),
            isHisuian: slug.includes("-hisui"),
            isGalarian: slug.includes("-galar"),
            isPaldean: slug.includes("-paldea"),
            isGmax: slug.includes("-gmax")
        };
    };

    const generationMapping = {
        "red-blue": "Gen 1", "yellow": "Gen 1",
        "gold-silver": "Gen 2", "crystal": "Gen 2",
        "ruby-sapphire": "Gen 3", "emerald": "Gen 3", "firered-leafgreen": "Gen 3",
        "diamond-pearl": "Gen 4", "platinum": "Gen 4", "heartgold-soulsilver": "Gen 4",
        "black-white": "Gen 5", "black-2-white-2": "Gen 5",
        "x-y": "Gen 6", "omega-ruby-alpha-sapphire": "Gen 6",
        "sun-moon": "Gen 7", "ultra-sun-ultra-moon": "Gen 7", "lets-go-pikachu-lets-go-eevee": "Gen 7",
        "sword-shield": "Gen 8", "brilliant-diamond-shining-pearl": "Gen 8",
        "scarlet-violet": "Gen 9", "legends-arceus": "Legends: Arceus"
    };

    for (let id = 1; id <= totalCount; id++) {
        console.log(`Processing Species #${id}`);

        try {
            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const speciesData = await speciesRes.json();

            const evoRes = await fetch(speciesData.evolution_chain.url);
            const evoChainData = await evoRes.json();

            const parseEvolutionChain = (chain) => {
                let evolutions = [];
                function traverse(node) {
                    node.evolves_to.forEach(evolution => {
                        const allDetails = evolution.evolution_details.map(detail => {
                            const cleanedDetail = {};
                            for (const [key, value] of Object.entries(detail)) {
                                if (!value) continue;
                                if (typeof value === "object" && value.name) {
                                    cleanedDetail[key] = formatName(value.name);
                                } else {
                                    cleanedDetail[key] = value;
                                }
                            }
                            return cleanedDetail;
                        });

                        evolutions.push({
                            from: formatName(node.species.name),
                            to: formatName(evolution.species.name),
                            details: allDetails
                        });
                        traverse(evolution);
                    });
                }
                traverse(chain);
                return evolutions;
            };

            const cleanedEvoData = parseEvolutionChain(evoChainData.chain);

            const allEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === "en");
            const desiredEntry = (allEntries.length > 0 ? allEntries[allEntries.length - 1].flavor_text : "").replace(/[\n\f]/g, " ").trim();
            const genusEntry = speciesData.genera.find(genera => genera.language.name === "en");
            const category = genusEntry ? genusEntry.genus : "Unknown";

            for (const variety of speciesData.varieties) {
                if (variety.pokemon.name.includes("-totem") || variety.pokemon.name.includes("-cap")) continue;

                const pokeRes = await fetch(variety.pokemon.url);
                const pokeData = await pokeRes.json();
                const variants = getVariant(pokeData.name);

                const movesByGeneration = {};
                pokeData.moves.forEach(m => {
                    m.version_group_details.forEach(detail => {
                        const genName = generationMapping[detail.version_group.name];
                        if (!genName) return;
                        if (!movesByGeneration[genName]) movesByGeneration[genName] = [];
                        const moveNameFormatted = formatName(m.move.name);
                        if (!movesByGeneration[genName].some(e => e.name === moveNameFormatted && e.level_learned === detail.level_learned_at)) {
                            movesByGeneration[genName].push({
                                name: moveNameFormatted,
                                learn_method: detail.move_learn_method.name,
                                level_learned: detail.level_learned_at
                            });
                        }
                    });
                });

                const fullPokemonData = {
                    id: id,
                    slug: pokeData.name,
                    isDefault: variety.is_default,
                    ...variants,
                    name: { english: formatName(pokeData.name) },
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
                    abilities: pokeData.abilities.map(a => formatName(a.ability.name)),
                    evolutionChain: cleanedEvoData, 
                    generation: speciesData.generation.name,
                    sprites: {
                        static: pokeData.sprites.front_default,
                        animated: pokeData.sprites.other.showdown.front_default
                    },
                    description: desiredEntry,
                    isLegendary: speciesData.is_legendary,
                    isMythical: speciesData.is_mythical,
                    category: category,
                    moves: movesByGeneration
                };

                fs.writeFileSync(`${outputDir}/${pokeData.name}.json`, JSON.stringify(fullPokemonData, null, 2));
                
                masterList.push({
                    ...fullPokemonData,
                    moves: [...new Set(Object.values(movesByGeneration).flat().map(m => m.name))]
                });
            }
        } catch (err) {
            console.log(`Error for Species #${id}:`, err);
        }
    }

    fs.writeFileSync("./public/pokedex-master.json", JSON.stringify(masterList, null, 2));
    console.log("Master list updated.");
}

fetchAllPokemon();