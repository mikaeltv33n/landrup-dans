import { ToastContainer } from "react-toastify"
import "./globals.css"
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: "Landrup Dans",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}

