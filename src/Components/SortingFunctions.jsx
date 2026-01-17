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
    props.setCurrentFilter(filterKey);
    const dataKey = statMap[filterKey];

    const sorted = [...props.results].sort((a, b) => b.base[dataKey] - a.base[dataKey]);

    props.setResults([]); 
    setTimeout(() => {
      props.setResults(sorted); 
    }, 0); 
  };

  return (
    <section style={{ display: "flex", justifyContent: "center" }}>
      <section className="sorting-buttons-container">
        {Object.keys(statMap).map((key) => (
          <button
            key={key}

            className={props.currentFilter === key ? "current-filter" : ""}
            onClick={() => handleSort(key)}
          >
            sort by {
              key === "SATK" ? "SP.ATTACK" : 
              key === "SDEF" ? "SP.DEFENSE" : 
              key === "ATK" ? "ATTACK" : 
              key === "DEF" ? "DEFENSE" : 
              key === "SPD" ? "SPEED" : key
            }
          </button>
        ))}
      </section>
    </section>
  );
}