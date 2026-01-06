import fs from "fs"

async function fetchAllPokemon() {
    const allPokemon = []
    const totalCount = 1026

    // Mapping of Gen to Region (kinda useless but whatver), also not accurate yet.
    const getRegion = (id) => {
        if (id <= 151) return "Kanto";
        if (id <= 251) return "Johto";
        if (id <= 386) return "Hoenn";
        if (id <= 493) return "Sinnoh";
        if (id <= 649) return "Unova";
        if (id <= 721) return "Kalos";
        if (id <= 809) return "Alola";
        if (id <= 898) return "Galar";
        if (id <= 1025) return "Paldea";
        return "Unknown";
    }

    for (let id = 1; id <= totalCount; id++) {
        console.log(`Processing Pokemon #${id}`)

        try {
            const [pokeRes, speciesRes] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            ])

            const pokeData = await pokeRes.json()
            const speciesData = await speciesRes.json()

            const moveNames = pokeData.moves.map(m =>
                m.move.name
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
            )

            const animatedSprite = pokeData.sprites.other.showdown.front_default 
            const staticSprite = pokeData.sprites.front_default

            allPokemon.push({
                id: id,
                name: {english: pokeData.name},
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
                sprite: animatedSprite,
                weight: pokeData.weight,
                abilities: pokeData.abilities.map(a => (
                    a.ability.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                )),
                region: getRegion(pokeData.id),
                moves: moveNames,
                sprites: {
                    static: staticSprite,
                    animated: animatedSprite
                }
            })
        } catch (err) {
            console.log(`Error for Pokemon #${id}`)
        }
    }

    fs.writeFileSync("./pokedex-enriched.json", JSON.stringify(allPokemon, null, 2))
}

fetchAllPokemon()