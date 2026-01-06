export default function ExtraDetails(props) {
    const stats = props.pokemon.base
    const details = (
        <div className="extra-details"> 
            <section style={{textAlign:"center"}}>
                <span>{props.pokemon.type.join(", ")}</span>
            </section>
            <div className="stat-row"><span>HP</span> <span>{stats.HP}</span></div>
            <div className="stat-row"><span>ATK</span> <span>{stats.Attack}</span></div>
            <div className="stat-row"><span>DEF</span> <span>{stats.Defense}</span></div>
            <div className="stat-row"><span>S.ATK</span> <span>{stats["Special Attack"]}</span></div>
            <div className="stat-row"><span>S.DEF</span> <span>{stats["Special Defense"]}</span></div>
            <div className="stat-row"><span>SPD</span> <span>{stats.Speed}</span></div>
        </div>
    )
    return (
        <section style={{display:"flex"}}>
            {details}
        </section>
    )
}