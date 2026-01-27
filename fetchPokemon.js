import fs from "fs";

import { formatStandard, formatPokemonName, getVariant } from "./fetchingLogic/formatters.js";
import { parseEvolutionChain, injectMegaGmaxEvolutions } from "./fetchingLogic/evolutionLogic.js";
import { getRegionalGames } from "./fetchingLogic/versionLogic.js";
import { parseMovesByGeneration } from "./fetchingLogic/moveLogic.js";
import { parseLocationData } from "./fetchingLogic/locationLogic.js";

async function fetchAllPokemon() {
    const masterList = [];
    const totalCount = 122; 
    const outputDir = "./public/pokemon-data";

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let id = 1; id <= 10; id++) {
        console.log(`Processing Species #${id}`);

        await sleep(500);
        try {
            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const speciesData = await speciesRes.json();
            const evoRes = await fetch(speciesData.evolution_chain.url);
            const evoChainData = await evoRes.json();

            const allEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === "en");
            const description = (allEntries.length > 0 ? allEntries[allEntries.length - 1].flavor_text : "").replace(/[\n\f]/g, " ").trim();
            const category = speciesData.genera.find(g => g.language.name === "en")?.genus || "Unknown";

            const speciesVarietiesData = [];
            for (const variety of speciesData.varieties) {
                if (variety.pokemon.name.includes("-totem") || variety.pokemon.name.includes("-cap")) continue;
                const pokeData = await (await fetch(variety.pokemon.url)).json();
                const encountersData = await (await fetch(pokeData.location_area_encounters)).json();
                speciesVarietiesData.push({ variety, pokeData, encountersData });
            }

            const baseVarietyObj = speciesVarietiesData.find(v => v.variety.is_default) || speciesVarietiesData[0];

            for (const item of speciesVarietiesData) {
                const { variety, pokeData, encountersData } = item;
                
                let currentEvoChain = parseEvolutionChain(evoChainData.chain);
                currentEvoChain = injectMegaGmaxEvolutions(currentEvoChain, variety, speciesVarietiesData, baseVarietyObj);


                const movesByGeneration = parseMovesByGeneration(pokeData.moves);
                const locationDataByVersion = parseLocationData(encountersData);
                const regionalGames = getRegionalGames(speciesData.pokedex_numbers);
                const variants = getVariant(pokeData.name);

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
                    description,
                    isLegendary: speciesData.is_legendary,
                    isMythical: speciesData.is_mythical,
                    category,
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