export default function DetailedStatsBar({ stats }) {
    const maxStat = 255;

    function determineColor(stat) {
        if (stat < 50) return "#aa534d";
        if (stat < 70) return "#a3601d";
        if (stat < 90) return "#70912d";
        if (stat < 110) return "#2d9168";
        if (stat < 130) return "#6184a5";
        if (stat < 150) return "#376997";
        return "#2264bb";
    }

    return (
        <section className="statbars-container">
            {Object.entries(stats).map(([name, stat]) => {
                const percentage = (stat / maxStat) * 100;
                const color = determineColor(stat);

                return (
                    <div key={name} className="statbars-row">
                        <div className="statbar-label">
                            <h3>{name}</h3>
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