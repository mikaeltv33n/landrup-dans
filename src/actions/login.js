"use server"

import { cookies } from "next/headers"
import { z } from "zod"

const schema = z.object({
	username: z.string().min(1, {message: "Udfyld dette felt"}),
	password: z.string().min(1, {message: "Udfyld dette felt"})
})

export default async function login(prevState, formData) {
	const form = {
		username: formData.get("username"),
		password: formData.get("password")
	}

	const validation = schema.safeParse(form)

	if (!validation.success) {
		return {
			success: false,
			errors: validation.error.flatten().fieldErrors
		}
	}

	try {
		const response = await fetch("http://localhost:4000/auth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(form)
		})

		if (response.status !== 200) {
			return {
				success: false,
				errors: { general: "Du har indtastet forkert brugernavn eller adgangskode" }
			}
		}

		const data = await response.json()

		cookies().set("ffd_token", data.token, { expires: new Date(data.validUntil) })
		cookies().set("ffd_uid", data.userId, { expires: new Date(data.validUntil) })

		return {
			success: true
		}

	} catch (error) {
		console.log(error)
		return {
			success: false,
			errors: { general: ["Noget gik galt, prøv igen senere"] }
		}
	}
}