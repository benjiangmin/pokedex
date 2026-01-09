export const applyFilters = (data, rules) => {
    return data.filter(pokemon => {
        // Name Check
        if (rules.name) {
            if (pokemon.name.english.toLowerCase() !== rules.name.toLowerCase()) {
                return false
            }
        }
        //Delete the Pikachu cap variants here too
        if (pokemon.slug.includes("-cap")) return false

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
        if (rules.moves) {
            const canLearn = rules.moves.some(m => (
                pokemon.moves.some(pm => pm.toLowerCase() === m.toLowerCase())
            ))
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

        return true;
    });
};