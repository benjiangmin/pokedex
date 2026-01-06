import { useState, useEffect, useRef } from "react"

export default function DisplayPrompt(props) {
    const [displayPrompt, setDisplayPrompt] = useState(props.prompt || "")
    const [isAnimating, setIsAnimating] = useState(false)

    const hasLoaded = useRef(false)

    useEffect(() => {
        if (props.prompt !== displayPrompt && props.prompt !== undefined) {
            hasLoaded.current = true
            setIsAnimating(true)
            
            const textTimer = setTimeout(() => {
                setDisplayPrompt(props.prompt)
            }, 250)

            const animTimer = setTimeout(() => {
                setIsAnimating(false)
            }, 500)

            return (() => {
                clearTimeout(textTimer)
                clearTimeout(animTimer)
            })
        }
        
    }, [props.prompt])

    const text = (displayPrompt?.length || 0) > 0 ? "results for" : "enter a search to get started!"
    const entranceClass = !hasLoaded.current ? "animate-slide" : ""

    return (
        <section className="promptbar" style={{overflow: "hidden"}}>
            <section className={`
                        promptbar-display 
                        ${entranceClass}
                        ${isAnimating ? "animate-squash-cycle" : ""}`}>
                <p style={{margin:"0px", fontFamily:"Sour Gummy"}}>{text}</p>
                <h1>{displayPrompt}</h1>
            </section>
        </section>
    )
}