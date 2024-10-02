import Navbar from "../../components/Navbar"
import { cookies } from "next/headers"

export default async function CalendarOverview() {

    const userId = cookies().get("ffd_uid").value

    const activities = await fetch('http://localhost:4000/api/v1/activities')
        .then(resp => resp.json())


    const filteredActivities = activities.filter(function (activity) {
        return activity.instructorId === Number(userId)
    })

    const rosterPromises = []

    filteredActivities.forEach(function (activity) {
        rosterPromises.push(new Promise(async function (resolve, reject) {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/users/${userId}/roster/${activity.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + cookies().get("ffd_token").value
                    },
                });
                const roster = await response.json()
                resolve({ id: activity.id, name: activity.name, roster })
            } catch (error) {
                reject(error)
            }
        }))
    })

    const rosters = await Promise.all(rosterPromises)

    return (
        <>
            {rosters.map(roster =>
                <div className="p-7" key={roster.id}>
                    <h2 className="text-start text-white text-4xl my-6 truncate">{roster.name}</h2>
                    {roster.roster.map((item) =>
                        <div className="text-white text-xl" key={item.lastname}>
                            <h3>{item.firstname} {item.lastname}</h3>
                        </div>)}
                </div>
            )}
            <Navbar />
        </>
    )
}