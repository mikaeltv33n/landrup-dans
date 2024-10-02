import Navbar from "../../components/Navbar"
import { cookies } from "next/headers"

export default async function Calendar() {

    const userId = cookies().get("ffd_uid").value
    const response = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies().get("ffd_token").value
        },
    })


    const user = await response.json()


    return (
        <>
            <h2 className="text-start text-white text-4xl ml-8 my-6 ">Kalender</h2>
            {user.activities.map(item =>
                <div className="bg-white  justify-center flex-col h-28 w-80 ml-7 my-8 p-4 rounded-md" key={item.id}>
                    <h1 className="text-4xl truncate">{item.name}</h1>
                    <h3 className="font-medium text-lg first-letter:uppercase">{item.weekday} {item.time}</h3>
                </div>)}

            <Navbar />
        </>
    )
}