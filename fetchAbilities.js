import fs from "fs"

async function fetchAllAbilities() {
    const abilitiesList = []
    const totalAbilities = 310

    console.log("starting ability fetch")

    for (let id = 1; id <= totalAbilities; id++) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);        
            if (!res.ok) continue

            const data = await res.json()

            const nameEntry = data.names.find(n => n.language.name === "en")
            const displayName = nameEntry ? nameEntry.name : data.name

            const effectEntry = data.effect_entries.find(e => e.language.name === "en")
            const description = effectEntry 
                ? effectEntry.short_effect.replace(/[\n\f]/g, " ")
                : "no description available"

            abilitiesList.push({
                id: id,
                slug: data.name,
                name: displayName,
                description: description,
            })

            console.log(`fetched ability ${displayName}`)
        } catch (err) {
            console.error(`error for ability #${id}`)
        }
    }

    fs.writeFileSync("./abilities.json", JSON.stringify(abilitiesList, null, 2))
    console.log("done.")
}

fetchAllAbilities()