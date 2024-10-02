import ActivityList from "../../components/ActivityList"
import Navbar from "../../components/Navbar"

export default async function activities() {




    return (
        <>
            <h2 className="text-start text-white text-4xl ml-8 my-6 ">Aktiviteter</h2>

            <ActivityList />
            <Navbar />
        </>
    )
}