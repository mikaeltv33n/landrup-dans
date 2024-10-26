"use client"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ActivityCard from "./ActivityCard"



export default function Searchbar() {
    const [searchResults, setSearchResults] = useState([])
    const [activities, setActivities] = useState([])

    useEffect(function () {
        fetch("http://localhost:4000/api/v1/activities")
            .then(response => response.json())
            .then(result => setActivities(result))
    }, [])


    function searchHandler(event) {
        setSearchResults(activities.filter(function (activity) {
            return activity.name.toLowerCase().includes(event.target.value)
        }))
    }
    return (
        <div className="h-full mb-[8vh] overflow-hidden">
            <header className="flex justify-between items-center px-6 h-[10vh]">
                <div className="relative w-[360px]">
                    <input onChange={searchHandler} type="search" className=" bg-fuchsia-300 bg-opacity-20 px-1 py-2 w-full relative" />
                    <FontAwesomeIcon icon={faSearch} className="h-4 w-4 absolute right-5 top-3 text-white" />

                </div>
            </header>
            <div className={`h-[80vh] w-full px-6 py-2 overflow-y-auto text-white z-50 ${!searchResults.length && "hidden"}`}>
                Resultater
                {searchResults.length ? searchResults.map((result, index) => <ActivityCard key={index} activity={result} />)
                    : (<p>Der var ingen resultater</p>)}
            </div>
        </div>
    )
}
