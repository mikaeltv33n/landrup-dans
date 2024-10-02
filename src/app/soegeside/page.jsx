import Navbar from "../../components/Navbar"
import Searchbar from "../../components/Searchbar"

export default function Searchside() {
    return (
        <>
            <h2 className="text-start text-white text-3xl ml-6 mt-4 ">Søg</h2>
            <Searchbar />
            <Navbar />
        </>
    )
}
