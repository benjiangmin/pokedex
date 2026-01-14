export default function DetailedStatsBar({ stats }) {
    const maxStat = 255

    function determineColor(stat) {
        let color = ""
        if (stat < 50) {
            return color = "#aa534d"
        } else if (stat < 70) {
            return color = "#a3601d"
        } else if (stat < 90) {
            return color = "#70912d"
        } else if (stat < 110) {
            return color = "#2d9168"
        } else if  (stat < 130) {
            return color= "#6184a5"
        } else if (stat < 150) {
            return color = "#376997"
        } else {
            return color = "#2264bb"
        }
    }

    return (
        <section className="statbars-container">
            {Object.entries(stats).map(([name, stat]) => {
                const percentage = (stat/maxStat)*100
                const color = determineColor(stat)

                return (
                    <div key={name} className="statbars-row">
                        <div className="statbar-label">
                            <h3>{name}</h3>
                            <p>{stat}</p>
                        </div>
                        <div className="bar-background">
                            <div className="bar-fill" style={{width: `${percentage}%`, backgroundColor:`${color}`}}></div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}