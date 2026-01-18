import { useState } from "react"

export default function SortingFunctions(props) {
  const [ascending, setAscending] = useState(true)

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
      newDirection = !ascending;
    } else {
      newDirection = false;
      props.setCurrentFilter(filterKey);
    }

    const sorted = [...props.results].sort((a, b) => {
      return newDirection
        ? a.base[dataKey] - b.base[dataKey]  
        : b.base[dataKey] - a.base[dataKey]; 
    });

    setAscending(newDirection);
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

            className={props.currentFilter === key ? `current-filter ${ascending ? "ascending" : "descending"}` : ""}
            onClick={() => handleSort(key)}
          >
            sort {
              key === "SATK" ? "SATK" :
                key === "SDEF" ? "SDEF" :
                  key === "ATK" ? "ATK" :
                    key === "DEF" ? "DEF" :
                      key === "SPD" ? "SPD" : key
            }
          </button>
        ))}
      </section>
    </section>
  );
}