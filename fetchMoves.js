import fs from "fs";

async function fetchAllMoves() {
    console.log("Starting Move Fetch...");
    const allMoves = [];
    
    try {
        const initialRes = await fetch("https://pokeapi.co/api/v2/move?limit=1");
        const initialData = await initialRes.json();
        const totalMoves = initialData.count;

        console.log(`Found ${totalMoves} moves. Beginning download...`);

        const listRes = await fetch(`https://pokeapi.co/api/v2/move?limit=${totalMoves}`);
        const listData = await listRes.json();

        for (const [index, moveItem] of listData.results.entries()) {
            try {
                const moveRes = await fetch(moveItem.url);
                const moveData = await moveRes.json();

                const formattedMove = {
                    id: moveData.id,
                    slug: moveData.name,
                    name: moveData.name
                        .split("-")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" "),
                    type: moveData.type.name.charAt(0).toUpperCase() + moveData.type.name.slice(1),
                    power: moveData.power,
                    accuracy: moveData.accuracy,
                    pp: moveData.pp,
                    priority: moveData.priority,
                    damage_class: moveData.damage_class.name,
                    description: moveData.flavor_text_entries
                        .find(entry => entry.language.name === "en")?.flavor_text
                        .replace(/[\n\f]/g, " ") || ""
                };

                allMoves.push(formattedMove);

                if (index % 50 === 0) {
                    console.log(`Processed ${index}/${totalMoves} moves...`);
                }
            } catch (err) {
                console.error(`Error fetching move: ${moveItem.name}`);
            }
        }

        fs.writeFileSync("./moves.json", JSON.stringify(allMoves, null, 2));
        console.log("Moves file created successfully!");

    } catch (error) {
        console.error("Failed to fetch moves:", error);
    }
}

fetchAllMoves();