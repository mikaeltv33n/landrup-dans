import { faHome, faSearch, faSignIn } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { cookies } from "next/headers"

export default async function Navbar() {
	
	let isLoggedIn = false
	let isInstructor = false
	
	try {
		const userId = cookies().get("ffd_uid").value
		const response = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + cookies().get("ffd_token").value
			},
		})
		isLoggedIn = response.ok

		const user = await response.json()

		isInstructor = user.role === "instructor"
	} catch {}


	return (
		<nav className="fixed px-6 h-[8vh] bg-gray-200 shadow-upper bottom-0 w-full">
			<ul className="flex justify-between leading-[8dvh]">
				<li>
					<Link href="/aktiviteter">
						<FontAwesomeIcon icon={faHome} className="h-14 w-6" />
						<span className="sr-only">Home</span>
					</Link>
				</li>
				<li>
					<Link href="/soegeside">
						<FontAwesomeIcon icon={faSearch} className="h-14 w-6" />
						<span className="sr-only">Search</span>
					</Link>
				</li>
				{isLoggedIn && !isInstructor &&
				<li>
					<Link href="/kalender">
						<FontAwesomeIcon icon={faCalendar} className="h-14 w-6" />
						<span className="sr-only">Calendar</span>
					</Link>
				</li>}
				{isLoggedIn && isInstructor &&
				<li>
					<Link href="/kalender-oversigt">
						<FontAwesomeIcon icon={faCalendar} className="h-14 w-6" />
						<span className="sr-only">Calendar</span>
					</Link>
				</li>}
				 
				<li>
					<Link href="/login">
						<FontAwesomeIcon icon={faSignIn} className="h-14 w-6" />
						<span className="sr-only">Login</span>
					</Link>
				</li>
			</ul>
		</nav>
	)
}
