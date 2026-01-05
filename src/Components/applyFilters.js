export const applyFilters = (data, rules) => {
    return data.filter(pokemon => {
        // 1. Types Check
        if (rules.types && rules.types.length > 0) {
            const hasType = rules.types.some(t =>
                pokemon.type.some(pt => pt.toLowerCase() === t.toLowerCase())
            );
            if (!hasType) return false;
        }

        // 2. Stats Check
        if (rules.minStats) {
            for (const [stat, value] of Object.entries(rules.minStats)) {
                if (value && value > 0) {
                    if (pokemon.base[stat] < value) return false;
                }
            }
        }

        // 3. Color Check
        if (rules.color && rules.color.trim() !== "") {
            if (pokemon.color.toLowerCase() !== rules.color.toLowerCase()) {
                return false;
            }
        }

        return true;
    });
};