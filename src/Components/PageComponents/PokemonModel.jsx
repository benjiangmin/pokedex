import { useState, useEffect, Suspense } from "react"
import { useGLTF, OrbitControls, Stage, Center } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

function Model({ url }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} />
}

export default function PokemonModel({ pokemon }) {
    const [modelExists, setModelExists] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    if (!pokemon) return null

    let folder = "regular"
    let fileName = pokemon.id

    if (pokemon.isMega) folder = "mega"
    if (pokemon.isAlolan) folder = "alolan"
    if (pokemon.isGalarian) folder = "galar"
    if (pokemon.isHisuian) folder = "hisuian"
    if (pokemon.isGmax) folder = "gmax"

    if (pokemon.slug.endsWith("-x")) folder = "x"
    if (pokemon.slug.endsWith("-y")) folder = "y"
    if (pokemon.slug.endsWith("-z")) folder = "z"

    if (pokemon.slug.endsWith("primal")) folder = "primal"
    if (pokemon.slug.endsWith("origin")) folder = "origin"

    const modelUrl = `https://raw.githubusercontent.com/Sudhanshu-Ambastha/Pokemon-3D-api/main/models/glb/${folder}/${fileName}.glb`

    useEffect(() => {
        setIsLoading(true)
        fetch(modelUrl, { method: 'HEAD' })
            .then((res) => {
                if (res.ok) {
                    setModelExists(true)
                } else {
                    setModelExists(false)
                }
            })
            .catch(() => setModelExists(false))
            .finally(() => setIsLoading(false))
    }, [modelUrl])

    if (!modelExists && !isLoading) {
        return (
            <div className="three-d-model-container fallback">
                <img
                    src={pokemon.sprites.static}
                    alt={pokemon.name.english}
                    style={{ height: "60px" }}
                />
                <p style={{ color: '#000000', fontSize: '0.8rem' }}>3D model unavailable</p>
            </div>
        )
    }

return (
        <div className="three-d-model-container">
            <Canvas
                shadows
                dpr={[1, 2]} // Performance optimization
                camera={{ fov: 35 }} // Let Stage handle position
            >
                <Suspense fallback={null}>
                    {/* adjustCamera: Centers the camera on the object automatically.
                        intensity: Light brightness.
                        environment: Lighting style.
                    */}
                    <Stage 
                        adjustCamera={1.5} // Higher number = zoomed further out
                        intensity={0.5} 
                        environment="city" 
                        preset="rembrandt"
                    >
                        <Center>
                            <Model url={modelUrl} />
                        </Center>
                    </Stage>
                </Suspense>

                {/* makeDefault ensures OrbitControls doesn't fight with Stage */}
                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
            </Canvas>
        </div>
    )
}