export default function DisplayPrompt(props) {
    return (
        <section className="promptbar">
            <section className="promptbar-display">
                <h1>{props.prompt}</h1>
            </section>
        </section>
    )
}