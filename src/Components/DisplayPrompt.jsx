export default function DisplayPrompt(props) {
    return (
        <section className="display-prompt-bar">
            <h1>showing results for: </h1>
            <h1>{props.prompt}</h1>
        </section>
    )
}