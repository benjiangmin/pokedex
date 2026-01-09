export default function SortingFunctions(props) {
  const sortByHP = () => {
    props.setCurrentFilter("HP")

    const sorted = [...props.results].sort((a, b) => {
      return b.base.HP - a.base.HP
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    }, 10)
  }

  const sortByATK = () => {
    props.setCurrentFilter("ATK")

    const sorted = [...props.results].sort((a, b) => {
      return b.base.Attack - a.base.Attack
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

  const sortBySATK = () => {
    props.setCurrentFilter("SATK")

    const sorted = [...props.results].sort((a, b) => {
      return b.base["Special Attack"] - a.base["Special Attack"]
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

  const sortByDEF = () => {
    props.setCurrentFilter("DEF")

    const sorted = [...props.results].sort((a, b) => {
      return b.base.Defense - a.base.Defense
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

  const sortBySDEF = () => {
    props.setCurrentFilter("SDEF")

    const sorted = [...props.results].sort((a, b) => {
      return b.base["Special Defense"] - a.base["Special Defense"]
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

  const sortBySPD = () => {
    props.setCurrentFilter("SPD")

    const sorted = [...props.results].sort((a, b) => {
      return b.base.Speed - a.base.Speed
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

  return (
    <>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <section className="sorting-buttons-container">
          <button className={props.currentFilter === "HP" ? "current-filter" : ""} onClick={sortByHP}>sort by HP</button>
          <button className={props.currentFilter === "ATK" ? "current-filter" : ""} onClick={sortByATK}>sort by ATTACK</button>
          <button className={props.currentFilter === "SATK" ? "current-filter" : ""} onClick={sortBySATK}>sort by SP.ATTACK</button>
          <button className={props.currentFilter === "DEF" ? "current-filter" : ""} onClick={sortByDEF}>sort by DEFENSE</button>
          <button className={props.currentFilter === "SDEF" ? "current-filter" : ""} onClick={sortBySDEF}>sort by SP.DEFENSE</button>
          <button className={props.currentFilter === "SPD" ? "current-filter" : ""} onClick={sortBySPD}>sort by SPEED</button>
        </section>
      </section>
    </>
  )
}