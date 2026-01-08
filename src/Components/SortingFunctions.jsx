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

  return (
    <>
      <button onClick={sortByHP}>sort by hp</button>
      <button onClick={sortByATK}>sort by attack</button>
    </>
  )
}