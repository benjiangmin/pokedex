import { useState, useEffect, Suspense } from "react"
import { useGLTF, OrbitControls, Stage } from "@react-three/drei"
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
                camera={{
                    position: [5, 5, 10],
                    fov: 35,
                }}
            >
                <Suspense fallback={null}>
                    <Stage
                        environment="city"
                        intensity={0.6}
                        adjustCamera={false}
                    >
                        <Model url={modelUrl} />
                    </Stage>
                </Suspense>

                <OrbitControls />
            </Canvas>

        </div>
    )
}