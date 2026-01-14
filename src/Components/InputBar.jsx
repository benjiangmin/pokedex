// import P from "../Components/Images/unown-p.gif"
// import O from "../Components/Images/unown-o.gif"
// import K from "../Components/Images/unown-k.gif"
// import E from "../Components/Images/unown-e.gif"
// import D from "../Components/Images/unown-d.gif"
// import E_SHINY from "../Components/Images/unown-e-shiny.gif"
// import X from "../Components/Images/unown-x.gif"
import POKEDEX_TEXT from "../Components/Images/POKEDEX_TEXT.png"
import HelpfulBar from "./HelpfulBar"

export default function InputBar(props) {

    function handleSubmit(formData) {
        const description = formData.get("description")
        props.setQuery(description)
        props.setCurrentFilter("")
    }

    // <section className="pokedex-sprites-container">
    //     <img src={P}/>
    //     <img src={O}/>
    //     <img src={K}/>
    //     <img src={E}/>
    //     <img src={D}/>
    //     <img src={E_SHINY}/>
    //     <img src={X}/>
    // </section>

    return (
        <section className="inputbar">
            <section className="inputbar-display">
                <img className="pokedex-text-img" src={POKEDEX_TEXT} />
                <form style={{ display: "flex", flexDirection: "column" }} action={handleSubmit}>
                    <label className="enter-description-label">enter description:</label>
                    <input className="enter-description-input"
                        id="description"
                        name="description"
                        type="text"
                        placeholder="e.g. blue pokemon with a speed greater than 100..."
                    />
                </form>
                <HelpfulBar
                    results={props.results}
                    setResults={props.setResults}
                    resetSearch={props.resetSearch}
                    currentFilter={props.currentFilter}
                    setCurrentFilter={props.setCurrentFilter}
                />
            </section>
        </section>
    )
}