import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Typewriter = ({text, speed = 15}) => {
    const [displayedText, setDisplayedText] = useState("")

    useEffect(() => {
        setDisplayedText("")

        let currentString = ""
        let i = 0
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                currentString += text.charAt(i)
                setDisplayedText(currentString)
                i++
            } else {
                clearInterval(typingInterval)
            }
        }, speed)
        return () => clearInterval(typingInterval)
    }, [text, speed])

    return <p>{displayedText}</p>
}

export default function ExtraDetails(props) {
    const stats = props.pokemon.base
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.stopPropagation()
        navigate(`/pokemon/${props.pokemon.slug}`)
    }

    const details = (
        <section className="extra-details-main-container">
            <div className="extra-details-stats" onClick={handleClick}>
                <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>HP</span> <span>{stats.HP}</span></div>
                <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>ATK</span> <span>{stats.Attack}</span></div>
                <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>DEF</span> <span>{stats.Defense}</span></div>
                <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>S.ATK</span> <span>{stats["Special Attack"]}</span></div>
                <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>S.DEF</span> <span>{stats["Special Defense"]}</span></div>
                <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>SPD</span> <span>{stats.Speed}</span></div>
            </div>
            <Typewriter text={props.pokemon.description} />
        </section>
    )
    return (
        <section style={{display:"flex", flexDirection:"column"}}>
            {details}
        </section>
    )
}