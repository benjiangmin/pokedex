import { useState } from "react"
import SortingFunctions from "./SortingFunctions"

export default function HelpfulBar(props) {
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

    const showBar = props.results?.length > 0

    return (
        <section className="helpful-data">
            <section className={`helpful-data-container ${showBar ? "show" : ""}`}>
                <SortingFunctions 
                    results={props.results} 
                    setResults={props.setResults} 
                    currentFilter={props.currentFilter}
                    setCurrentFilter={props.setCurrentFilter}
                />
                <section className="reset-buttons-container">
                    <button onClick={props.resetSearch}>clear search</button>
                    <button onClick={sortByID}>reset filters</button>
                </section>
            </section>
        </section>
    )
}