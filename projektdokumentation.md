# Landrup Dans

jeg har brugt React og Tailwind CSS til at bygge dette projekt.  

 **React** gør det muligt at bygge med genandvendlige komponeneter som kan importeres over alle filer, hvilket gør det mere overskueligt og nemmere at vedligeholde, og så er der også dejlig meget dokumentation på nettet 


**Tailwind css** er et utility-first framework, det vil sige at man kan bruge specifikke klasser direkte i html. i modsætning til bootstrap der har mange pre defineret komponenter, det vil sige mindre design frihed.



```jsx
import Navbar from "@/components/Navbar"
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
                <div key={roster.id}>
                    <h2 className="text-start text-white text-4xl ml-8 my-6 ">{roster.name}</h2>
                    {roster.roster.map((item) =>
                        <div key={item.lastname}>
                            <h3>{item.firstname} {item.lastname}</h3>
                        </div>)}
                </div>
            )}
            <Navbar />
        </>
    )
} 
```
Her har vi et stykke kode, der laver et komponent som henter og viser en liste af aktiviteter og deres deltagere.  
De bliver filtreret, baseret på instruktør ID. For hver filtreret aktivitet laves der promises, som henter deltagere for den. Når alle promises er udførte, samler vi dataen.





## reflektion 
 man kunne skalere denne applikation i fremtiden ved at gøre den åben for andre firmaer, så flere kan komme til. man kunne også øge funktionaliteten så trænere selv kan tilføje aktiviteter eksempelvis. 