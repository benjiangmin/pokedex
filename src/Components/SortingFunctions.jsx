export default function SortingFunctions(props) {
  const sortByHP = () => {
    console.log("sort by hp clicked")
    const sorted = [...props.results].sort((a, b) => {
      return b.base.HP - a.base.HP
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    }, 10)
  }

  const sortByATK = () => {
    const sorted = [...props.results].sort((a, b) => {
      return b.base.Attack - a.base.Attack
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

  const sortBySATK = () => {
    const sorted = [...props.results].sort((a, b) => {
      return b.base["Special Attack"] - a.base["Special Attack"]
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

  const sortByDEF = () => {
    const sorted = [...props.results].sort((a, b) => {
      return b.base.Defense - a.base.Defense
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

  const sortBySDEF = () => {
    const sorted = [...props.results].sort((a, b) => {
      return b.base["Special Defense"] - a.base["Special Defense"]
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

  const sortBySPD = () => {
    const sorted = [...props.results].sort((a, b) => {
      return b.base.Speed - a.base.Speed
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

    const sortByID = () => {
    const sorted = [...props.results].sort((a, b) => {
      return a.id - b.id
    })
    props.setResults([])
    setTimeout(() => {
      props.setResults(sorted)
    })
  }

  return (
    <>
      <button onClick={sortByID}>sort by #</button>
      <button onClick={sortByHP}>sort by hp</button>
      <button onClick={sortByATK}>sort by attack</button>
      <button onClick={sortBySATK}>sort by s.attack</button>
      <button onClick={sortByDEF}>sort by defense</button>
      <button onClick={sortBySDEF}>sort by s.defense</button>
      <button onClick={sortBySPD}>sort by speed</button>
    </>
  )
}