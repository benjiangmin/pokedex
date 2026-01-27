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

// This cache lives outside the component so it persists across all cards
let customDataCache = null;

export default function ExtraDetails(props) {
    const [description, setDescription] = useState(props.pokemon.description)
    const stats = props.pokemon.base
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDescription = async () => {
            try {
                // Only fetch the file if we haven't already
                if (!customDataCache) {
                    const response = await fetch('/pokemon-data/custom-data/custom-data.json');
                    customDataCache = await response.json();
                }

                // Look for an override using the slug
                const slug = props.pokemon.slug;
                if (customDataCache[slug] && customDataCache[slug].description) {
                    setDescription(customDataCache[slug].description);
                } else {
                    setDescription(props.pokemon.description);
                }
            } catch (error) {
                // If fetch fails, keep the original description
                setDescription(props.pokemon.description);
            }
        };

        fetchDescription();
    }, [props.pokemon.slug, props.pokemon.description]);

    const handleClick = (e) => {
        e.stopPropagation()
        navigate(`/pokemon/${props.pokemon.slug}`)
    }

    return (
        <section style={{display:"flex", flexDirection:"column"}}>
            <section className="extra-details-main-container">
                <div className="extra-details-stats" onClick={handleClick}>
                    <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>HP</span> <span>{stats.HP}</span></div>
                    <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>ATK</span> <span>{stats.Attack}</span></div>
                    <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>DEF</span> <span>{stats.Defense}</span></div>
                    <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>S.ATK</span> <span>{stats["Special Attack"]}</span></div>
                    <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>S.DEF</span> <span>{stats["Special Defense"]}</span></div>
                    <div className="stat-row"><span style={{color:"rgb(129, 110, 94)"}}>SPD</span> <span>{stats.Speed}</span></div>
                </div>
                {/* Now using the local 'description' state which holds the custom data if it exists */}
                <Typewriter text={description} />
            </section>
        </section>
    )
}