export const applyFilters = (data, rules) => {
    return data.filter(pokemon => {
        if (rules.name && rules.name.trim() !== "") {
            const searchTerm = rules.name.toLowerCase()
            const selfMatches = pokemon.name.english.toLowerCase() === searchTerm
            const evoLineMatches = pokemon.evolutionChain.some(link => (
                link.from.toLowerCase() === searchTerm || link.to.toLowerCase() === searchTerm
            ))

            if (!selfMatches && !evoLineMatches) {
                return false
            }
        }

        //Delete the Pikachu cap variants here too, and ash greninja
        if (pokemon.slug.includes("-cap")) return false
        if (pokemon.slug.includes("-rock-star")) return false
        if (pokemon.slug.includes("-pop-star")) return false
        if (pokemon.slug.includes("-phd")) return false
        if (pokemon.slug.includes("-libre")) return false
        if (pokemon.slug.includes("-cosplay")) return false
        if (pokemon.slug.includes("-starter")) return false
        if (pokemon.slug.includes("-belle")) return false

        if (pokemon.slug.includes("-ash")) return false

        // Types Check
        if (rules.types && rules.types.length > 0) {
            if (rules.strictTypes) {
                const hasAllTypes = rules.types.every(t => (
                    pokemon.type.some(pt => pt.toLowerCase() === t.toLowerCase())
                ))
                if (!hasAllTypes) return false
            } else {
                const hasAnyType = rules.types.some(t => (
                    pokemon.type.some(pt => pt.toLowerCase() === t.toLowerCase())
                ))
                if (!hasAnyType) return false
            }
        }

        // Stats Check (minimum)
        if (rules.minStats) {
            for (const [stat, value] of Object.entries(rules.minStats)) {
                if (value && value > 0) {
                    if (pokemon.base[stat] < value) return false
                }
            }
        }

        // Stats Check (maximum)
        if (rules.maxStats) {
            for (const [stat, value] of Object.entries(rules.maxStats)) {
                if (value && value > 0) {
                    if (pokemon.base[stat] > value) return false
                }
            }
        }

        // Weight Check (minimum/maxiumum)
        if (rules.minWeight) {
            if (pokemon.weight < rules.minWeight) return false
        }
        if (rules.maxWeight) {
            if (pokemon.weight > rules.maxWeight) return false
        }

        // Color Check
        if (rules.color && rules.color.trim() !== "") {
            if (pokemon.color.toLowerCase() !== rules.color.toLowerCase()) {
                return false
            }
        }

        // Abilities Check
        if (rules.abilities) {
            const hasAbility = rules.abilities.some(a => (
                pokemon.abilities.some(pa => pa.toLowerCase() === a.toLowerCase())
            ))
            if (!hasAbility) return false;
        }

        // Moves Check
        if (rules.moves && rules.moves.length > 0) {
            const canLearn = rules.moves.some(m =>
                pokemon.moves.some(pm => pm.toLowerCase() === m.toLowerCase())
            )
            if (!canLearn) return false
        }

        // Variants Check
        const variantRules = [
            { key: "isMega", rule: rules.isMega },
            { key: "isAlolan", rule: rules.isAlolan },
            { key: "isHisuian", rule: rules.isHisuian },
            { key: "isGalarian", rule: rules.isGalarian },
            { key: "isPaldean", rule: rules.isPaldean },
            { key: "isGmax", rule: rules.isGmax }
        ];
        for (const variant of variantRules) {
            if (variant.rule !== undefined && pokemon[variant.key] !== variant.rule) {
                return false;
            }
        }

        // Mythical Check
        if (rules.isMythical !== undefined) {
            if (pokemon.isMythical !== rules.isMythical) {
                return false;
            }
        }

        // Legendary Check
        if (rules.isLegendary !== undefined) {
            if (pokemon.isLegendary !== rules.isLegendary) {
                return false;
            }
        }

        // Generation Check
        if (rules.generation) {
            const genMap = {
                "1": "i", "2": "ii", "3": "iii", "4": "iv", "5": "v",
                "6": "vi", "7": "vii", "8": "viii", "9": "ix",
                "i": "i", "ii": "ii", "iii": "iii", "iv": "iv", "v": "v",
                "vi": "vi", "vii": "vii", "viii": "viii", "ix": "ix"
            };
            const input = String(rules.generation).toLowerCase()
            const romanSuffix = genMap[input]

            if (romanSuffix) {
                const targetGen = `generation-${romanSuffix}`
                if (pokemon.generation !== targetGen) {
                    return false
                }
            }
        }

        // Regional Pokedex Check
        if (rules.regionalPokedex) {
            const isInAnyRequestedGame = rules.regionalPokedex.some(requestedGame => {
                const searchGame = requestedGame.toLowerCase().trim();

                return pokemon.versions.some(v => {
                    const slug = v.toLowerCase();
                    return slug === searchGame || slug.replace(/-/g, ' ') === searchGame;
                });
            });

            if (!isInAnyRequestedGame) {
                return false;
            }
        }

        // Starter Check
        if (rules.isStarter) {
            const starterIDs = [1, 4, 7, 152, 155, 158, 252, 255, 258,
                387, 390, 393, 495, 498, 501, 650, 653,
                656, 722, 725, 728, 810, 813, 816, 906,
                909, 912
            ]
            const isStarter = starterIDs.includes(pokemon.id)
            if (isStarter !== rules.isStarter) {
                return false
            }
        }

        return true;
    });
};