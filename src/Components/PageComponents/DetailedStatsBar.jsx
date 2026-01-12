export default function DetailedStatsBar({ stats }) {
    const maxStat = 255

    return (
        <section className="statbars-container">
            {Object.entries(stats).map(([name, stat]) => {
                const percentage = (stat/maxStat)*100

                return (
                    <div key={name} className="statbars-row">
                        <div className="statbar-label">
                            <h3>{name}</h3>
                            <p>{stat}</p>
                        </div>
                        <div className="bar-background">
                            <div className="bar-fill" style={{width: `${percentage}%`}}></div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}