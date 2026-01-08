import SortingFunctions from "./SortingFunctions"

export default function HelpfulBar(props) {
    return (
        <section className="helpful-data">
            <section className="helpful-data-container">
                <button onClick={props.resetSearch}>reset search</button>
                <SortingFunctions results={props.results} setResults={props.setResults} />
            </section>
        </section>
    )
}