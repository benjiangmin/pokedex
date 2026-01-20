import { POKEDEX_TO_GAME_MAP } from "./constants.js";

export const getRegionalGames = (pokedexNumbers) => {
    const regionalGames = [];
    pokedexNumbers.forEach(entry => {
        const games = POKEDEX_TO_GAME_MAP[entry.pokedex.name];
        if (games) {
            games.forEach(game => {
                if (!regionalGames.includes(game)) {
                    regionalGames.push(game);
                }
            });
        }
    });
    return regionalGames;
};