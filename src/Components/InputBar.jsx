export default function InputBar(props) {

    function handleSubmit(formData) {
        const description = formData.get("description")
        props.setQuery(description)
    }

    return (
        <section className="inputbar">
            <section className="inputbar-display">
                <h1>pokédex</h1>
                <form style={{display: "flex", flexDirection: "column"}}action={handleSubmit}>
                    <label className="enter-description-label">enter description:</label>
                    <input className="enter-description-input" 
                           id="description" 
                           name="description" 
                           type="text"
                           placeholder="e.g. blue pokemon with a speed greater than 100..."
                    />
                </form>
            </section>
        </section>
    )
}