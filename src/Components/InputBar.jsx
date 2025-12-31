export default function InputBar(props) {

    function handleSubmit(formData) {
        const description = formData.get("description")
        props.setQuery(description)
    }

    return (
        <section className="inputbar">
            <h1>pokedex</h1>
            <form action={handleSubmit}>
                <label htmlFor="description">enter description:</label>
                <input id="description" name="description" type="text"/>
            </form>
        </section>
    )
}