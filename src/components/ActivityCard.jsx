import Image from "next/image"
import Link from "next/link"

export default function ActivityCard({ activity }) {
    return (
        <section className="relative flex justify-center">
            <Link className="overflow-hidden relative w-80" href={"/aktivitetsdetaljer/" + activity.id}>
                <Image className="w-80 h-80 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl  object-cover" src={activity.asset.url} alt="" width="200" height="180" />
                <div className="absolute bottom-0 rounded-tr-3xl rounded-bl-3xl left-0 w-full h-1/4 flex justify-center flex-col p-4 bg-fuchsia-300 bg-opacity-80">
                    <h2>{activity.name}</h2>
                    <h3>{activity.minAge}-{activity.maxAge} år</h3>
                </div>
            </Link>
        </section>
    )
}
