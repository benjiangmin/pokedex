import fs from "fs";

async function fetchAllPokemon() {
    const masterList = [];
    const totalCount = 52;

    const outputDir = "./public/pokemon-data";
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const formatPokemonName = (name) => {
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
        if (name.includes("-")) {
            const parts = name.split("-");
            const baseName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
            const variantName = parts.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
            return `${baseName} (${variantName})`;
        }
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const formatStandard = (name) => name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const getVariant = (slug) => ({
        isMega: slug.includes("-mega"),
        isAlolan: slug.includes("-alola") && !slug.includes("-totem"),
        isHisuian: slug.includes("-hisui"),
        isGalarian: slug.includes("-galar"),
        isPaldean: slug.includes("-paldea"),
        isGmax: slug.includes("-gmax")
    });

    const getVariantSlug = (baseName, variants, speciesVarieties) => {
        const name = baseName.toLowerCase()
        let target = name

        if (variants.isAlolan) target = `${name}-alola`
        else if (variants.isHisuian) target = `${name}-hisui`
        else if (variants.isGalarian) target = `${name}-galar`
        else if (variants.isPaldean) target = `${name}-paldea`
        const exists = speciesVarieties.some(v => v.pokeData.name === target)

        return exists ? target : name
    };

    const generationMapping = {
        "red-blue": "RBY", "yellow": "RBY", "gold-silver": "GSC", "crystal": "GSC",
        "ruby-sapphire": "RSE", "emerald": "RSE", "firered-leafgreen": "FRLG",
        "diamond-pearl": "DPP", "platinum": "DPP", "heartgold-soulsilver": "HGSS",
        "black-white": "BW", "black-2-white-2": "BW2", "x-y": "XY", "omega-ruby-alpha-sapphire": "ORAS",
        "sun-moon": "SM", "ultra-sun-ultra-moon": "USUM", "lets-go-pikachu-lets-go-eevee": "let's go",
        "sword-shield": "SWSH", "brilliant-diamond-shining-pearl": "BDSP",
        "legends-arceus": "legends arceus", "scarlet-violet": "SV",
    };

    const pokedexToGameMap = {
        "kanto": ["red", "blue", "yellow", "fire-red", "leaf-green", "lets-go-pikachu", "lets-go-eevee"],
        "original-johto": ["gold", "silver", "crystal"], "updated-johto": ["heart-gold", "soul-silver"],
        "hoenn": ["ruby", "sapphire", "emerald", "omega-ruby", "alpha-sapphire"], "original-sinnoh": ["diamond", "pearl"],
        "extended-sinnoh": ["platinum"], "updated-sinnoh": ["brilliant-diamond", "shining-pearl"],
        "original-unova": ["black", "white"], "updated-unova": ["black-2", "white-2"], "kalos-central": ["x", "y"],
        "kalos-coastal": ["x", "y"], "kalos-mountain": ["x", "y"], "original-alola": ["sun", "moon"],
        "updated-alola": ["ultra-sun", "ultra-moon"], "galar": ["sword", "shield"], "isle-of-armor": ["sword", "shield"],
        "crown-tundra": ["sword", "shield"], "hisui": ["legends-arceus"], "paldea": ["scarlet", "violet"],
        "kitakami": ["scarlet", "violet"], "blueberry": ["scarlet", "violet"]
    };

    for (let id = 1; id <= totalCount; id++) {
        console.log(`Processing Species #${id}`);
        try {
            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const speciesData = await speciesRes.json();
            const evoRes = await fetch(speciesData.evolution_chain.url);
            const evoChainData = await evoRes.json();

            const parseEvolutionChain = (chain, currentVariants, speciesVarieties) => {
                let evolutions = [];

                function traverse(node) {
                    node.evolves_to.forEach(evolution => {
                        const fromBase = node.species.name;
                        const toBase = evolution.species.name;

                        // Generate slugs based on whether the current pokemon is a variant
                        const fromSlug = getVariantSlug(fromBase, currentVariants, speciesVarieties);
                        const toSlug = getVariantSlug(toBase, currentVariants, speciesVarieties);

                        const isRegionalMatch = (slug, variants) => {
                            if (variants.isAlolan) return slug.includes("-alola");
                            if (variants.isGalarian) return slug.includes("-galar") || slug === "perrserker";
                            if (variants.isHisuian) return slug.includes("-hisui");
                            if (variants.isPaldean) return slug.includes("-paldea");
                            // For standard forms, don't allow regional slugs
                            return !slug.includes("-alola") && !slug.includes("-galar") && !slug.includes("-hisui") && !slug.includes("-paldea");
                        };

                        if (fromSlug !== toSlug && isRegionalMatch(toSlug, currentVariants)) {
                            // Corrected syntax for the .map()
                            const allDetails = (evolution.evolution_details || []).map(detail => {
                                const cleanedDetail = {};
                                for (const [key, value] of Object.entries(detail)) {
                                    if (!value) continue;
                                    cleanedDetail[key] = (typeof value === "object" && value.name) ? formatStandard(value.name) : value;
                                }
                                return cleanedDetail;
                            }); // Close map here
                            evolutions.push({
                                from: formatPokemonName(fromSlug), // Will show "Rattata (Alola)"
                                fromSlug: fromSlug,
                                to: formatPokemonName(toSlug),     // Will show "Raticate (Alola)"
                                toSlug: toSlug,
                                details: allDetails
                            });
                        }


                        traverse(evolution);
                    });
                }
                traverse(chain);
                return evolutions;
            };

            const allEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === "en");
            const desiredEntry = (allEntries.length > 0 ? allEntries[allEntries.length - 1].flavor_text : "").replace(/[\n\f]/g, " ").trim();
            const genusEntry = speciesData.genera.find(genera => genera.language.name === "en");
            const category = genusEntry ? genusEntry.genus : "Unknown";

            const speciesVarietiesData = [];
            for (const variety of speciesData.varieties) {
                if (variety.pokemon.name.includes("-totem") || variety.pokemon.name.includes("-cap")) continue;
                const pokeRes = await fetch(variety.pokemon.url);
                const pokeData = await pokeRes.json();

                const encountersRes = await fetch(pokeData.location_area_encounters);
                const encountersData = await encountersRes.json();

                speciesVarietiesData.push({ variety, pokeData, encountersData });
            }

            const baseVarietyObj = speciesVarietiesData.find(v => v.variety.is_default) || speciesVarietiesData[0];

            for (const item of speciesVarietiesData) {
                const { variety, pokeData, encountersData } = item;

                const regionalGames = []
                speciesData.pokedex_numbers.forEach(entry => {
                    const pokedexName = entry.pokedex.name
                    const games = pokedexToGameMap[pokedexName]
                    if (games) {
                        games.forEach(game => {
                            if (!regionalGames.includes(game)) {
                                regionalGames.push(game)
                            }
                        })
                    }
                })

                const variants = getVariant(pokeData.name);

                let currentEvoChain = parseEvolutionChain(evoChainData.chain, variants, speciesVarietiesData);

                if (variety.is_default) {
                    speciesVarietiesData.forEach(other => {
                        if (!other.variety.is_default) {
                            const otherVariants = getVariant(other.pokeData.name);
                            if (otherVariants.isMega || otherVariants.isGmax) {
                                currentEvoChain.push({
                                    from: formatPokemonName(pokeData.name),
                                    to: formatPokemonName(other.pokeData.name),
                                    details: [{
                                        trigger: otherVariants.isMega ? "Mega Evolution" : "Gigantamax"
                                    }]
                                });
                            }
                        }
                    });
                } else {
                    const isMegaOrGmax = variants.isMega || variants.isGmax;
                    if (isMegaOrGmax) {
                        currentEvoChain.push({
                            from: formatPokemonName(baseVarietyObj.pokeData.name),
                            to: formatPokemonName(pokeData.name),
                            details: [{ trigger: variants.isMega ? "mega Evolution" : "gigantamax" }]
                        });
                    }
                }

                const movesByGeneration = {};
                pokeData.moves.forEach(m => {
                    m.version_group_details.forEach(detail => {
                        const genName = generationMapping[detail.version_group.name];
                        if (!genName) return;
                        if (!movesByGeneration[genName]) movesByGeneration[genName] = [];
                        const moveNameFormatted = formatStandard(m.move.name);
                        if (!movesByGeneration[genName].some(e => e.name === moveNameFormatted && e.level_learned === detail.level_learned_at)) {
                            movesByGeneration[genName].push({
                                name: moveNameFormatted,
                                learn_method: detail.move_learn_method.name,
                                level_learned: detail.level_learned_at
                            });
                        }
                    });
                });

                const locationDataByVersion = {};
                encountersData.forEach(encounter => {
                    const locationName = formatStandard(encounter.location_area.name);
                    encounter.version_details.forEach(vDetail => {
                        const versionName = formatStandard(vDetail.version.name);
                        if (!locationDataByVersion[versionName]) locationDataByVersion[versionName] = [];
                        vDetail.encounter_details.forEach(eDetail => {
                            const entry = {
                                location: locationName,
                                method: formatStandard(eDetail.method.name),
                                chance: eDetail.chance,
                                minLevel: eDetail.min_level,
                                maxLevel: eDetail.max_level
                            };
                            if (!locationDataByVersion[versionName].some(old => old.location === entry.location && old.method === entry.method && old.minLevel === entry.minLevel)) {
                                locationDataByVersion[versionName].push(entry);
                            }
                        });
                    });
                });



                const fullPokemonData = {
                    id: id,
                    slug: pokeData.name,
                    isDefault: variety.is_default,
                    ...variants,
                    name: { english: formatPokemonName(pokeData.name) },
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
                    abilities: pokeData.abilities.map(a => formatStandard(a.ability.name)),
                    evolutionChain: currentEvoChain,
                    generation: speciesData.generation.name,
                    sprites: {
                        static: pokeData.sprites.front_default,
                        shiny: pokeData.sprites.front_shiny,
                        animated: pokeData.sprites.other?.showdown?.front_default || pokeData.sprites.front_default
                    },
                    description: desiredEntry,
                    isLegendary: speciesData.is_legendary,
                    isMythical: speciesData.is_mythical,
                    category: category,
                    versions: regionalGames,
                    moves: movesByGeneration,
                    locations: locationDataByVersion
                };

                fs.writeFileSync(`${outputDir}/${pokeData.name}.json`, JSON.stringify(fullPokemonData, null, 2));

                masterList.push({
                    ...fullPokemonData,
                    moves: [...new Set(Object.values(movesByGeneration).flat().map(m => m.name))],
                    locations: []
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