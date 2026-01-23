export default function MoveDetails({ move }) {
    return (
        <section className="move-details-container">
            <p>{move.description}</p>
        </section>
    )
}