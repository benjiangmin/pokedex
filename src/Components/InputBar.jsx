// import P from "../Components/Images/unown-p.gif"
// import O from "../Components/Images/unown-o.gif"
// import K from "../Components/Images/unown-k.gif"
// import E from "../Components/Images/unown-e.gif"
// import D from "../Components/Images/unown-d.gif"
// import E_SHINY from "../Components/Images/unown-e-shiny.gif"
// import X from "../Components/Images/unown-x.gif"
import POKEDEX_TEXT from "../Components/Images/POKEDEX_TEXT.png"
import HelpfulBar from "./HelpfulBar"

// import diglett from "../Components/Images/diglett.gif"
// import dugtrio from "../Components/Images/dugtrio.gif"

export default function InputBar(props) {

    function handleSubmit(formData) {
        const description = formData.get("description")

        props.setQuery(description)
        props.setCurrentFilter("")
        props.performSearch(description)
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

    const smallerInputbar = props.prompt?.length > 0 ? "smaller-inputbar" : ""
    return (
        <section className={`inputbar ${smallerInputbar}`}>
            <section className="inputbar-display">
                <img className="pokedex-text-img" src={POKEDEX_TEXT} />
                <section style={{ position: "relative", width: "100%" }}>
                    <form className="description-form" action={handleSubmit}>
                        <div className="label-group">
                            <label className="enter-description-label">enter description:</label>
                            {/* <img className="diglett" src={diglett} alt="Diglett" />
                            <img className="dugtrio" src={dugtrio} alt="Dugtrio" /> */}
                        </div>
                        <input className="enter-description-input"
                            id="description"
                            name="description"
                            type="text"
                            placeholder="e.g. red pokemon that learn earthquake and are dark type and have an attack over 100 with moxie from gen v ahhhhhh"
                        />

                    </form>

                </section>
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