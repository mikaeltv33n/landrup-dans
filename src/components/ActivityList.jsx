"use client"

import { useEffect, useState } from "react"
import ActivityCard from "./ActivityCard"

export default function ActivityList() {
    const [data, setData] = useState([])

    useEffect(function() {
        fetch("http://localhost:4000/api/v1/activities")
            .then(response => response.json())
            .then(result => setData(result))
    }, [])

    return (
        <section className="mb-[8vh] pb-1">
            <div className="flex flex-col gap-6">
                {data.map(item => <ActivityCard key={item.id} activity={item} />)}
            </div>
        </section>
    )
}