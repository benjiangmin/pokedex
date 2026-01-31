import P from "../Components/Images/unown-p.gif"
import O from "../Components/Images/unown-o.gif"
import K from "../Components/Images/unown-k.gif"
import E from "../Components/Images/unown-e.gif"
import D from "../Components/Images/unown-d.gif"
import E_SHINY from "../Components/Images/unown-e-shiny.gif"
import X from "../Components/Images/unown-x.gif"

import A from "../Components/Images/unown-a.png"
import B from "../Components/Images/unown-b.png"
import C from "../Components/Images/unown-c.png"
import HelpfulBar from "./HelpfulBar"


export default function InputBar(props) {

    function handleSubmit(formData) {
        const description = formData.get("description")

        props.setQuery(description)
        props.setCurrentFilter("")
        props.performSearch(description)
    }


    const smallerInputbar = props.prompt?.length > 0 ? "smaller-inputbar" : ""
    return (
        <section className={`inputbar ${smallerInputbar}`}>
            <section className="inputbar-display">
                <section className="pokedex-sprites-container">
                    <img src={P} />
                    <img src={O} />
                    <img src={K} />
                    <img src={E} />
                    <img src={D} />
                    <img src={E_SHINY} />
                    <img src={X} />
                </section>
                <section className="form-stuff" style={{ position: "relative", width: "100%" }}>
                    <form className="description-form" action={handleSubmit}>
                        <section className="abc-container">
                            <img src={A} />
                            <img src={B} />
                            <img src={C} />
                        </section>

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
                    ascending={props.ascending}
                    setAscending={props.setAscending}
                />
            </section>
            {/* <img className="main-background" src={background} />
            <section className="green-bar"></section> */}
        </section>
    )
}