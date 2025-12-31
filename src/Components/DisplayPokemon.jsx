import { useState } from "react";
import pokemonData from "../../pokedex.json";

export default function DisplayPokemon(props) {
    // 1. We store the current results in state so React knows when to re-render
    const [filteredList, setFilteredList] = useState(pokemonData);
    const [loading, setLoading] = useState(false);

    const handleAiFilter = async () => {
        // Safety check: don't call the AI if the prompt is empty
        if (!props.prompt) return;

        setLoading(true);
        try {
            // Talking to your local Express server (Terminal 2)
            const response = await fetch("http://localhost:3001/api/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userQuery: props.prompt }), // Sending props.prompt
            });

            const rules = await response.json();

            // 2. Filter the local pokedex.json based on the AI's "rules"
            const results = pokemonData.filter(pokemon => {
                // Check Type
                if (rules.types?.length > 0) {
                    const hasType = rules.types.some(t => 
                        pokemon.type.includes(t)
                    );
                    if (!hasType) return false;
                }

                // Check Stats (matches keys like "Speed", "Attack", etc.)
                if (rules.minStats) {
                    for (const [stat, value] of Object.entries(rules.minStats)) {
                        if (pokemon.base[stat] < value) return false;
                    }
                }
                return true;
            });

            // 3. Update the list on the screen
            setFilteredList(results);

        } catch (err) {
            console.error("AI Search failed:", err);
        } finally {
            setLoading(false);
        }
    };

    // Prepare the list of names
    const pokemonElements = filteredList.map(pokemon => (
        <p key={pokemon.id}>{pokemon.name.english}</p>
    ));

    return (
        <section className="display-pokemon">
            <p>Ready to analyze: <strong>{props.prompt}</strong></p>
            
            <button onClick={handleAiFilter} disabled={loading}>
                {loading ? "AI is thinking..." : "Run AI Filter"}
            </button>
            
            <div className="pokemon-list">
                {pokemonElements}
            </div>
        </section>
    );
}