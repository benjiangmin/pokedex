export default function DisplayPrompt(props) {
    const currentPrompt = props.prompt || ""
    const text = currentPrompt.length > 0 ? "results for" : "enter a search to get started!"

    return (
        <section className="promptbar">
            <section className="promptbar-display animate-squash" key={currentPrompt}>
                <p style={{margin:"0px", fontFamily:"Sour Gummy"}}>{text}</p>
                <h1>{props.prompt}</h1>
            </section>
        </section>
    )
}