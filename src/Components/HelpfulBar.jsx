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
                <section className="choose-what-gets-displayed-container">
                    <section className="reset-buttons-container">
                        <button onClick={props.resetSearch}>clear search</button>
                        <button onClick={sortByID}>reset filters</button>
                    </section>
                    <section className="checkbox-variants-container">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                className="toggle-input"
                                checked={props.showMega}
                                onChange={() => props.setShowMega(!props.showMega)}
                            />
                            <span className="toggle-track">
                                <span className="toggle-thumb" />
                            </span>
                            show mega
                        </label>
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                className="toggle-input"
                                checked={props.showGmax}
                                onChange={() => props.setShowGmax(!props.showGmax)}
                            />
                            <span className="toggle-track">
                                <span className="toggle-thumb" />
                            </span>
                            show gmax
                        </label>
                    </section>
                </section>
            </section>
        </section>
    )
}