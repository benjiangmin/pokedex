export default function DetailedStatsBar({ stats }) {
    const maxStat = 255;

    function determineColor(stat) {
        if (stat < 50) return "#e46e65";
        if (stat < 70) return "#dd8b3a";
        if (stat < 90) return "#8eb937";
        if (stat < 110) return "#32b981";
        if (stat < 130) return "#4991d4";
        if (stat < 150) return "#2488e6";
        return "#8945d6";
    }

    return (
        <section className="statbars-container">
            {Object.entries(stats).map(([name, stat]) => {
                name = name == "Special Attack" ? "Sp. Attack" : name
                name = name == "Special Defense" ? "Sp. Defense" : name

                const percentage = (stat / maxStat) * 100;
                const color = determineColor(stat);

                return (
                    <div key={name} className="statbars-row">
                        <div className="statbar-label">
                            <h4>{name}</h4>
                            <p>{stat}</p>
                        </div>
                        <div className="bar-background">
                            <div 
                                className="bar-fill" 
                                style={{
                                    width: `${percentage}%`, 
                                    backgroundColor: color
                                }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}