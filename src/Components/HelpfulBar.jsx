import SortingFunctions from "./SortingFunctions"
import { useState, useEffect } from "react"

export default function HelpfulBar(props) {
    const [delayedShow, setDelayedShow] = useState(false);

    useEffect(() => {
        if (props.results?.length > 0) {
            setDelayedShow(true);
        } else {
            const timer = setTimeout(() => {
                setDelayedShow(false);
            }, 500);

            return () => clearTimeout(timer); 
        }
    }, [props.results]);

    const sortByID = () => {
        props.setCurrentFilter("")
        const sorted = [...props.results].sort((a, b) => {
            return a.id - b.id
        })
        props.setResults([])
        setTimeout(() => {
            props.setResults(sorted)
        })
    }

    return (
        <section className="helpful-data">
            <section className={`helpful-data-container ${delayedShow ? "show" : ""}`}>
                <SortingFunctions
                    results={props.results}
                    setResults={props.setResults}
                    currentFilter={props.currentFilter}
                    setCurrentFilter={props.setCurrentFilter}
                    ascending={props.ascending}
                    setAscending={props.setAscending}
                />
                <section className="reset-buttons-container">
                    <button onClick={props.resetSearch}>clear search</button>
                    <button onClick={sortByID}>reset filters</button>
                </section>
            </section>
        </section>
    )
}