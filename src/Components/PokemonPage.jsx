import { useParams } from "react-router-dom"
import { useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, Stage } from "@react-three/drei"

import pokemonData from "../../pokedex-enriched.json"

function Model({ url }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} />
}

export default function PokemonPage() {
    const { slug } = useParams()
    const pokemon = pokemonData.find(pokemon => pokemon.slug === slug)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const modelUrl = `https://raw.githubusercontent.com/Sudhanshu-Ambastha/Pokemon-3D-api/main/models/glb/regular/${pokemon.id}.glb`

    return (
        <div style={{ height: "500px", width: "100%" }}>
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        <Model url={modelUrl} />
                    </Stage>
                </Suspense>
                <OrbitControls autoRotate={false} />
            </Canvas>
        </div>
    )
}