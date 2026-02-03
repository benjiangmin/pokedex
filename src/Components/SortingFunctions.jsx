export default function SortingFunctions(props) {
  const statMap = {
    HP: "HP",
    ATK: "Attack",
    SATK: "Special Attack",
    DEF: "Defense",
    SDEF: "Special Defense",
    SPD: "Speed"
  };

  const handleSort = (filterKey) => {
    const dataKey = statMap[filterKey];
    let newDirection;

    if (props.currentFilter === filterKey) {
      newDirection = !props.ascending;
    } else {
      newDirection = false; 
      props.setCurrentFilter(filterKey);
    }

    const sorted = [...props.results].sort((a, b) => {
      return newDirection
        ? a.base[dataKey] - b.base[dataKey]
        : b.base[dataKey] - a.base[dataKey];
    });

    props.setAscending(newDirection);
    
    props.setResults([]);
    setTimeout(() => {
      props.setResults(sorted);
    }, 0);
  };

  return (
    <section className="sorting-buttons-section">
      <p>sort by</p>
      <section className="sorting-buttons-container">
        {Object.keys(statMap).map((key) => (
          <button
            key={key}
            className={props.currentFilter === key 
              ? `current-filter ${props.ascending ? "ascending" : "descending"}` 
              : ""
            }
            onClick={() => handleSort(key)}
          >
            {key}
          </button>
        ))}
      </section>
    </section>
  );
}