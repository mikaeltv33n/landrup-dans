import Navbar from "@/components/Navbar"
import Image from "next/image"
import AdduserBtn from "@/components/AddUserBtn"
import { cookies } from "next/headers"


export default async function ActivityDetails({ params }) {
	const { id } = params

	const response = await fetch("http://localhost:4000/api/v1/activities/" + id)
	const activity = await response.json()

	let user = null
	let isUserWithinAge = false
	let isUserAlreadyAdded = false
	let hasActivityWithinSameWeekday = false

	try {
		const userId = cookies().get("ffd_uid").value
		const userResponse = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + cookies().get("ffd_token").value
			},
		})
		user = await userResponse.json()


		isUserAlreadyAdded = user && user.activities.some(function (userActivity) {
			return userActivity.id === activity.id
		})
		hasActivityWithinSameWeekday = user && user.activities.filter(function (userActivity) {
			return userActivity.id !== activity.id
		}).some(function (userActivity) {
			return userActivity.weekday === activity.weekday
		})
		isUserWithinAge = user && activity.minAge <= user.age && user.age <= activity.maxAge

	} catch (error) {
		console.error(error)
	}
	return (
		<>
			<div className="relative">
				{activity.asset && (
					<Image
						src={activity.asset.url}
						alt={activity.asset}
						width={600}
						height={300}
						className="w-full h-96 mb-4 "
					/>
				)}
				{isUserWithinAge && !hasActivityWithinSameWeekday && <AdduserBtn initialText={isUserAlreadyAdded ? "Afmeld" : "Tilmeld"} activityId={activity.id} />}
			</div>
			<div className="text-white ml-4">
				<h2 className="text-xl">{activity.name}</h2>
				<h3 className="text-lg">{activity.minAge}-{activity.maxAge} år</h3>
				<p className="mt-2">{activity.description}</p>
			</div>
			<Navbar />

		</>
	)
}
