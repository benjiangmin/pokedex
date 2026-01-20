import { GENERATION_MAPPING } from "./constants.js";
import { formatStandard } from "./formatters.js";

export const parseMovesByGeneration = (moves) => {
    const movesByGeneration = {};
    moves.forEach(m => {
        m.version_group_details.forEach(detail => {
            const genName = GENERATION_MAPPING[detail.version_group.name];
            if (!genName) return;
            
            if (!movesByGeneration[genName]) movesByGeneration[genName] = [];
            
            const moveNameFormatted = formatStandard(m.move.name);
            const alreadyExists = movesByGeneration[genName].some(e => 
                e.name === moveNameFormatted && e.level_learned === detail.level_learned_at
            );

            if (!alreadyExists) {
                movesByGeneration[genName].push({
                    name: moveNameFormatted,
                    learn_method: detail.move_learn_method.name,
                    level_learned: detail.level_learned_at
                });
            }
        });
    });
    return movesByGeneration;
};