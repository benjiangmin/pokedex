export default function Locations({ pokemon }) {
    const gameNames = Object.keys(pokemon.locations || {});

    return (
        <section className="locations-container">
            <h2>locations</h2>
            <section className="locations-list">
                {gameNames.map(gameName => {
                    const groupedLocations = {};

                    pokemon.locations[gameName].forEach(enc => {
                        let cleanName = enc.location
                            .replace(/\sArea\b/gi, "") 
                            .split(/\s(North|South|East|West)\b/i)[0]
                            .trim();

                        if (!groupedLocations[cleanName]) {
                            groupedLocations[cleanName] = { min: enc.chance, max: enc.chance };
                        } else {
                            groupedLocations[cleanName].min = Math.min(groupedLocations[cleanName].min, enc.chance);
                            groupedLocations[cleanName].max = Math.max(groupedLocations[cleanName].max, enc.chance);
                        }
                    });

                    return (
                        <section className="location-row" key={gameName}>
                            <h1>{gameName}</h1>
                            <section className="location-and-percentage-container">
                                {Object.entries(groupedLocations).map(([locName, range], i) => (
                                    <section className="location-and-percentage" key={i}>
                                        <h2>{locName}</h2>
                                        <p>
                                            {range.min === range.max 
                                                ? `${range.min}%` 
                                                : `${range.min}% - ${range.max}%`}
                                        </p>
                                    </section>
                                ))}
                            </section>
                        </section>
                    )
                })}
            </section>
        </section>
    );
}