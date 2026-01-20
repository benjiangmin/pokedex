import { formatStandard, formatPokemonName, getVariant } from "./formatters.js";

export const parseEvolutionChain = (chain) => {
    let evolutions = [];
    function traverse(node) {
        node.evolves_to.forEach(evolution => {
            const allDetails = evolution.evolution_details.map(detail => {
                const cleanedDetail = {};
                for (const [key, value] of Object.entries(detail)) {
                    if (!value) continue;
                    cleanedDetail[key] = (typeof value === "object" && value.name) 
                        ? formatStandard(value.name) 
                        : value;
                }
                return cleanedDetail;
            });
            
            evolutions.push({
                from: formatPokemonName(node.species.name),
                to: formatPokemonName(evolution.species.name),
                details: allDetails
            });
            traverse(evolution);
        });
    }
    traverse(chain);
    return evolutions;
};

export const injectMegaGmaxEvolutions = (currentEvoChain, variety, speciesVarietiesData, baseVarietyObj) => {
    const variants = getVariant(variety.pokemon.name);
    
    if (variety.is_default) {
        speciesVarietiesData.forEach(other => {
            if (!other.variety.is_default) {
                const otherVariants = getVariant(other.pokeData.name);
                if (otherVariants.isMega || otherVariants.isGmax) {
                    currentEvoChain.push({
                        from: formatPokemonName(variety.pokemon.name),
                        to: formatPokemonName(other.pokeData.name),
                        details: [{
                            trigger: otherVariants.isMega ? "Mega Evolution" : "Gigantamax"
                        }]
                    });
                }
            }
        });
    } 
    else if (variants.isMega || variants.isGmax) {
        currentEvoChain.push({
            from: formatPokemonName(baseVarietyObj.pokeData.name),
            to: formatPokemonName(variety.pokemon.name),
            details: [{ trigger: variants.isMega ? "Mega Evolution" : "Gigantamax" }]
        });
    }
    
    return currentEvoChain;
};