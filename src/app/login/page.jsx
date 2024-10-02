"use client"

import login from "../../actions/login"
import { useRouter } from "next/navigation"
import BackgroundImage from "../../components/BackgroundImage"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

export default function Login() {
	const [formState, formAction] = useFormState(login)
	const router = useRouter()

	useEffect(function () {
		if (!formState) return

		if (formState.success) {
			toast.success("Du er nu logget ind")
			router.push("/aktiviteter")
		}
	}, [formState])

	return (
		<section className="relative">
			<BackgroundImage />
			<div class="rectangle-bg" />
			<div  className="absolute inset-0 flex items-center justify-center">
				<form action={formAction}>
					<h2 className="text-left text-5xl text-white">Log ind</h2>
					<div>
						<label>
							<input type="text" name="username" placeholder="Brugernavn" className="my-4 w-80 p-2 " />
							<span>{formState?.success === false ? formState.errors.username : null}</span>
						</label>
					</div>
					<div>
						<label>
							<input type="password" name="password" placeholder="Adgangskode" className="w-80 p-2 " />
							<span>{formState?.success === false ? formState.errors.password : null}</span>
						</label>
					</div>
					<div className="absolute bottom-32 right-48">
						<button
							type="submit"
							className=" text-sm bg-fuchsia-950 rounded-md text-white py-3 absolute bottom-10 w-48  left-1/2 transform -translate-x-1/2 "
						>
							Log ind</button>
					</div>
				</form>
			</div>
		</section>
	)
}
