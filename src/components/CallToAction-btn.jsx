"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CallToAction({ href, children }) {
    const [button, setButton] = useState("frontpage-button")

    const router = useRouter()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setButton("frontpage-button show")
        }, 1500)

        return () => clearTimeout(timeoutId)
    }, [])

    const clickHandler = () => {
        router.push(href)
    }

    return (
        <>
            <button
                className={`${button} text-sm bg-fuchsia-950 rounded-md text-white py-3 absolute bottom-10 w-48 left-1/2 transform -translate-x-1/2`}
                onClick={clickHandler}
            >
                {children}
            </button>
        </>
    )
}

