import fs from "fs"

async function fetchAllPokemon() {
    const allPokemon = []
    const totalCount = 1026

    for (let id = 1; id <= totalCount; id++) {
        console.log(`Processing Pokemon #${id}`)

        try {
            const [pokeRes, speciesRes] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            ])

            const pokeData = await pokeRes.json()
            const speciesData = await speciesRes.json()

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
                sprite: pokeData.sprites.front_default,
                weight: pokeData.weight
            })
        } catch (err) {
            console.log(`Error for Pokemon #${id}`)
        }
    }

    fs.writeFileSync("./pokedex-enriched.json", JSON.stringify(allPokemon, null, 2))
}

fetchAllPokemon()