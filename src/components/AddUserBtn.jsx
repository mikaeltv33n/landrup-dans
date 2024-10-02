"use client"
import getCookie from "@/actions/getCookie"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"

export default function AdduserBtn({ activityId, initialText }) {
  const [isUserAlreadyAdded, setIsUserAlreadyAdded] = useState(false)
  const [text, setText] = useState(initialText)


  useEffect(function() {
    async function fetchUserData() {
      try {
        const token = getCookie("ffd_token")
        const userId = getCookie("ffd_uid")

        const userResponse = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })

        const user = await userResponse.json()
        const isAlreadyAdded = user.activities.some(function(activity) {
          return activity.id === activityId
        })
        setIsUserAlreadyAdded(isAlreadyAdded)
        setText(isAlreadyAdded ? "Forlad" : "Tilmeld")
      } catch (error) {
        toast.error("Der er sket en fejl, prøv igen senere")
      }
    }

    fetchUserData()
  }, [activityId])

  async function submitHandler(event) {
    event.preventDefault()
    try {
      const token = getCookie("ffd_token")
      const userId = getCookie("ffd_uid")

      const response = await fetch(`http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`, {
        method: isUserAlreadyAdded ? "DELETE" : "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      if (response.status !== 200) {
        toast.error("Noget gik galt, prøv igen senere")
        return
      } else {
        const newStatus = !isUserAlreadyAdded
        setIsUserAlreadyAdded(newStatus)
        setText(newStatus ? "Afmeld" : "Tilmeld")
        toast.success(newStatus ? "Du er nu tilmeldt" : "Du er nu afmeldt")
      }
    } catch (error) {
      toast.error("Der er sket en fejl, prøv igen senere")
      throw error
    }
  }

  return (
    <div className="absolute bottom-0 right-32">
      <button
        onClick={submitHandler}
        type="submit"
        className="text-sm bg-fuchsia-950 rounded-md text-white py-3 absolute bottom-10 w-48 left-1/2 transform -translate-x-1/2"
      >
        {text}
      </button>
    </div>
  )
}
