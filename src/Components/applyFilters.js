export const applyFilters = (data, rules) => {
    return data.filter(pokemon => {
        // Name Check
        if (rules.name) {
            if (pokemon.name.english.toLowerCase() !== rules.name.toLowerCase()) {
                return false
            }
        }

        // Types Check
        if (rules.types && rules.types.length > 0) {
            const hasType = rules.types.some(t =>
                pokemon.type.some(pt => pt.toLowerCase() === t.toLowerCase())
            );
            if (!hasType) return false
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

        // Color Check
        if (rules.color && rules.color.trim() !== "") {
            if (pokemon.color.toLowerCase() !== rules.color.toLowerCase()) {
                return false
            }
        }

        return true;
    });
};