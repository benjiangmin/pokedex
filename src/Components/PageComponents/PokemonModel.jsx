import { useState, useEffect, Suspense } from "react"
import { useGLTF, OrbitControls, Stage, Center } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import shinyIcon from "../Images/shinyIcon.png"

const getFolder = (pokemon, isShiny) => {
    let folder = "regular";
    if (isShiny) {
        folder = pokemon.isMega ? "megaShiny" : "shiny";
    }
    else if (pokemon.slug.endsWith("-x")) folder = "x";
    else if (pokemon.slug.endsWith("-y")) folder = "y";
    else if (pokemon.slug.endsWith("-z")) folder = "z";
    else if (pokemon.isMega) folder = "mega";
    else if (pokemon.isAlolan) folder = "alolan";
    else if (pokemon.isGalarian) folder = "galar";
    else if (pokemon.isHisuian) folder = "hisuian";
    else if (pokemon.isGmax) folder = "gmax";

    else if (pokemon.slug.endsWith("primal")) folder = "primal";
    else if (pokemon.slug.endsWith("origin")) folder = "origin";
    return folder;
};

function Model({ url }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} />
}

export default function PokemonModel({ pokemon, toggleShiny, shiny }) {
    const [finalUrl, setFinalUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [showOverlay, setShowOverlay] = useState(false)

    useEffect(() => {
        const checkModels = async () => {
            setIsLoading(true)
            setShowOverlay(true)

            const baseUrl = `https://raw.githubusercontent.com/Pokemon-3D-api/assets/main/models/glb`

            const currentFolder = getFolder(pokemon, shiny)
            const currentUrl = `${baseUrl}/${currentFolder}/${pokemon.id}.glb`

            try {
                const res = await fetch(currentUrl, { method: 'HEAD' })
                if (res.ok) {
                    setFinalUrl(currentUrl)
                } else if (shiny) {
                    const defaultFolder = getFolder(pokemon, false)
                    const defaultUrl = `${baseUrl}/${defaultFolder}/${pokemon.id}.glb`
                    const defaultRes = await fetch(defaultUrl, { method: 'HEAD' })
                    setFinalUrl(defaultRes.ok ? defaultUrl : null)
                } else {
                    setFinalUrl(null)
                }
            } catch {
                setFinalUrl(null)
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                    setShowOverlay(false)
                }, 600)
            }
        }

        if (pokemon) checkModels()
    }, [pokemon, shiny])

    if (!pokemon) return null

    const opacity = shiny ? "1" : 0.5

    return (
        <div className="three-d-model-container" style={{ position: 'relative', overflow: 'hidden' }}>            
        <div className={`overlay ${showOverlay ? "visible-overlay" : ""}`}/>
    
            {!finalUrl && !isLoading ? (
                <div className="fallback">
                    <img
                        src={pokemon.sprites.static}
                        alt={pokemon.name.english}
                        style={{ height: "60px" }}
                    />
                    <p style={{ color: '#4b4440', fontSize: '0.8rem' }}>3D model unavailable</p>
                </div>
            ) : (
                <Canvas shadows dpr={[1, 2]} camera={{ fov: 35 }}>
                    <Suspense fallback={null}>
                        <Stage adjustCamera={1.5} intensity={0.5} environment="city" preset="rembrandt">
                            <Center>
                                {finalUrl && <Model url={finalUrl} />}
                            </Center>
                        </Stage>
                    </Suspense>
                    <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
                </Canvas>
            )}

            <img
                src={shinyIcon}
                className="shiny-button"
                onClick={toggleShiny}
                alt="shiny toggle"
                style={{ opacity: `${opacity}` }}
            />
        </div>
    )
}